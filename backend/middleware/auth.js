import jwt from 'jsonwebtoken';
import { query } from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret';

export const authenticateToken = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Token não fornecido' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const result = await query('SELECT id, email, nome_empresa, status, is_admin FROM operadores WHERE id = $1', [decoded.userId]);
        if (result.rows.length === 0) return res.status(401).json({ error: 'Usuário não encontrado' });
        const user = result.rows[0];
        if (user.status !== 'ativo') return res.status(403).json({ error: 'Conta desativada' });
        req.user = user;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido' });
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.user || !req.user.is_admin) return res.status(403).json({ error: 'Acesso restrito' });
    next();
};

export const generateToken = (userId, isAdmin = false) => jwt.sign({ userId, isAdmin }, JWT_SECRET, { expiresIn: '24h' });
