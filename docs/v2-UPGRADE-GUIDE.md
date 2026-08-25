# Guia de Arquitetura e Novas Funcionalidades (v2) — ICENV SP

Este documento descreve as novas funcionalidades, arquitetura de integração e componentes implementados na versão v2 do portal da **Igreja Cristã Evangélica Nova Vida**.

---

## 1. Módulo de Contatos & Gestão de Mensagens

- **Componente:** `src/components/ContatoView.tsx`
- **Fluxo de Dados:**
  1. O visitante preenche o formulário com Validação de campos e seleção de assunto (`info`, `prayer`, `pastoral`, `admin`, `ministries`).
  2. A função `sendMessage` ([src/lib/supabase.ts](file:///c:/Docker/igreja-crist-evan/src/lib/supabase.ts)) realiza a gravação direta na tabela `messages` do Supabase.
  3. A inserção não exige leitura imediata (`.select()`), respeitando a política de segurança RLS pública do banco.
  4. Caso o banco esteja temporariamente inacessível, o sistema ativa um buffer de segurança no `localStorage`, que é sincronizado e limpo assim que a conexão é restabelecida.

---

## 2. Módulo de Notificações Automáticas (E-mail & WhatsApp)

- **Supabase Edge Function:** `send-contact-email`
- **Orquestração:**
  - **Database Webhook:** Configurado na tabela `public.messages` disparando em eventos `INSERT`.
  - **Serviço de E-mail:** [Resend API](https://resend.com) integrado com template HTML responsivo contendo dados completos do contato e botões de ação rápida.
  - **WhatsApp Pastoral:** Links diretos inteligentes com formato internacional `wa.me/55...` com mensagem pré-formatada para resposta em 1 clique pelo pastor/secretaria.

---

## 3. Painel Administrativo (`AdminView.tsx`)

Área restrita e segura com autenticação via Supabase Auth:
- **Gestão de Sermões:** Adicionar, editar e remover vídeos, pregadores e versículos.
- **Gestão de Eventos:** Cadastro de conferências e eventos com upload de imagens para o bucket `church-media`.
- **Gestão de Horários:** Configuração da grade de cultos e EBD.
- **Banners da Home:** Gestão do carrossel principal.
- **Caixa de Entrada Inteligente:**
  - Visualização de mensagens com filtros por status (*Não lidas, Lidas, Respondidas, Arquivadas*) e categorias.
  - Adição de notas internas da liderança em cada mensagem.
  - Ações rápidas de contato via WhatsApp e e-mail com 1 clique.

---

## 4. Design System (*Heritage & Horizon*)

- **Tipografia:** Google Fonts (`Playfair Display` + `Inter` + `JetBrains Mono`).
- **Paleta:** Azul `#007CC3`, Ouro `#C9A84C`, Superfície `#FCF8FF` e Texto `#1A1A2E`.
- **Acessibilidade:** Suporte a leitores de tela, títulos semânticos e bilinguismo dinâmico (Português/Inglês).
