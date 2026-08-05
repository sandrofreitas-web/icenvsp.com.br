# 🐳 Docker — Configuração Local

tags: #docker #dev #localhost #infraestrutura
related: [[🏠 Início]] · [[Ambientes — Dev e Produção]]

---

## Visão Geral

O ambiente de desenvolvimento usa **Docker** para garantir consistência entre máquinas e isolar as dependências do Node.js.

| Item | Valor |
|---|---|
| Imagem base | `node:20-alpine` |
| Container | `igreja-crist-evan-web-1` |
| Porta exposta | `3000` (host) → `3000` (container) |
| URL local | http://localhost:3000 |

---

## Arquivos de Configuração

### `Dockerfile`

```dockerfile
FROM node:20-alpine

WORKDIR /app

# Instala dependências antes de copiar o código (aproveita cache Docker)
COPY package.json ./
RUN npm install

# Copia o restante do código
COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
```

### `docker-compose.yml`

```yaml
services:
  web:
    build: .
    container_name: igreja-crist-evan-web-1
    ports:
      - "3000:3000"
    volumes:
      - .:/app                    # Hot reload: código fonte montado
      - /app/node_modules         # Evita sobrescrever node_modules do container
      # Compartilha credenciais Hostinger MCP com o container:
      - C:\Users\salmeida\AppData\Roaming\hostinger-mcp:/root/.config/hostinger-mcp
    environment:
      - CHOKIDAR_USEPOLLING=true  # Necessário para hot reload no Windows
      - WATCHPACK_POLLING=true
```

> [!note]
> O volume de `hostinger-mcp` permite que o container tenha acesso às credenciais da Hostinger para operações via MCP sem precisar reautenticar.

---

## Comandos Essenciais

### Iniciar o ambiente

```bash
# Garantir branch correto
git checkout dev-full

# Subir container em background
docker-compose up -d

# Ver logs em tempo real (Ctrl+C para sair)
docker logs -f igreja-crist-evan-web-1
```

### Rebuild completo (quando mudar dependências)

```bash
# Para e remove o container atual
docker-compose down

# Reconstrói a imagem do zero e sobe
docker-compose up --build -d
```

### Parar o ambiente

```bash
docker-compose down
```

### Verificar status

```bash
docker ps
```

---

## Script npm `dev`

O container executa:

```bash
vite --port=3000 --host=0.0.0.0
```

- `--host=0.0.0.0` → torna o servidor acessível de fora do container (necessário para o mapeamento de porta funcionar)
- `--port=3000` → porta fixa configurada no `docker-compose.yml`

---

## Solução de Problemas

| Sintoma | Causa Provável | Solução |
|---|---|---|
| Hot reload não funciona | `CHOKIDAR_USEPOLLING` não ativo | Verificar variáveis de ambiente no `docker-compose.yml` |
| Porta 3000 em uso | Outro container ou processo | `docker-compose down` e reiniciar |
| Módulos não encontrados | `node_modules` desatualizado | `docker-compose up --build -d` |
| Erro de permissão de volume | WSL/Windows path issue | Verificar caminho no `docker-compose.yml` |

---

## `.dockerignore`

Os seguintes arquivos **não** são copiados para a imagem:

```
node_modules/
dist/
.env
.git/
```
