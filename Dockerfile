FROM node:18-alpine AS builder

WORKDIR /app

# Instalar dependências
COPY package.json pnpm-lock.yaml* ./
RUN npm install -g pnpm && pnpm install

# Copiar código fonte
COPY . .

# Build do projeto
RUN pnpm build

# Estágio de produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copiar arquivos necessários do build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Expor porta
EXPOSE 3000

# Comando de inicialização (usando o script start do package.json que roda node dist/index.js)
CMD ["npm", "start"]
