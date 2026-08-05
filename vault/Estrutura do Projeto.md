# 🏗️ Estrutura do Projeto

tags: #projeto #arquitetura #componentes
related: [[🏠 Início]] · [[Git — Branches e Histórico]] · [[Design System]]

---

## Stack Tecnológica

| Camada | Tecnologia | Versão |
|---|---|---|
| Framework UI | React | 19 |
| Build Tool | Vite | 6.x |
| Linguagem | TypeScript | ~5.8 |
| Estilização | TailwindCSS | v4 |
| Ícones | Lucide React | ^0.546 |
| Animações | Motion (Framer) | ^12 |
| Backend/DB | Supabase | ^2.110 |
| IA | Google GenAI | ^2.4 |
| Runtime Dev | Docker + Node | 20-alpine |

---

## 📁 Estrutura de Diretórios

```
igreja-crist-evan/
│
├── 📂 src/                        ← Código-fonte principal
│   ├── App.tsx                    ← Root: roteamento entre views
│   ├── main.tsx                   ← Entry point do React
│   ├── data.ts                    ← Conteúdo estático + dicionário PT/EN
│   ├── types.ts                   ← Tipos TypeScript globais
│   ├── index.css                  ← Estilos globais + tokens CSS
│   │
│   ├── 📂 components/
│   │   ├── TopNavBar.tsx          ← Navegação superior (mobile + desktop)
│   │   ├── Footer.tsx             ← Rodapé institucional
│   │   ├── HomeView.tsx           ← Página Inicial (hero + eventos + sermões)
│   │   ├── SobreView.tsx          ← Sobre a Igreja (história + liderança)
│   │   ├── CultosView.tsx         ← Horários e liturgia dos cultos
│   │   ├── SermoesView.tsx        ← Biblioteca de sermões/pregações
│   │   ├── EventosView.tsx        ← Agenda de eventos
│   │   ├── ContatoView.tsx        ← Formulário + mapa de localização
│   │   ├── AdminView.tsx          ← Painel administrativo (autenticado)
│   │   ├── ChurchLogo.tsx         ← Logo da ICE Nova Vida
│   │   └── DenominationLogo.tsx   ← Logo da denominação ICE
│   │
│   ├── 📂 lib/
│   │   └── supabase.ts            ← Cliente Supabase + queries
│   │
│   └── 📁 [assets de imagem]      ← Fotos, logos PNG/JPG
│
├── 📂 vault/                      ← Documentação do projeto (Obsidian)
├── 📂 stitch_downloads/           ← Designs de referência (HTML + PNG)
├── 📂 dist/                       ← Build de produção (gerado pelo Vite)
│
├── Dockerfile                     ← Imagem Node 20-alpine para dev
├── docker-compose.yml             ← Orquestração do container local
├── schema.sql                     ← Schema do banco Supabase
├── DESIGN.md                      ← Sistema de design Heritage & Horizon
├── vite.config.ts                 ← Configuração do Vite
├── package.json                   ← Dependências e scripts npm
└── .env                           ← Credenciais Supabase (não commitado)
```

---

## 🖥️ Roteamento de Views

O arquivo `App.tsx` controla qual view é exibida via `useState`:

```typescript
// Aba ativa inicial
const [activeTab, setActiveTab] = useState<ActiveTab>('home');

// Switch de roteamento
switch (activeTab) {
  case 'home'    → HomeView
  case 'sobre'   → SobreView
  case 'cultos'  → CultosView
  case 'sermoes' → SermoesView
  case 'eventos' → EventosView
  case 'contato' → ContatoView
  case 'admin'   → AdminView
}
```

> [!note]
> Na versão simplificada do `main` (produção), o switch foi substituído por `return <CultosView />` fixo — apenas a página de Cultos é exibida.

---

## 🌐 Multi-idioma

O site suporta **Português (pt)** e **Inglês (en)** via dicionário centralizado em `src/data.ts`:

```typescript
export const DICTIONARY = {
  pt: { navHome: 'Início', ... },
  en: { navHome: 'Home', ... }
}
```

O idioma é controlado pelo `TopNavBar` e propagado via props para todos os componentes.

---

## 🗄️ Dados Dinâmicos vs. Estáticos

| Dado | Fonte | Fallback |
|---|---|---|
| Sermões | Supabase (`sermons`) | `SERMONS` em `data.ts` |
| Eventos | Supabase (`events`) | `EVENTS` em `data.ts` |
| Liderança | `data.ts` (estático) | — |
| Horários de Culto | `data.ts` (estático) | — |
| Conteúdo histórico | `data.ts` (estático) | — |
