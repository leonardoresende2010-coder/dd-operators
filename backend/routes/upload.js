import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userDir = path.join(uploadDir, req.user.id);
        if (!fs.existsSync(userDir)) fs.mkdirSync(userDir, { recursive: true });
        cb(null, userDir);
    },
    filename: (req, file, cb) => cb(null, `${Date.now()}-${Math.random().toString(36).substr(2, 9)}${path.extname(file.originalname)}`)
});

const upload = multer({ storage, limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/', authenticateToken, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo' });
        const { categoria } = req.body;
        const respostaResult = await query('SELECT id FROM respostas_due_diligence WHERE operador_id = $1', [req.user.id]);
        let respostaId = respostaResult.rows[0]?.id;
        if (!respostaId) {
            const newResp = await query('INSERT INTO respostas_due_diligence (operador_id) VALUES ($1) RETURNING id', [req.user.id]);
            respostaId = newResp.rows[0].id;
        }
        const fileUrl = `/uploads/${req.user.id}/${req.file.filename}`;
        await query('INSERT INTO arquivos_anexos (resposta_id, nome_original, nome_arquivo, tipo_arquivo, tamanho_bytes, categoria) VALUES ($1, $2, $3, $4, $5, $6)', [respostaId, req.file.originalname, req.file.filename, req.file.mimetype, req.file.size, categoria || 'other']);
        await query('UPDATE respostas_due_diligence SET arquivos_urls = array_append(arquivos_urls, $1) WHERE id = $2', [fileUrl, respostaId]);
        res.json({ success: true, file: { url: fileUrl, nome_original: req.file.originalname } });
    } catch (error) {
        res.status(500).json({ error: 'Erro no upload' });
    }
});

router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await query('SELECT a.* FROM arquivos_anexos a JOIN respostas_due_diligence r ON a.resposta_id = r.id WHERE r.operador_id = $1', [req.user.id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao listar' });
    }
});

router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const result = await query('SELECT a.*, r.operador_id FROM arquivos_anexos a JOIN respostas_due_diligence r ON a.resposta_id = r.id WHERE a.id = $1', [req.params.id]);
        if (result.rows.length === 0) return res.status(404).json({ error: 'Não encontrado' });
        const arquivo = result.rows[0];
        if (arquivo.operador_id !== req.user.id) return res.status(403).json({ error: 'Acesso negado' });
        const filePath = path.join(uploadDir, arquivo.operador_id, arquivo.nome_arquivo);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        await query('DELETE FROM arquivos_anexos WHERE id = $1', [req.params.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao remover' });
    }
});

export default router;
