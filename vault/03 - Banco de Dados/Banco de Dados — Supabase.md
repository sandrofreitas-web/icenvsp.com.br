# 🗄️ Banco de Dados — Supabase

tags: #banco-de-dados #supabase #postgresql #rls
related: [[🏠 Início]] · [[Estrutura do Projeto]] · [[Ambientes — Dev e Produção]]

---

## Configuração do Projeto Supabase

| Campo | Valor |
|---|---|
| **Projeto URL** | `https://xhocflsmgkqneqvanpdx.supabase.co` |
| **Anon Key** | `sb_publishable_tZTKIiCFiYOn24TFkmO4YQ_...` |
| **Arquivo de schema** | [`schema.sql`](../schema.sql) |

> [!caution]
> O mesmo projeto Supabase é usado em **dev e produção**. Alterações no banco afetam ambos os ambientes simultaneamente.

---

## 📋 Tabelas

### `public.sermons` — Sermões

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | BIGINT (PK) | Auto | ID gerado automaticamente |
| `created_at` | TIMESTAMPTZ | Auto | Timestamp de criação |
| `title_pt` | TEXT | ✅ | Título em Português |
| `title_en` | TEXT | — | Título em Inglês |
| `series_pt` | TEXT | ✅ | Nome da série em PT |
| `series_en` | TEXT | — | Nome da série em EN |
| `preacher_pt` | TEXT | ✅ | Nome do pregador em PT |
| `preacher_en` | TEXT | — | Nome do pregador em EN |
| `date` | DATE | ✅ | Data do sermão |
| `theme_pt` | TEXT | — | Tema em PT |
| `theme_en` | TEXT | — | Tema em EN |
| `duration` | TEXT | — | Ex: "42 min" |
| `video_url` | TEXT | — | URL do YouTube |
| `image` | TEXT | — | URL da imagem de capa |
| `verse` | TEXT | — | Versículo bíblico |

### `public.events` — Eventos

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | BIGINT (PK) | Auto | ID gerado automaticamente |
| `created_at` | TIMESTAMPTZ | Auto | Timestamp de criação |
| `day` | TEXT | ✅ | Dia do mês (ex: "18") |
| `month_pt` | TEXT | ✅ | Mês abreviado PT (ex: "AGO") |
| `month_en` | TEXT | — | Mês abreviado EN (ex: "AUG") |
| `year` | TEXT | ✅ | Ano (ex: "2026") |
| `title_pt` | TEXT | ✅ | Título em PT |
| `title_en` | TEXT | — | Título em EN |
| `description_pt` | TEXT | — | Descrição em PT |
| `description_en` | TEXT | — | Descrição em EN |
| `time` | TEXT | ✅ | Horário (ex: "19:30") |
| `location_pt` | TEXT | ✅ | Local em PT |
| `location_en` | TEXT | — | Local em EN |
| `category` | TEXT | — | `'proximos'` · `'conferencias'` · `'ministerios'` |
| `image` | TEXT | — | URL da imagem do evento |

### `public.schedules` — Horários de Culto

| Coluna | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | BIGINT (PK) | Auto | — |
| `day_time_pt` | TEXT | ✅ | Ex: "Domingo, 09h30" |
| `day_time_en` | TEXT | — | Ex: "Sunday, 09:30 AM" |
| `title_pt` | TEXT | ✅ | Nome do culto em PT |
| `title_en` | TEXT | — | Nome do culto em EN |
| `description_pt` | TEXT | — | Descrição em PT |
| `description_en` | TEXT | — | Descrição em EN |
| `sort_order` | INT | — | Ordem de exibição |

---

## 🔐 Segurança (Row Level Security)

RLS está habilitado em todas as tabelas.

| Operação | Permissão | Regra |
|---|---|---|
| SELECT (leitura) | **Público** | `USING (true)` — qualquer visitante pode ler |
| INSERT | Autenticado | `auth.role() = 'authenticated'` |
| UPDATE | Autenticado | `auth.role() = 'authenticated'` |
| DELETE | Autenticado | `auth.role() = 'authenticated'` |

---

## 📦 Storage — Bucket `church-media`

Bucket público para upload de mídias (capas de sermões, flyers de eventos).

| Política | Sujeito | Operação |
|---|---|---|
| Upload de mídia | Autenticado | INSERT |
| Atualizar mídia | Autenticado | UPDATE |
| Deletar mídia | Autenticado | DELETE |
| Leitura pública | Público | SELECT |

---

## 🔄 Dados Dinâmicos vs. Fallback

O site carrega dados do Supabase ao iniciar. Se a consulta retornar vazio ou falhar, usa os dados estáticos de `src/data.ts`:

```typescript
// Exemplo de uso em HomeView.tsx
useEffect(() => {
  getSermons().then((data) => {
    if (data && data.length > 0) setSermons(data);
    // senão → mantém SERMONS de data.ts
  });
}, []);
```

---

## 📊 Dados de Seed (já inseridos)

### Sermões
1. "A Suficiência das Escrituras" — Rev. Marcos S. Oliveira — 12/Jul/2026
2. "O Amor Que Transforma" — Pr. André Silva — 05/Jul/2026

### Eventos
1. "Congresso de Famílias 2026" — 18/Ago/2026 — categoria: `conferencias`
2. "Ação Social no Bairro" — 05/Set/2026 — categoria: `proximos`

### Horários de Culto
1. Domingo 09h30 — Escola Bíblica Dominical (EBD)
2. Domingo 18h00 — Culto de Adoração Principal
3. Terça-feira 20h00 — Reunião de Oração e Estudo Bíblico
