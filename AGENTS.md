# Diretrizes do Agente & Skills do Workspace (ICENV SP Website)

Este documento define as diretrizes, regras arquiteturais e skills ativas para o agente Gemini no ambiente Google Antigravity IDE.

---

## 🎯 Skill de Domínio do Workspace

### `church-website-dev`
* **Caminho:** [SKILL.md](file:///c:/Docker/igreja-crist-evan/.agents/skills/church-website-dev/SKILL.md)
* **Finalidade:** Governa o desenvolvimento do portal oficial da Igreja Cristã Evangélica Nova Vida em SP (`icenvsp.com.br`).
* **Gatilhos de Aplicação:**
  * Desenvolvimento e refatoração de componentes React 19 / Vite 6 / TypeScript.
  * Integração com Supabase (PostgreSQL, RLS, Edge Functions, Storage `church-media`).
  * Formulário de contato, Webhooks e notificações (Resend API e links diretos WhatsApp `wa.me`).
  * Bilinguismo (PT/EN) e internacionalização através de `DICTIONARY` (`src/data.ts`).
  * Rotinas de build Docker e pipeline de deploy Hostinger (`deploy-dev.ps1`).

---

## 🎨 Design System

* **Especificação Visual:** [DESIGN.md](file:///c:/Docker/igreja-crist-evan/DESIGN.md) (*Heritage & Horizon*)
  * Paleta nobre (Azul Primário `#007CC3`, Dourado `#C9A84C`, Navy `#1A1A2E`, Fundo `#FCF8FF`).
  * Tipografia clássica e moderna: `Playfair Display` (títulos) e `Inter` (UI/corpo de texto).
  * Componentes com Tailwind CSS v4, bordas suaves e micro-animações.

---

## 🌐 Skills Globais Ativas no Ambiente Gemini

As seguintes skills operam em nível global (`~/.gemini/config/skills/`) e estão automaticamente disponíveis para este workspace:
* **`interface-design`:** Craft-first design para dashboards, componentes e páginas interativas.
* **`code-review`:** Revisão técnica de PRs, diffs, segurança e boas práticas de código.
* **`skill-creator`:** Desenvolvimento e benchmarking de novas skills para agentes.
* **`managing-python-dependencies`:** Gerenciamento seguro de ambientes e pacotes Python com `uv`.

---

## 🏗️ Padrões Arquiteturais do Projeto
* **Frontend:** React 19, TypeScript, Vite 6, Tailwind CSS v4, Lucide React.
* **Backend BaaS:** Supabase (PostgreSQL 15+, RLS, Edge Functions, Realtime, Storage).
* **Ambiente:** Docker & Docker Compose (`http://localhost:3000`).
* **Deploy:** Script PowerShell FTP (`deploy-dev.ps1`) para Hostinger.
