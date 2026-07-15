# Estágio 1: Build (Compilação do TypeScript para JavaScript)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Estágio 2: Runner (Execução do código compilado de forma leve)
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY package*.json ./
RUN npm install --only=production
# Copia o código compilado da pasta de saída do TS (geralmente 'dist' ou 'build')
COPY --from=builder /app/dist ./dist

EXPOSE 5001
CMD ["node", "dist/api/index.js"]