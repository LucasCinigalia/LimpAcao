# 🚀 Deploy no Railway — LimpAção

Este guia cobre o deploy completo no Railway: banco MySQL + backend + frontend.
O projeto foi preparado para rodar como **1 serviço só**: o Express serve a API
**e** o frontend buildado (Vite). Assim você não precisa configurar CORS, domínio
duplo nem `VITE_API_URL`.

---

## ✅ Pré-requisitos

1. Conta no [Railway](https://railway.app/) (login com GitHub ou Google).
2. Repositório no GitHub com o código (o projeto já tem:
   `https://github.com/LucasCinigalia/files--1-.git`).
3. Commit e push das alterações feitas para o Railway-ready:
   - `server/db.js` — suporta variáveis do Railway (`MYSQLHOST`, `MYSQLDATABASE`...) e `DATABASE_URL`
   - `server/server.js` — aplica schema sem `CREATE DATABASE/USE` + serve o frontend buildado
   - `src/hooks/useReports.js` e `src/pages/LoginPage.jsx` — API relativa (`''`)
   - `vite.config.js` — proxy `/api` no dev
   - `Dockerfile` — build multi-stage (frontend + backend)
   - `.gitignore` — `dist/`, `server/.env` ignorados (o `.env` foi removido do git)

---

## 📦 Passo 1 — Subir o código para o GitHub

```bash
git add -A
git commit -m "chore: railway-ready (Dockerfile, env vars, static serve)"
git push origin main
```

---

## 🗄️ Passo 2 — Criar o banco MySQL no Railway

1. No painel do Railway, abra seu projeto (crie um novo: **New Project**).
2. Clique em **+ New** → **Database** → **MySQL**.
   - O Railway provisiona um MySQL gerenciado (senha gerada automaticamente).
3. Aguarde o deploy do banco (status **Healthy**).
4. Clique no serviço MySQL → aba **Variables**.
   - O Railway injeta automaticamente: `MYSQLHOST`, `MYSQLPORT`, `MYSQLUSER`,
     `MYSQLPASSWORD`, `MYSQLDATABASE` (e `DATABASE_URL`).
   - **Não precisa copiar nada** — o backend lê essas variáveis sozinho
     (ver `server/db.js`).

> 💡 Opcional: para inspecionar o banco, use a aba **Connect** do serviço MySQL
> (dá a `DATABASE_URL`) com um client como DBeaver/MySQL Workbench.

---

## 🖥️ Passo 3 — Deploy do app (backend + frontend)

1. No projeto, clique em **+ New** → **GitHub Repo**.
2. Selecione o repositório `files--1-` (ou o repo do LimpAção).
3. Escolha **Deploy from Dockerfile** (o Railway detecta o `Dockerfile` na raiz).
   - Se não detectar automaticamente, em **Settings → Deploy** escolha o
     **Dockerfile** como método.
4. Configure as variáveis de ambiente (Settings → Variables) do serviço:
   - `PORT=3001` *(opcional — o Railway injeta `PORT` sozinho)*
   - **Nada mais é obrigatório**: o banco do Railway já é linkado e as vars
     `MYSQL*` são injetadas.
5. Clique em **Deploy** e aguarde o build (o Dockerfile compila o frontend e
   instala o backend — leva ~2-5 min na primeira vez).

---

## 🔗 Passo 4 — Linkar o banco ao app

1. No serviço do app, aba **Settings** → **Networking / Service Linking**
   (ou arraste a linha do banco até o app no diagrama do projeto).
2. O Railway injeta automaticamente as variáveis `MYSQL*` no app.
3. Faça um **redeploy** (Deploy → Redeploy) para o app pegar as variáveis.

---

## 🌐 Passo 5 — Acessar e testar

1. Aba **Settings** → **Networking** → **Generate Domain** (ex:
   `limpacao-production.up.railway.app`).
2. Teste os endpoints:
   - `https://SEU-DOMINIO/api/health` → `{"ok":true,...}`
   - `https://SEU-DOMINIO/` → frontend do LimpAção
   - O schema MySQL é aplicado automaticamente na primeira subida
     (`ensureSchema` no `server.js`).
3. Cadastre um usuário e crie um reporte para confirmar o fluxo completo.

---

## 🔁 Atualizações futuras

O Railway redeploya automaticamente a cada `git push` na branch `main`
(se o **Auto Deploy** estiver ativo, padrão).

```bash
git add -A && git commit -m "fix: ajuste X" && git push origin main
```

---

## 🧪 Rodando localmente (não mudou)

```bash
# Terminal 1 — backend
cd server
npm install
node server.js          # http://localhost:3001

# Terminal 2 — frontend (usa proxy /api -> 3001)
npm install
npm run dev             # http://localhost:5173
```

---

## 🆘 Troubleshooting

| Problema | Solução |
|---|---|
| `Failed to connect to MySQL` no log | Verifique o link entre o app e o banco (Passo 4) e se as vars `MYSQL*` aparecem no app |
| Tabelas não criadas | O `ensureSchema` roda na subida; cheque se `server/mysql-schema.sql` está no repo |
| `403` em rotas `/api` | O fallback SPA não intercepta `/api` — verifique se o `express.static` não está mascarando as rotas (rotas API são declaradas ANTES do static) |
| Build lento | Primeiro build instala tudo; os seguintes usam cache do Docker |
| CORS no front | Não deve ocorrer: frontend e API estão na mesma origem (mesmo domínio) |

---

**Stack**: React + Vite + Tailwind (front) · Node + Express (back) · MySQL (banco)
**Última atualização**: Agosto 2026
