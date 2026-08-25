---
name: church-website-dev
description: Guides the development, styling, database bindings, notifications, and deployment workflow of the ICE Nova Vida church website (icenvsp.com.br). Use when modifying components, layouts, Supabase integration, Resend/WhatsApp alerts, or testing in localhost/Hostinger.
---

# Church Website Development Skill (ICENV SP)

This skill governs the development of the Igreja Cristã Evangélica Nova Vida (ICENV SP) website (`icenvsp.com.br`). Follow these rules, architecture standards, and workflow conventions to ensure development safety, visual alignment, correct routing, and robust data persistence.

---

## 🛠️ Stack Tecnológica Completa

| Camada | Tecnologias / Bibliotecas | Finalidade |
| :--- | :--- | :--- |
| **Frontend & UI** | **React 19**, **TypeScript**, **Vite 6** | Framework SPA moderno com compilação e HMR ultrarrápidos |
| **Estilização** | **Tailwind CSS v4**, **Vanilla CSS** | Sistema de Design System *Heritage & Horizon*, tipografia, glassmorphism e micro-animações |
| **Iconografia** | **Lucide React** | Conjunto de ícones consistentes, acessíveis e customizáveis |
| **Backend & DB** | **Supabase (PostgreSQL 15+)** | Banco relacional com Row Level Security (RLS) e Realtime |
| **Autenticação** | **Supabase Auth** | Autenticação segura por e-mail/senha para o Painel Administrativo (`/admin`) |
| **Storage de Mídia**| **Supabase Storage (`church-media`)** | Bucket público para upload de capas de sermões, flyers e banners |
| **Serverless & Hooks**| **Supabase Edge Functions (Deno)** + **pg_net** | Função serverless `send-contact-email` e Database Webhooks de disparo |
| **E-mail Transacional**| **Resend API** | Disparo de alertas formatados em HTML para a equipe pastoral/liderança |
| **WhatsApp Engine**| **WhatsApp Webhook / Direct Links (`wa.me`)** | Sanitização internacional e links diretos para atendimento pastoral rápido |
| **Container & Dev**| **Docker** & **Docker Compose** | Ambiente isolado e reproduzível na porta `3000` |
| **Deploy & Hosting**| **PowerShell (`deploy-dev.ps1`)** & **FTP Hostinger** | Pipeline de build estático (`dist/`) e upload automatizado |

---

## 🌿 Branching & Ambientes

1. **`dev-full` (Ambiente de Desenvolvimento & Homologação)**:
   - **Branch**: `dev-full`
   - **Local**: Container Docker em `http://localhost:3000`
   - **Homologação Hostinger**: `https://limegreen-salamander-658473.hostingersite.com`
   - **Conteúdo**: Versão completa com todas as abas (`home`, `sobre`, `cultos`, `sermoes`, `eventos`, `contato`, `admin`).
   - **Fluxo**: Todo desenvolvimento, testes e novas funcionalidades são realizados aqui.

2. **`main` (Ambiente de Produção)**:
   - **Branch**: `main`
   - **Domínio Oficial**: `https://icenvsp.com.br`
   - **Conteúdo**: Versão estável simplificada exibindo a aba inicial de boas-vindas/cultos até aprovação final da versão completa.
   - **⚠️ Regra**: Não faça commits diretos na `main`. Apenas promova a partir da `dev-full` quando finalizada.

---

## 🎨 Design System (Heritage & Horizon)

O design combina elegância editorial com modernidade corporativa acolhedora:
- **Paleta de Cores**:
  - Azul Primário: `#007CC3` (navegação, botões principais e cabeçalhos de destaque)
  - Dourado/Gold: `#C9A84C` (badges comemorativos "Desde 1912", ícones nobres e detalhes)
  - Superfície/Fundo: `#FCF8FF` / `#F8FAFC` / `#FFFFFF`
  - Texto e Títulos: `#1A1A2E` (Navy Carvão profundo com alto contraste)
- **Tipografia**:
  - Títulos e Destaques: `Playfair Display` (serifada clássica)
  - Corpo de Texto e UI: `Inter` (sans-serif moderna de alta legibilidade)
  - Badges e Metadados: `JetBrains Mono` / `font-mono`
- **Componentes**: Bordas suaves (`rounded-2xl` / `rounded-3xl`), sombras discretas (`shadow-sm` / `shadow-md`), efeitos de hover suaves (`transition-all duration-300`).

---

## 🗄️ Banco de Dados & RLS (Supabase)

### Tabelas Principais:
1. **`sermons`**: Pregações em vídeo/áudio, séries, pregadores, versículos e datas.
2. **`events`**: Agenda da igreja, conferências, encontros de departamentos e eventos sociais.
3. **`schedules`**: Horários dos cultos dominicais, EBD e reuniões de oração.
4. **`carousel_slides`**: Banners dinâmicos da página inicial com tags, links e ordenação.
5. **`messages`**: Caixa de entrada do formulário de contato (nome, e-mail, telefone, assunto, mensagem, status `unread/read/answered/archived` e notas internas).

### Políticas de Segurança (Row Level Security):
- **Leitura Pública**: `sermons`, `events`, `schedules`, `carousel_slides` (SELECT liberado para público).
- **Envio de Mensagens (`messages`)**: Inserção liberada para público (`WITH CHECK (true)`), mas leitura/edição/exclusão estritamente restrita a usuários autenticados (`auth.role() = 'authenticated'`).
- **Resiliência do Frontend**: A função `sendMessage` realiza o `insert` sem `.select()` imediato para não violar a política de leitura de visitantes anônimos. O sistema sincroniza e limpa automaticamente o buffer do `localStorage` no painel administrativo.

---

## 📬 Módulo de Notificações da Liderança

### 1. Disparo de E-mails (Resend + Edge Function)
- **Edge Function**: `send-contact-email` no Supabase (Deno).
- **Trigger**: Database Webhook (`on-new-message-send-email`) acionado a cada `INSERT` em `public.messages`.
- **Template**: E-mail HTML estilizado com identidade visual da igreja, detalhes do remetente, mensagem completa e botões diretos de "Responder no WhatsApp" e "Responder por E-mail".
- **Segredos da Função**: `RESEND_API_KEY`, `LEADERSHIP_EMAILS`, `SENDER_EMAIL`.

### 2. WhatsApp Pastoral
- Utilitários em `src/lib/notifications.ts`:
  - `sanitizeWhatsAppNumber()`: Converte números nacionais e internacionais para formato internacional `5511999999999`.
  - `generateWhatsAppResponseUrl()`: Gera links diretos `wa.me` com mensagem inicial pré-preenchida para resposta em 1 clique.
  - `triggerNotificationEngines()`: Suporte pronto para integração via Webhook com gateways WhatsApp (Evolution API / Z-API / Twilio).

---

## 🌐 Internacionalização (Bilinguismo PT/EN)

- A aplicação suporta **Português (PT)** e **Inglês (EN)**.
- Todos os textos estáticos são centralizados no dicionário `DICTIONARY` dentro de `src/data.ts`.
- Registros dinâmicos possuem colunas específicas (ex: `title_pt` e `title_en`).

---

## 🚀 Comandos & Rotinas de Deploy

### 1. Rodar Localmente (Docker)
```bash
docker compose up -d
# Acesso local em: http://localhost:3000
```

### 2. Compilar Build de Produção
```bash
docker compose exec web npm run build
```

### 3. Deploy no Domínio Temporário da Hostinger
```powershell
pwsh -File .\deploy-dev.ps1
# Deploy automático via FTP para https://limegreen-salamander-658473.hostingersite.com
```
