import express from 'express';
import bcrypt from 'bcryptjs';
import { query } from '../config/database.js';
import { generateToken, authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).json({ error: 'Email e senha são obrigatórios' });

        const result = await query('SELECT * FROM operadores WHERE email = $1', [email.toLowerCase()]);
        if (result.rows.length === 0) return res.status(401).json({ error: 'Credenciais inválidas' });

        const user = result.rows[0];
        if (user.status !== 'ativo') return res.status(403).json({ error: 'Conta desativada' });

        const validPassword = await bcrypt.compare(password, user.password_hash);
        if (!validPassword) return res.status(401).json({ error: 'Credenciais inválidas' });

        const token = generateToken(user.id, user.is_admin);
        res.json({ token, user: { id: user.id, email: user.email, nome_empresa: user.nome_empresa, is_admin: user.is_admin } });
    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

router.post('/register', async (req, res) => {
    try {
        const { email, password, nome_empresa } = req.body;
        if (!email || !password || !nome_empresa) return res.status(400).json({ error: 'Todos os campos são obrigatórios' });

        const existing = await query('SELECT id FROM operadores WHERE email = $1', [email.toLowerCase()]);
        if (existing.rows.length > 0) return res.status(409).json({ error: 'Email já cadastrado' });

        const password_hash = await bcrypt.hash(password, 10);
        const result = await query(
            `INSERT INTO operadores (email, password_hash, nome_empresa) VALUES ($1, $2, $3) RETURNING id, email, nome_empresa`,
            [email.toLowerCase(), password_hash, nome_empresa]
        );

        const newUser = result.rows[0];
        await query('INSERT INTO respostas_due_diligence (operador_id) VALUES ($1)', [newUser.id]);

        const token = generateToken(newUser.id, false);
        res.status(201).json({ token, user: { id: newUser.id, email: newUser.email, nome_empresa: newUser.nome_empresa, is_admin: false } });
    } catch (error) {
        console.error('Erro no registro:', error);
        res.status(500).json({ error: 'Erro interno' });
    }
});

router.get('/me', authenticateToken, (req, res) => {
    res.json({ user: { id: req.user.id, email: req.user.email, nome_empresa: req.user.nome_empresa, is_admin: req.user.is_admin } });
});

export default router;
