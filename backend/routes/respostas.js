import express from 'express';
import { query } from '../config/database.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', authenticateToken, async (req, res) => {
    try {
        const result = await query('SELECT * FROM respostas_due_diligence WHERE operador_id = $1', [req.user.id]);
        if (result.rows.length === 0) {
            const newResult = await query('INSERT INTO respostas_due_diligence (operador_id) VALUES ($1) RETURNING *', [req.user.id]);
            return res.json(newResult.rows[0]);
        }
        res.json(result.rows[0]);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar respostas' });
    }
});

router.put('/secao/:numero', authenticateToken, async (req, res) => {
    try {
        const { numero } = req.params;
        const { dados } = req.body;
        const secaoMap = { '1': 'secao_1_governanca', '2': 'secao_2_seguranca', '3': 'secao_3_ciclo_vida', '4': 'secao_4_incidentes', '5': 'secao_5_apostas', '6': 'secao_6_desenvolvimento', '7': 'secao_7_rh', '8': 'secao_8_monitoramento', '9': 'secao_9_integridade', '10': 'secao_10_terminacao' };
        const coluna = secaoMap[numero];
        if (!coluna) return res.status(400).json({ error: 'Seção inválida' });

        await query(`UPDATE respostas_due_diligence SET ${coluna} = $1 WHERE operador_id = $2`, [JSON.stringify(dados), req.user.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao salvar' });
    }
});

router.put('/finalizar', authenticateToken, async (req, res) => {
    try {
        await query(`UPDATE respostas_due_diligence SET status_submissao = 'finalizado', data_envio = CURRENT_TIMESTAMP WHERE operador_id = $1`, [req.user.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao finalizar' });
    }
});

router.put('/reabrir', authenticateToken, async (req, res) => {
    try {
        await query(`UPDATE respostas_due_diligence SET status_submissao = 'rascunho', data_envio = NULL WHERE operador_id = $1`, [req.user.id]);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao reabrir' });
    }
});

export default router;
