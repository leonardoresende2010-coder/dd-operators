import pg from 'pg';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const { Pool } = pg;
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function initDatabase() {
    const client = await pool.connect();
    try {
        console.log('🚀 Iniciando configuração do banco de dados...\n');
        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');
        console.log('📄 Executando schema SQL...');
        await client.query(schema);
        console.log('✅ Schema criado com sucesso!\n');

        const adminEmail = process.env.ADMIN_EMAIL || 'admin@duediligence.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
        const existingAdmin = await client.query('SELECT id FROM operadores WHERE email = $1', [adminEmail]);

        if (existingAdmin.rows.length === 0) {
            const passwordHash = await bcrypt.hash(adminPassword, 10);
            await client.query(
                `INSERT INTO operadores (email, password_hash, nome_empresa, status, is_admin) VALUES ($1, $2, $3, $4, $5)`,
                [adminEmail, passwordHash, 'Administração Due Diligence', 'ativo', true]
            );
            console.log('👤 Usuário admin criado:', adminEmail);
        } else {
            console.log('👤 Usuário admin já existe.');
        }

        const testEmail = 'operador@teste.com';
        const existingTest = await client.query('SELECT id FROM operadores WHERE email = $1', [testEmail]);
        if (existingTest.rows.length === 0) {
            const testPasswordHash = await bcrypt.hash('teste123', 10);
            await client.query(
                `INSERT INTO operadores (email, password_hash, nome_empresa, status, is_admin) VALUES ($1, $2, $3, $4, $5)`,
                [testEmail, testPasswordHash, 'Operadora Teste S.A.', 'ativo', false]
            );
            console.log('🧪 Usuário de teste criado: operador@teste.com / teste123');
        }
        console.log('\n✅ Banco de dados configurado com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao configurar banco de dados:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

initDatabase();
