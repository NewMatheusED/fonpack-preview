# Vitrine FonPack — Design / Especificação

**Data:** 2026-07-10
**Status:** Aprovado (aguardando revisão do spec)
**Autor:** Beergam + Claude

---

## 1. Visão geral

Vitrine online (catálogo institucional) para a **FonPack Embalagens** — empresa de embalagens de
Embu-Guaçu/SP. O site apresenta os dados da empresa e um catálogo de produtos onde o cliente monta
um **carrinho de orçamento** selecionando os atributos de cada produto, e finaliza enviando o pedido
pronto pelo **WhatsApp** da empresa.

É um **clone limpo e reescrito** de um modelo que o cliente já construiu no **Framer**
(https://enlivened-pomegranate-317762-1e9fffd39.framer.app/). O modelo serve como referência de
**design, paleta, componentes e usabilidade** — o código do Framer **não** é reaproveitado; tudo é
reconstruído do zero com arquitetura organizada, no padrão do projeto Beergam.

### Objetivos
- Espelhar fielmente o design/UX do modelo Framer (paleta, tipografia, layout, componentes)
- Melhorar o que der: acessibilidade, performance, mobile, SEO, correção de erros do modelo
- Código organizado e padronizado (arquitetura por feature, cores nomeadas, componentes isolados)
- Deploy simples em hospedagem compartilhada **HostGator** (build estático)

### Não-objetivos (YAGNI)
- **Sem backend, sem banco de dados, sem Node no servidor** — SPA 100% estática
- **Sem pagamento online / gateway** — a conversão é orçamento via WhatsApp
- **Sem preços** — o modelo não exibe preço (valor é negociado no orçamento)
- **Sem painel admin** — produtos são gerenciados por arquivo de dados (JSON/TS)
- **Sem login/conta de usuário**
- **Sem SSR** — o padrão Beergam usa React Router em modo SSR (`react-router-serve`), que exige Node;
  em hospedagem compartilhada isso **não roda**. Aqui é SPA estática pura.

---

## 2. Stack & justificativa

| Camada | Escolha | Porquê |
|---|---|---|
| Build/runtime | **Vite + React 19 + TypeScript** | Leve, build estático, ferramental do usuário |
| Estilo | **Tailwind CSS** | Pedido do usuário; leve; casa com o modelo |
| Componentes | **shadcn/ui** (Radix) | Código copiado pro repo (o usuário é dono), acessível, ótimo mobile |
| Estado | **Zustand** (persistido em localStorage) | Padrão Beergam; ideal pro carrinho |
| Busca | **fuse.js** | Padrão Beergam; busca fuzzy no catálogo |
| Roteamento | **react-router-dom** (`BrowserRouter`, modo declarativo SPA) | Família que o usuário já domina; SPA estática, sem SSR |
| Deploy | **HostGator compartilhado** | `vite build` → `dist/` na `public_html` + `.htaccess` |

**Filosofia de cores (herdada do Beergam):** as cores são **CSS custom properties semânticas**
namespaced pela marca (ex.: `--color-brand-primary`), definidas num único arquivo de tokens e
plugadas no `tailwind.config`. Trocar a marca inteira = editar um arquivo.

---

## 3. Arquitetura (por feature, padrão Beergam)

```
src/
├── features/
│   ├── catalog/
│   │   ├── components/   → ProductGrid, ProductCard, CategoryTabs, SearchBar
│   │   ├── data/         → categorias.ts, produtos.ts (o "JSON" do catálogo)
│   │   ├── hooks.ts      → useCatalog, useCategoryFilter, useSearch (fuse)
│   │   └── typings.ts
│   ├── product/
│   │   ├── components/   → ProductLayout, VariationStepper, VariationGroup,
│   │   │                   OptionRow, ColorSwatch, ToggleField, TextField,
│   │   │                   ProductGallery, DescriptionList, PrevNextNav
│   │   ├── hooks.ts      → useProduct(slug), useVariationSelection
│   │   └── typings.ts
│   ├── cart/
│   │   ├── components/   → CartSheet, CartItem, CartButton (ícone header)
│   │   ├── store.ts      → Zustand persistido (itens do orçamento)
│   │   └── typings.ts
│   ├── company/          → components/ (Hero, DiferenciaisBand, InstitutionalSplit,
│   │                       MissionVisionValues) — usados em Home e Sobre
│   └── contact/          → components/ (ContactCards) — Fale conosco
├── components/
│   ├── ui/               → shadcn (Button, Sheet, Tabs, Switch, Input, Toast...)
│   └── layout/           → Header, Footer, Layout, WhatsAppFloat, FMonogram
├── lib/
│   ├── whatsapp.ts       → monta a mensagem de orçamento e a URL wa.me
│   ├── company.ts        → dados fixos da empresa (endereço, whatsapp, email, redes)
│   └── utils.ts
├── styles/
│   └── tokens.css        → CSS vars da marca (cores) + @font-face
└── routes/               → /, /loja, /catalogo/:slug, /sobre-nos, /fale-conosco
```

Cada feature tem responsabilidade única e interface bem definida (mesma disciplina do Beergam:
`components/ + hooks + service/store + typings`).

---

## 4. Design system (extraído do modelo)

### 4.1 Cores (tokens `--color-brand-*`)
| Token | Hex | Uso |
|---|---|---|
| `--color-brand-primary` | `#3c5e3d` | Verde escuro: faixas, cards preenchidos, botão primário |
| `--color-brand-primary-2` | `#567644` | Verde médio: acentos, hover |
| `--color-brand-green-soft` | `#bdd8b7` | Verde claro |
| `--color-brand-surface` | `#f5f1e6` | Creme: fundo geral, header, footer, cards |
| `--color-brand-surface-2` | `#fcfbf5` | Creme quase branco |
| `--color-brand-accent` | `#dac195` | Tan/dourado: detalhes |
| `--color-brand-accent-2` | `#a57547` | Marrom/dourado escuro |
| `--color-brand-text` | `#2b2b2b` | Texto principal |
| `--color-brand-muted` | `#858585` | Texto secundário / selos |
| `--color-brand-white` | `#ffffff` | Cards brancos (produto) |

Mapear no `tailwind.config` como `primary`, `surface`, `accent`, `muted`, etc.

### 4.2 Tipografia
- **Amiri** (serifada) — títulos display (verde). Ex.: "Protegendo o que é importante para você"
- **Alata** (sans) — corpo, labels, UI, títulos de produto (peso maior)
- **Italianno / serif decorativa** — o monograma "F" gigante do rodapé
- Self-hosted via `@fontsource` (`@fontsource/amiri`, `@fontsource/alata`, `@fontsource/italianno`) —
  sem depender do Google Fonts em runtime (mais rápido e resiliente no deploy).

### 4.3 Componentes-base (estilo do modelo)
- **Botões pílula**: primário = verde sólido + texto branco; secundário = creme/branco com borda
- **Cards** arredondados (~16px), sombra suave, fundo creme ou branco
- **Faixa de diferenciais**: 4 itens com ícones de linha (recycle, shield, box, truck), branca sobre
  verde (home/sobre) ou sobre creme (produto)
- **Header**: creme, logo central "FonPack / Embalagens" (marca folha-F verde+dourado), nav à direita
  (Loja · Contatos · Sobre nós) + ícone de sacola (carrinho). Mobile: hambúrguer + sacola.
- **Footer**: creme, coluna "Fale conosco" (endereço/whatsapp/email) + "Links rápidos" + monograma
  "F" verde gigante + botão pílula WhatsApp.

---

## 5. Páginas

Todas com Header (creme) + Footer (monograma "F"). Rotas usam slug **sem acento**.

### 5.1 Home (`/`)
1. **Hero** split: título serifado verde ("Protegendo o que é importante para você") + subtítulo +
   botão "Conheça nossos produtos" · foto de caixas/bobina kraft
2. **Faixa verde** — 4 diferenciais: Sustentável, Resistência, Personalizados, Entrega rápida
3. **"Nossos produtos"** — 5 cards em destaque (`destaque: true`): Fita Acrílica, Bobina Plástico
   bolha, Caixa Corte vinco, Caixa Maleta 30, Divisória + botão "Ver todos os produtos"
4. **Bloco institucional split** (painel verde): "Embalamos mais que produtos, embalamos confiança."
   + parágrafo + botão "Nos conheça"
5. **"Tem alguma dúvida?"** → chamada pro Fale conosco

### 5.2 Loja (`/loja`)
- Banner topo
- **Abas de categoria**: `Tudo · Cantoneiras · Bobinas · Acessórios · Caixas · Fitas` + **busca**
  ("Buscar...", fuse.js)
- **Grid 3 colunas** de cards: foto + nome (serif) + **selo** (medida como `40cm`/`48x100` ou status
  `Suas medidas`/`Consultar medidas`/`PRONTA-ENTREGA`)

### 5.3 Produto (`/catalogo/:slug`)
- Breadcrumb `Home / Loja / <Categoria> / <Produto>` + navegação **prev/next** entre produtos
- Layout 2 colunas dentro de card branco:
  - **Esquerda**: galeria (foto) + linha divisória + **"Descrição Básica"** (lista de bullets)
  - **Direita**: título + "Vendido e entregue por FonPack Embalagens" + **Stepper de atributos** +
    CTAs
- **Stepper de atributos** (ver §6): grupos de variação renderizados por tipo
- **CTAs**: `Adicionar ao orçamento` (verde) · `Comprar agora (WhatsApp)` (branco/borda) ·
  `Falar com um especialista` (link)
- Toast "Produto adicionado com sucesso!" + "Ver orçamento" (abre o CartSheet)
- Abaixo: faixa de 4 diferenciais (versão creme)

### 5.4 Sobre (`/sobre-nos`)
1. Hero "Quem somos" + título serifado + parágrafo · foto
2. Faixa verde — 4 pilares: Segurança, Praticidade, Eficiência, Qualidade
3. Bloco "Qualidade que acompanha cada envio..." + 2 parágrafos
4. **Missão / Visão / Valores** — 3 cards (Visão em verde preenchido, os outros creme)

### 5.5 Fale conosco (`/fale-conosco`)
- Banner (foto entrega)
- **3 cards de contato**: WhatsApp · Enviar E-mail · Telefone — cada um com ícone circular, "Tire suas
  dúvidas", botão de ação, "Retornamos rapidamente"
- **Melhoria**: no modelo esses cards estão roxo/azul/vermelho (default do template Framer, fora da
  identidade). Rebrandar para o verde/tan da marca.

---

## 6. Sistema de atributos / variações (o núcleo)

Cada produto tem **0..N grupos de variação**. Um produto com vários grupos exibe um **stepper**
(ex.: `VARIAÇÃO → COR → IMPRESSÃO → DIMENSÕES`). Cada grupo tem um `tipo`:

| Tipo | Render | Exemplo real |
|---|---|---|
| `opcoes` | Linhas selecionáveis (nome + sub-label + botão `+`) | Fita Acrílica: `48x50 (CONTÉM 100 ROLOS)`, `48x100 (CONTÉM 80 ROLOS)`, `48x100 - Hot Melt (72 ROLOS)`, `48x1200 - Hot Melt (6 ROLOS)`. Bobina Kraft: `40cm`, `60cm`, `1m`. Corte vinco onda: `B/C/D/BB/BC` |
| `swatch` | Círculos de cor | Corte vinco: pardo, branco |
| `toggle` | Switch sim/não | Corte vinco: "Necessita de Impressão? — Sim, com personalização de marca" |
| `texto` | Input livre | Corte vinco: "Dimensões customizadas — Ex: 48x50x50" |

**Comportamento:** selecionar uma opção `opcoes` (via botão `+`) adiciona **aquela variação** ao
orçamento (é possível adicionar múltiplas variações do mesmo produto). `swatch`/`toggle`/`texto`
compõem os detalhes da variação corrente antes de adicionar. Sem preço em nenhum ponto.

### Schema de dados (TypeScript)
```ts
type Categoria = { id: string; nome: string; slugPlural: string; ordem: number }

type VariationOption = { label: string; sublabel?: string; value: string }

type VariationGroup =
  | { titulo: string; tipo: 'opcoes'; instrucao?: string; opcoes: VariationOption[] }
  | { titulo: string; tipo: 'swatch'; instrucao?: string; opcoes: { label: string; cor: string }[] }
  | { titulo: string; tipo: 'toggle'; instrucao?: string; label: string; ajuda?: string }
  | { titulo: string; tipo: 'texto';  instrucao?: string; placeholder: string }

type Produto = {
  slug: string            // sem acento, ex.: 'corte-vinco'
  nome: string            // 'Caixa Corte vinco'
  categoriaId: string     // 'caixa'
  badge: string           // 'Suas medidas' | 'PRONTA-ENTREGA' | '48x100' ...
  imagens: string[]       // baixadas do Framer p/ /public/produtos
  descricao: string[]     // bullets da "Descrição Básica"
  destaque?: boolean      // aparece na home
  variacoes: VariationGroup[]
  stepper?: string[]      // rótulos do stepper: ['VARIAÇÃO','COR','IMPRESSÃO','DIMENSÕES']
}
```

### Catálogo (35 produtos, 5 categorias)
- **Caixa** (12): Arquivo morto, Corte vinco, Envoltório, Expositora, Mala, Maleta, Maleta 20/30/40,
  Palete, Tampa e fundo, Tubo
- **Bobina** (9): Kraft, Kraftmono, Papelão ondulado, Plástico bolha, Salva piso, Semikraft, Stretch,
  Manopla Stretch, Manta de polietileno expandida
- **Fita** (7): Acrílica, "Cuidado frágil", Personalizada, Arquear, Crepe, Gomada, Kraft
- **Acessório** (4): Chapa de papelão, Divisória, Proteção lateral, Tabuleiro
- **Cantoneira** (3): De papelão, De polietileno, Rígida

> Dados de referência completos (títulos, breadcrumbs, descrições, selos) em
> `docs/reference/data/` e screenshots em `docs/reference/screenshots/`.

---

## 7. Carrinho → Orçamento WhatsApp

- **Store Zustand** persistida (`localStorage`), com `createSelectors` no estilo Beergam.
- Item do carrinho = `{ produtoSlug, nome, variacaoResumo: string, quantidade }`.
- **CartSheet** (drawer lateral shadcn/Radix; no mobile, drawer de baixo pra cima) lista os itens.
- **Finalizar**: `lib/whatsapp.ts` monta a mensagem, ex.:
  ```
  Olá! Gostaria de um orçamento:

  • Caixa Corte vinco — Onda: B | Cor: Pardo | Impressão: Sim | Dim: 48x50x50 — Qtd: 2
  • Bobina Kraft — Tamanho: 60cm — Qtd: 1

  Enviado pela vitrine FonPack.
  ```
  e abre `https://wa.me/5511942508424?text=<encoded>`.
- **Atalho "Comprar agora (WhatsApp)"** no produto: monta a mensagem só com a variação corrente.

### Dados fixos da empresa (`lib/company.ts`)
- **Nome:** FonPack Embalagens
- **Endereço:** R. Sesefredo Klein Doll, 900 — Cipó, Embu-Guaçu - SP, 06933-080
- **WhatsApp:** (11) 94250-8424 → `wa.me/5511942508424`
- **E-mail:** fonpack@hotmail.com

---

## 8. Melhorias sobre o modelo Framer
1. Remover artefatos do Framer: banner "BUY LICENSE", badge "Made in Framer", monograma quebrado
2. Rebrandar os cards de contato (roxo/azul/vermelho → verde/tan)
3. Corrigir erros de conteúdo: "Fita Acrilica" → "Fita Acrílica"; "Os pilares que guia" → "que guiam"
4. Mobile polido (Radix Sheet/Drawer, alvos de toque, tipografia responsiva)
5. Acessibilidade (foco, teclado, aria) via Radix
6. Performance: imagens otimizadas (webp) + `loading="lazy"` + `vite build` enxuto
7. SEO: `<title>`, meta description e OpenGraph por página; `sitemap.xml`; favicon próprio
8. Micro-efeitos: hover nos cards, transições suaves (padrão `transition: all .3s ease` do Beergam)

---

## 9. Deploy (HostGator compartilhado)
1. `vite build` → gera `dist/` (HTML/CSS/JS estáticos + assets)
2. Subir o conteúdo de `dist/` para a `public_html` (ou subpasta) via File Manager/FTP
3. **`.htaccess`** com fallback de SPA (todas as rotas → `index.html`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```
4. Se for subpasta, ajustar `base` no `vite.config.ts` e o `RewriteBase`.

---

## 10. Fase de conteúdo (extração do Framer)
Decisões do usuário: **imagens baixadas do Framer** e **atributos extraídos do site agora**.
- **Imagens**: baixar de `framerusercontent.com` (URLs já mapeadas por página) → `public/produtos/`,
  converter p/ webp. Usuário substitui por versões melhores depois, se quiser.
- **Atributos**: extrair via render headless (Puppeteer, mesmo método já usado na fase de pesquisa)
  os grupos de variação de cada um dos 35 produtos → popular `produtos.ts`. Onde a extração não vier
  100%, completar a partir dos screenshots/descrição.

---

## 11. Referências (dentro do repo)
- `docs/reference/screenshots/` — home, loja, produto (simples + complexo), sobre, contato, mobile
- `docs/reference/data/searchindex.json` — índice do Framer (títulos, breadcrumbs/categorias)
- `docs/reference/data/render-report.json` — DOM renderizado (estrutura + atributos reais)
- Modelo ao vivo: https://enlivened-pomegranate-317762-1e9fffd39.framer.app/
