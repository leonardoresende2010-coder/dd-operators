# Due Diligence System - Deploy Guide

## 📋 Arquitetura

- **Frontend**: React + Vite → Deploy no **Vercel**
- **Backend**: Node.js + Express → Deploy no **Render**
- **Database**: PostgreSQL → **Neon** (já configurado)

---

## 🚀 Passo a Passo do Deploy

### 1️⃣ Deploy do Backend (Render)

1. Acesse [render.com](https://render.com) e faça login (pode usar GitHub)
2. Clique em **"New +"** → **"Web Service"**
3. Conecte seu repositório GitHub ou selecione **"Build and deploy from a Git repository"**
4. Configure:
   - **Name**: `dd-operators-api`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free
5. Adicione as **Environment Variables**:
   ```
   DATABASE_URL = postgresql://neondb_owner:npg_ucO5FntwEiJ0@ep-empty-math-ahkbfxnq-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
   JWT_SECRET = cadastrodesites2017
   FRONTEND_URL = https://dd-operators.vercel.app
   ```
6. Clique em **"Create Web Service"**
7. Aguarde o deploy (5-10 minutos) e copie a URL (ex: `https://dd-operators-api.onrender.com`)

### 2️⃣ Deploy do Frontend (Vercel)

1. Acesse [vercel.com](https://vercel.com) e faça login (pode usar GitHub)
2. Clique em **"Add New..."** → **"Project"**
3. Importe o repositório ou faça upload da pasta `frontend`
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Adicione a **Environment Variable**:
   ```
   VITE_API_URL = https://dd-operators-api.onrender.com/api
   ```
   (Use a URL do Render do passo anterior)
6. Clique em **"Deploy"**
7. Sua URL será algo como: `https://dd-operators.vercel.app`

### 3️⃣ Atualizar CORS no Backend

Após o deploy do frontend, atualize a variável `FRONTEND_URL` no Render:
1. Vá ao Dashboard do Render → seu serviço
2. **Environment** → Edite `FRONTEND_URL` com a URL real do Vercel
3. O serviço reiniciará automaticamente

---

## ✅ URLs Finais

| Componente | URL |
|------------|-----|
| Frontend | `https://dd-operators.vercel.app` |
| Backend API | `https://dd-operators-api.onrender.com/api` |
| Health Check | `https://dd-operators-api.onrender.com/api/health` |

---

## 🔧 Troubleshooting

### Backend não conecta ao banco
- Verifique se `DATABASE_URL` está correto no Render
- Teste o health check: `curl https://sua-url.onrender.com/api/health`

### Frontend não conecta ao backend
- Verifique se `VITE_API_URL` está correto no Vercel
- Certifique-se que `FRONTEND_URL` no Render corresponde à URL do Vercel

### Serviço do Render "dormindo" (free tier)
- O plano gratuito do Render "dorme" após 15min de inatividade
- A primeira requisição pode demorar 30-50 segundos para "acordar"

---

## 📱 Domínio Personalizado (Opcional)

Para usar um domínio próprio como `DD-operators.app`:

1. Compre o domínio em um registrador (Namecheap, Google Domains, etc.)
2. No Vercel: Settings → Domains → Add Domain
3. Configure os registros DNS conforme instruções do Vercel
4. Para o backend, adicione um subdomínio: `api.DD-operators.app`
