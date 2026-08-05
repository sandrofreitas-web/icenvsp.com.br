# 🌐 Ambientes — Dev e Produção

tags: #ambiente #hostinger #docker #localhost
related: [[🏠 Início]] · [[Git — Branches e Histórico]] · [[Docker — Configuração Local]]

---

## Comparativo de Ambientes

| Atributo | 🟢 Desenvolvimento | 🟡 Produção |
|---|---|---|
| **URL** | http://localhost:3000 | https://icenvsp.com.br |
| **Branch Git** | `dev-full` | `main` |
| **Commit base** | `a1a76ec` (25/Jul) | `c6ba859` (29/Jul) |
| **Versão do site** | Completa (todas as views) | Simplificada (só Cultos) |
| **Infraestrutura** | Docker + Vite dev server | Hostinger (static hosting) |
| **Hot reload** | ✅ Sim | ❌ Não |
| **Banco de dados** | Supabase (mesmo projeto) | Supabase (mesmo projeto) |
| **Alterar?** | ✅ Livre | ⛔ Somente após aprovação |

> [!caution]
> Ambos os ambientes apontam para o **mesmo projeto Supabase**. Alterações no banco de dados (via AdminView ou schema.sql) afetam produção e desenvolvimento simultaneamente.

---

## 🟢 Ambiente de Desenvolvimento (localhost)

### Como subir

```bash
# Na pasta do projeto
cd C:\Docker\igreja-crist-evan

# Garantir que está no branch correto
git checkout dev-full

# Subir o container
docker-compose up -d

# Ver logs em tempo real
docker logs -f igreja-crist-evan-web-1
```

### Configuração do Container

- **Imagem base:** `node:20-alpine`
- **Porta:** `3000` (mapeada `host:container`)
- **Volumes:** Código-fonte montado em `/app` (hot reload ativo)
- **Variáveis:** `CHOKIDAR_USEPOLLING=true` (necessário para Windows)

### Variáveis de Ambiente (`.env`)

```env
VITE_SUPABASE_URL=https://xhocflsmgkqneqvanpdx.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_...
```

---

## 🟡 Ambiente de Produção (Hostinger)

### Dados do Domínio

| Campo | Valor |
|---|---|
| **Domínio** | icenvsp.com.br |
| **Hospedagem** | Hostinger |
| **Tipo** | Static Site (arquivos compilados) |
| **Build publicado** | `dist_20260729_191647.zip` |
| **Data da publicação** | 29/Jul/2026 |

### Como publicar uma nova versão

> [!warning]
> Execute estes passos **somente após aprovação** da versão completa em desenvolvimento.

```bash
# 1. Garantir que está no branch correto
git checkout dev-full   # ou main após merge

# 2. Gerar o build de produção
npm run build
# → Gera a pasta dist/

# 3. Zipar a pasta dist/
# Nomear com data: dist_YYYYMMDD_HHMMSS.zip

# 4. Enviar via Hostinger (File Manager ou MCP)
# Extrair na pasta public_html/ do domínio
```

### Proteção da versão atual

O arquivo `dist_20260729_191647.zip` está **arquivado no repositório** como referência da versão em produção. Nunca deletar este arquivo enquanto a versão simplificada estiver no ar.

---

## 🔄 Processo de Promoção (dev → produção)

```
dev-full (localhost)
    │
    ▼ Aprovação da versão completa
    │
    ├─ npm run build
    ├─ Testar dist/ localmente (npm run preview)
    ├─ Zipar dist/
    ├─ Enviar ao Hostinger
    │
    ▼ Merge no main (opcional, após publicação)
    │
main (produção)
```
