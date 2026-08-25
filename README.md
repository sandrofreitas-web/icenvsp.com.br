# Igreja Cristã Evangélica Nova Vida (ICENV SP) — Website Oficial

Portal web oficial da **Igreja Cristã Evangélica Nova Vida em São Paulo** (fundada em 1912). Aplicação web moderna, bilíngue (PT/EN), com integração completa ao Supabase para gestão de pregações, eventos, cultos e caixa de mensagens com alertas automáticos para a liderança pastoral.

---

## 🛠️ Stack Tecnológica

- **Frontend:** [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Dev Server:** [Vite 6](https://vitejs.dev/)
- **Estilização:** [Tailwind CSS v4](https://tailwindcss.com/) com Design System personalizado (*Heritage & Horizon*)
- **Ícones:** [Lucide React](https://lucide.dev/)
- **Banco de Dados & Auth:** [Supabase](https://supabase.com/) (PostgreSQL 15+, Row Level Security, Storage Buckets)
- **Serverless & Automações:** Supabase Edge Functions (Deno) + Database Webhooks (`pg_net`)
- **Notificações por E-mail:** [Resend API](https://resend.com/) com templates HTML responsivos
- **WhatsApp Engine:** Sanitização internacional e links diretos para atendimento pastoral (`wa.me`)
- **Containerização:** [Docker](https://www.docker.com/) & Docker Compose
- **Deploy:** Hostinger Static Web Hosting via script automatizado FTP em PowerShell (`deploy-dev.ps1`)

---

## 🏛️ Estrutura de Módulos e Abas

1. **Home (`HomeView.tsx`):** Hero section dinâmico com carousel de slides personalizável, destaques ministeriais, horários de cultos e chamada para ação.
2. **Sobre Nós (`SobreView.tsx`):** História da igreja (desde 1912), declaração doutrinária, liderança pastoral e confissão de fé.
3. **Cultos & Horários (`CultosView.tsx`):** Grade semanal de cultos dominicais, EBD, reuniões de oração e estudos bíblicos.
4. **Sermões & Mensagens (`SermoesView.tsx`):** Catálogo de pregações em vídeo do YouTube com filtragem por série, pregador e tema.
5. **Eventos (`EventosView.tsx`):** Agenda de conferências, congressos de famílias, eventos sociais e ministeriais.
6. **Contatos (`ContatoView.tsx`):** Formulário de contato inteligente com categorias de assunto (*Aconselhamento Pastoral, Pedido de Oração, Secretaria, Geral*), mapa do Google Maps integrado e fachada histórica.
7. **Painel Administrativo (`AdminView.tsx`):** Área restrita para pastores e secretários logados gerenciarem sermões, eventos, horários, banners e caixa de entrada com marcação de status e notas.

---

## 🚀 Como Executar o Projeto

### Pré-requisitos
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado e em execução.

### Passo a Passo:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/sandrofreitas-web/icenvsp.com.br.git
   cd igreja-crist-evan
   ```

2. **Configurar as Variáveis de Ambiente:**
   Copie o arquivo de exemplo:
   ```bash
   cp .env.example .env
   ```
   Preencha no `.env` com suas credenciais do Supabase:
   ```env
   VITE_SUPABASE_URL="https://seu-projeto.supabase.co"
   VITE_SUPABASE_ANON_KEY="sua-anon-key"
   ```

3. **Iniciar o ambiente Docker:**
   ```bash
   docker compose up -d
   ```

4. **Acessar no navegador:**
   - **Ambiente Local:** [http://localhost:3000](http://localhost:3000)

---

## 📦 Deploy para Homologação / Hostinger

Para compilar a aplicação e enviar via FTP diretamente para o domínio de teste da Hostinger:

```powershell
pwsh -File .\deploy-dev.ps1
```

- **Ambiente de Homologação:** [https://limegreen-salamander-658473.hostingersite.com](https://limegreen-salamander-658473.hostingersite.com)
- **Domínio Oficial de Produção:** [https://icenvsp.com.br](https://icenvsp.com.br)

---

## 🔒 Segurança e Banco de Dados (Supabase)

O script SQL de criação de todas as tabelas e políticas de Row Level Security (RLS) encontra-se em [`schema.sql`](./schema.sql).
Execute o conteúdo do arquivo no **SQL Editor** do Supabase para inicializar a estrutura completa.
