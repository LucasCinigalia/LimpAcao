# ============================================================
# LimpAção — Dockerfile multi-stage
# Stage 1: build do frontend (Vite)
# Stage 2: backend Node/Express servindo a API + o frontend buildado
# ============================================================

# ---------- Stage 1: Frontend build ----------
FROM node:20-alpine AS frontend-build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY index.html vite.config.js postcss.config.js global.css main.jsx App.jsx constants.js mockData.js ./
COPY src ./src
COPY public ./public

RUN npm run build

# ---------- Stage 2: Backend + estáticos ----------
FROM node:20-alpine AS backend
WORKDIR /app

# Backend
COPY server/package.json server/package-lock.json ./server/
RUN cd server && npm ci --omit=dev

COPY server/ ./server/

# Frontend buildado do stage 1 (o Express serve ../dist)
COPY --from=frontend-build /app/dist ./dist

WORKDIR /app/server
ENV NODE_ENV=production
EXPOSE 3001

CMD ["node", "server.js"]
