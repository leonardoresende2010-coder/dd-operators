import express from 'express';
import path from 'path';
import fs from 'fs';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { query } from '../config/database.js';
import { authenticateToken, requireAdmin } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Todos as rotas requerem autenticação admin
router.use(authenticateToken);
router.use(requireAdmin);

// POST /api/admin/operadores - Criar novo operador
router.post('/operadores', async (req, res) => {
    try {
        const { email, password, nome_empresa } = req.body;

        if (!email || !password || !nome_empresa) {
            return res.status(400).json({ error: 'Email, senha e nome da empresa são obrigatórios' });
        }

        // Verificar se email já existe
        const existingUser = await query('SELECT id FROM operadores WHERE email = $1', [email]);
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'Email já cadastrado' });
        }

        // Hash da senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar operador
        const result = await query(
            'INSERT INTO operadores (email, password_hash, nome_empresa, is_admin, status) VALUES ($1, $2, $3, false, $4) RETURNING id, email, nome_empresa, status',
            [email, hashedPassword, nome_empresa, 'ativo']
        );

        // Criar registro de respostas vazio
        await query(
            'INSERT INTO respostas_due_diligence (operador_id) VALUES ($1)',
            [result.rows[0].id]
        );

        res.status(201).json({
            success: true,
            message: 'Operador criado com sucesso',
            operador: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao criar operador:', error);
        res.status(500).json({ error: 'Erro ao criar operador' });
    }
});

// GET /api/admin/operadores - Listar todos os operadores com status
router.get('/operadores', async (req, res) => {
    try {
        const result = await query(`
      SELECT 
        o.id,
        o.email,
        o.nome_empresa,
        o.status,
        o.created_at as data_cadastro,
        r.status_submissao,
        r.data_envio,
        r.updated_at as ultima_atualizacao,
        r.secao_4_incidentes,
        CASE WHEN r.secao_1_governanca != '{}' AND r.secao_1_governanca IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_2_seguranca != '{}' AND r.secao_2_seguranca IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_3_ciclo_vida != '{}' AND r.secao_3_ciclo_vida IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_4_incidentes != '{}' AND r.secao_4_incidentes IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_5_apostas != '{}' AND r.secao_5_apostas IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_6_desenvolvimento != '{}' AND r.secao_6_desenvolvimento IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_7_rh != '{}' AND r.secao_7_rh IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_8_monitoramento != '{}' AND r.secao_8_monitoramento IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_9_integridade != '{}' AND r.secao_9_integridade IS NOT NULL THEN 1 ELSE 0 END +
        CASE WHEN r.secao_10_terminacao != '{}' AND r.secao_10_terminacao IS NOT NULL THEN 1 ELSE 0 END as secoes_preenchidas,
        COALESCE(array_length(r.arquivos_urls, 1), 0) as total_arquivos
      FROM operadores o
      LEFT JOIN respostas_due_diligence r ON o.id = r.operador_id
      WHERE o.is_admin = false
      ORDER BY o.created_at DESC
    `);

        // Processar alertas
        const operadores = result.rows.map(op => {
            const alertas = [];

            // Verificar tempo de notificação > 48h
            if (op.secao_4_incidentes?.tempo_notificacao_horas > 48) {
                alertas.push({
                    tipo: 'critico',
                    mensagem: `Tempo de notificação: ${op.secao_4_incidentes.tempo_notificacao_horas}h (máx recomendado: 48h)`
                });
            }

            // Verificar se não tem MFA
            if (op.secao_2_seguranca?.mfa_implementado === false) {
                alertas.push({
                    tipo: 'atencao',
                    mensagem: 'MFA não implementado'
                });
            }

            return {
                ...op,
                progresso: `${op.secoes_preenchidas}/10`,
                alertas
            };
        });

        res.json(operadores);
    } catch (error) {
        console.error('Erro ao listar operadores:', error);
        res.status(500).json({ error: 'Erro ao listar operadores' });
    }
});

// GET /api/admin/operadores/:id - Detalhes de um operador específico
router.get('/operadores/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const operadorResult = await query(
            'SELECT id, email, nome_empresa, status, created_at FROM operadores WHERE id = $1',
            [id]
        );

        if (operadorResult.rows.length === 0) {
            return res.status(404).json({ error: 'Operador não encontrado' });
        }

        const respostaResult = await query(
            'SELECT * FROM respostas_due_diligence WHERE operador_id = $1',
            [id]
        );

        const arquivosResult = await query(
            `SELECT a.* FROM arquivos_anexos a
       JOIN respostas_due_diligence r ON a.resposta_id = r.id
       WHERE r.operador_id = $1
       ORDER BY a.uploaded_at DESC`,
            [id]
        );

        res.json({
            operador: operadorResult.rows[0],
            respostas: respostaResult.rows[0] || null,
            arquivos: arquivosResult.rows
        });
    } catch (error) {
        console.error('Erro ao buscar detalhes:', error);
        res.status(500).json({ error: 'Erro ao buscar detalhes do operador' });
    }
});

// PUT /api/admin/operadores/:id/status - Alterar status do operador
router.put('/operadores/:id/status', async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['ativo', 'inativo'].includes(status)) {
            return res.status(400).json({ error: 'Status inválido' });
        }

        await query(
            'UPDATE operadores SET status = $1 WHERE id = $2',
            [status, id]
        );

        res.json({ success: true, message: 'Status atualizado' });
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        res.status(500).json({ error: 'Erro ao atualizar status' });
    }
});

// GET /api/admin/download/:operadorId/:filename - Download de arquivo
router.get('/download/:operadorId/:filename', async (req, res) => {
    try {
        const { operadorId, filename } = req.params;

        const uploadDir = path.join(__dirname, '..', 'uploads');
        const filePath = path.join(uploadDir, operadorId, filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'Arquivo não encontrado' });
        }

        // Buscar nome original
        const result = await query(
            'SELECT nome_original FROM arquivos_anexos WHERE nome_arquivo = $1',
            [filename]
        );

        const nomeOriginal = result.rows.length > 0 ? result.rows[0].nome_original : filename;

        res.download(filePath, nomeOriginal);
    } catch (error) {
        console.error('Erro no download:', error);
        res.status(500).json({ error: 'Erro ao baixar arquivo' });
    }
});

// GET /api/admin/estatisticas - Estatísticas gerais
router.get('/estatisticas', async (req, res) => {
    try {
        const stats = await query(`
      SELECT 
        COUNT(*) FILTER (WHERE o.is_admin = false) as total_operadores,
        COUNT(*) FILTER (WHERE r.status_submissao = 'finalizado') as finalizados,
        COUNT(*) FILTER (WHERE r.status_submissao = 'rascunho' OR r.status_submissao IS NULL) as em_andamento,
        COUNT(*) FILTER (WHERE o.status = 'ativo' AND o.is_admin = false) as ativos,
        COUNT(*) FILTER (WHERE o.status = 'inativo') as inativos
      FROM operadores o
      LEFT JOIN respostas_due_diligence r ON o.id = r.operador_id
    `);

        // Contar alertas críticos
        const alertas = await query(`
      SELECT COUNT(*) as criticos
      FROM respostas_due_diligence r
      WHERE (r.secao_4_incidentes->>'tempo_notificacao_horas')::int > 48
    `);

        res.json({
            ...stats.rows[0],
            alertas_criticos: parseInt(alertas.rows[0].criticos) || 0
        });
    } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
        res.status(500).json({ error: 'Erro ao buscar estatísticas' });
    }
});

export default router;
