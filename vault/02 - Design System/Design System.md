# 🎨 Design System — Heritage & Horizon

tags: #design #ui #cores #tipografia
related: [[🏠 Início]] · [[Estrutura do Projeto]]

---

## Personalidade da Marca

> **Solemn yet Welcoming** — Solene, porém Acolhedor

O design evita a frieza corporativa e a efemeridade de apps de consumo. A estética é **Corporativa Moderna com Graça Editorial**: espaço em branco generoso, tipografia de qualidade e calor humano através dos acentos dourados e azuis profundos.

---

## 🎨 Paleta de Cores

### Cores Principais

| Token | Hex | Uso |
|---|---|---|
| `primary` | `#00629C` | Cor interativa principal |
| `primary-container` | `#007CC3` | Headers, botões primários |
| `tertiary` | `#755B00` | Acento dourado |
| `tertiary-container` | `#C8A74B` | **Gold Accent** — destaques e CTAs |
| `on-surface` | `#1A1A2E` | Texto principal (azul-carvão) |
| `surface` | `#FCF8FF` | Fundo principal |
| `surface-alt` | `#F8FAFC` | Fundo de seções alternadas |

### Cores de Superfície (Tonal Layers)

| Token | Hex |
|---|---|
| `surface-container-lowest` | `#FFFFFF` |
| `surface-container-low` | `#F5F2FF` |
| `surface-container` | `#EFECFF` |
| `surface-container-high` | `#E8E5FF` |
| `surface-container-highest` | `#E2E0FC` |

> [!tip]
> O **Gold Accent (`#C9A84C`)** deve ser usado com parcimônia — jamais como fundo de áreas grandes. Funciona como "luz" na interface.

---

## 🔤 Tipografia

### Fontes

| Família | Uso | Personalidade |
|---|---|---|
| **Playfair Display** | Display e Headline | "Instituição centenária" — peso e autoridade |
| **Inter** | Body e Labels | Contraste moderno, legibilidade funcional |

### Escala Tipográfica

| Token | Fonte | Tamanho | Peso | Line Height |
|---|---|---|---|---|
| `display-lg` | Playfair Display | 56px | 700 | 64px |
| `display-lg-mobile` | Playfair Display | 40px | 700 | 48px |
| `headline-lg` | Playfair Display | 32px | 600 | 40px |
| `headline-md` | Playfair Display | 24px | 600 | 32px |
| `body-lg` | Inter | 18px | 400 | 28px |
| `body-md` | Inter | 16px | 400 | 24px |
| `label-md` | Inter | 14px | 600 | 20px |
| `caption` | Inter | 12px | 400 | 16px |

---

## 📐 Layout e Espaçamento

| Propriedade | Valor |
|---|---|
| Grid desktop | 12 colunas |
| Grid mobile | 4 colunas |
| Base unit | 8px |
| Container máximo | 1200px |
| Gutter | 24px |
| Margem mobile | 16px |
| Margem desktop | 48px |
| Section gap | 80px |
| Breakpoint mobile | < 600px |
| Breakpoint tablet | 600px – 1024px |
| Breakpoint desktop | > 1024px |

---

## 🔲 Shapes e Bordas

| Elemento | Border Radius |
|---|---|
| Botões e Inputs | 4px (0.25rem) |
| Cards | 8px (0.5rem) |
| Chips/Badges | 9999px (full) |

---

## 🌊 Elevation (Sombras)

O sistema evita sombras agressivas. Profundidade via **camadas tonais**:

- **Sombra ambiente:** `0px 10px 30px rgba(26, 26, 46, 0.05)`
- **Dividers:** `1px sólido #E8F4FB`
- **Hover em cards:** sombra ambiente + deslocamento de 2px para cima

---

## 🧩 Componentes

### Botões

| Tipo | Background | Texto | Uso |
|---|---|---|---|
| Primary | `#007CC3` | `#FFFFFF` | Ações principais |
| Secondary | Transparente | `#007CC3` | Ações secundárias |
| CTA/Accent | `#C9A84C` | `#FFFFFF` | "Junte-se" / "Doe" |

### Cards

- Background: `#FFFFFF` com borda `1px #E8F4FB`
- Sem sombra por padrão
- Hover: sombra ambiente + translate `-2px` no eixo Y

### Chips/Badges

- Background: `#E8F4FB`
- Texto: `#005A8E` · Inter 12px uppercase
- Exemplos: "Jovens", "Missões", "EBD"
