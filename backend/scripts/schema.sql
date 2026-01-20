-- DUE DILIGENCE SYSTEM - DATABASE SCHEMA (Neon PostgreSQL)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS operadores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    nome_empresa VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'ativo' CHECK (status IN ('ativo', 'inativo')),
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS respostas_due_diligence (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    operador_id UUID NOT NULL REFERENCES operadores(id) ON DELETE CASCADE,
    secao_1_governanca JSONB DEFAULT '{}',
    secao_2_seguranca JSONB DEFAULT '{}',
    secao_3_ciclo_vida JSONB DEFAULT '{}',
    secao_4_incidentes JSONB DEFAULT '{}',
    secao_5_apostas JSONB DEFAULT '{}',
    secao_6_desenvolvimento JSONB DEFAULT '{}',
    secao_7_rh JSONB DEFAULT '{}',
    secao_8_monitoramento JSONB DEFAULT '{}',
    secao_9_integridade JSONB DEFAULT '{}',
    secao_10_terminacao JSONB DEFAULT '{}',
    arquivos_urls TEXT[] DEFAULT ARRAY[]::TEXT[],
    status_submissao VARCHAR(20) DEFAULT 'rascunho' CHECK (status_submissao IN ('rascunho', 'finalizado')),
    data_envio TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(operador_id)
);

CREATE TABLE IF NOT EXISTS arquivos_anexos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    resposta_id UUID NOT NULL REFERENCES respostas_due_diligence(id) ON DELETE CASCADE,
    nome_original VARCHAR(255) NOT NULL,
    nome_arquivo VARCHAR(255) NOT NULL,
    tipo_arquivo VARCHAR(100),
    tamanho_bytes BIGINT,
    categoria VARCHAR(100),
    uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_operadores_email ON operadores(email);
CREATE INDEX IF NOT EXISTS idx_respostas_operador ON respostas_due_diligence(operador_id);
CREATE INDEX IF NOT EXISTS idx_arquivos_resposta ON arquivos_anexos(resposta_id);
