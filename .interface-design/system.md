# Interface Design System — Igreja Cristã Evangélica Nova Vida (ICENV)

Este documento registra as decisões de design, tokens, tipografia, hierarquia e padrões de componentes adotados na interface da ICENV conforme as diretrizes do `@interface-design`.

---

## 🏛️ Direção & Mundo do Produto

- **Domínio:** Comunidade eclesial centenária (desde 1912), liturgia contemporânea, discipulado bíblico, comunhão acolhedora, serviço urbano na metrópole de São Paulo.
- **Mundo de Cores:**
  - `Deep Teal (#0c3945)`: Solidez, tradição, reverência, estrutura.
  - `Teal Médio (#2a8182)`: Vida, esperança, dinamismo, acolhimento comunitário.
  - `Soft Mint / Accent (#bbd2d0)`: Clareza, leveza, respirabilidade litúrgica.
  - `Neutral Dark (#515252)`: Texto secundário refinado e metadados.
  - `Off-white / Canvas (#f8fafb & #ffffff)`: Superfícies luminosas, legíveis e serenas.
- **Assinatura:** O templo com a cruz no frontão e o círculo da pomba ICEB centralizado (`#2a8182`) combinado com o selo centenário "1912" e o lema *"Firmados no Evangelho, intencionais no discipulado, frutíferos na missão."*

---

## 🎨 Arquitetura de Tokens (60 / 30 / 10)

| Token | Valor Hex | Papel no Sistema | Proporção Aprox. |
| :--- | :--- | :--- | :--- |
| `--color-surface` / Canvas | `#ffffff` / `#f8fafb` | Fundo principal dominante, calmo e legível | ~60% |
| `--color-primary` | `#0c3945` | Estrutura, títulos display, cabeçalho de blocos | ~30% |
| `--color-secondary` | `#2a8182` | Ações principais, badges ativos, ícones de destaque | ~10% |
| `--color-accent` | `#bbd2d0` | Borda de destaque suave, títulos em tema escuro | Complementar |
| `--color-neutral-dark`| `#515252` | Corpo de texto com contraste balanceado | Texto |

---

## 📐 Estratégia de Profundidade & Superfícies

- **Estratégia:** Camadas sutis com bordas translúcidas de baixa opacidade e sombras atmosféricas multinível.
- **Sombras:**
  - Ambient: `box-shadow: 0 8px 24px -4px rgba(12, 57, 69, 0.06), 0 1px 2px rgba(12, 57, 69, 0.04)`
  - Card Hover: `transform: translateY(-4px); box-shadow: 0 12px 28px -6px rgba(12, 57, 69, 0.12), 0 0 0 1px rgba(42, 129, 130, 0.08)`
  - Transições: GPU-composited (`transform`, `box-shadow`, `opacity`), duração `<= 250ms`, easing `cubic-bezier(0.23, 1, 0.32, 1)`.

---

## ✍️ Tipografia & Hierarquia

- **Escala de Tipos:**
  - **Display / Títulos Solenes:** *Cormorant Garamond* / *Quartens* (Georgia fallback) para versículos, lemas e cabeçalhos editoriais.
  - **UI / Leitura Contínua:** *Inter* e *Lexend Deca* para máxima legibilidade em botões, cartões, menus e parágrafos.
  - **Metadados / Horários:** *JetBrains Mono* para horários, datas e badges de status tabular.
- **Hierarquia:**
  - Título H1/Display: `font-display font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary`
  - Subtítulo / Slogan: `font-sans text-lg sm:text-xl text-neutral-dark leading-relaxed`
  - Títulos de Seção: `font-sans font-bold text-xl sm:text-2xl text-primary`
  - Rótulos / Badges: `font-mono text-xs font-bold uppercase tracking-wider`

---

## 🏷️ Padrões de Logo (`ChurchLogo.tsx`)

1. **Light Background (TopNavBar, Conteúdo Claro):**
   - Imagem: `icenv-logo-horizontal-colorido.png`
   - Templo: Deep Teal (`#0c3945`)
   - Pomba ICEB & "Nova Vida": Teal Médio (`#2a8182`)
   - "Igreja Cristã Evangélica": Deep Teal (`#0c3945`)
2. **Dark Background (Footer, Seções Escuras):**
   - Imagem: `icenv-logo-horizontal-colorido-dark.png`
   - Templo & "Igreja Cristã Evangélica": Branco puro de alto contraste
   - Pomba ICEB & "Nova Vida": Teal Médio (`#2a8182`)
3. **Selo Centenário / Redondo:**
   - Imagem: `icenv-selo-circular-1912-colorido.png`
   - Usado na seção histórica "Nossa História & Centenário" em `SobreView.tsx`.
