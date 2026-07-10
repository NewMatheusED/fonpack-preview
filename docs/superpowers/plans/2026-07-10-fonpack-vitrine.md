# Vitrine FonPack — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir a vitrine estática da FonPack Embalagens — catálogo de 35 produtos com atributos selecionáveis e carrinho de orçamento que finaliza no WhatsApp — clone limpo do modelo Framer, pronta para deploy no HostGator.

**Architecture:** SPA React estática (sem backend). Arquitetura por feature no padrão Beergam (`features/<nome>/{components,hooks,store,typings}`). Produtos em arquivo de dados TS. Estado do carrinho em Zustand persistido. Cores como CSS custom properties semânticas mapeadas no Tailwind. Build estático servido pelo Apache do HostGator com `.htaccess` de fallback SPA.

**Tech Stack:** Vite, React 19, TypeScript, Tailwind CSS, shadcn/ui (Radix), Zustand, fuse.js, react-router-dom, Vitest + @testing-library/react, @fontsource (Amiri/Alata/Italianno).

## Global Constraints

- **Sempre instalar a ÚLTIMA versão** de cada dependência (`npm install <pkg>@latest` ou deixar o npm resolver); **nunca chutar número de versão** no `package.json`. Após instalar, conferir a versão real resolvida.
- **SPA 100% estática** — sem Node/backend/DB no servidor; tudo builda para `dist/`.
- **Nunca exibir preço** em nenhum lugar da UI.
- **Slugs de rota sem acento** (ex.: `/catalogo/corte-vinco`, `/sobre-nos`, `/fale-conosco`).
- **WhatsApp da empresa:** `5511942508424` (exibido como `(11) 94250-8424`).
- **E-mail:** `fonpack@hotmail.com` · **Endereço:** R. Sesefredo Klein Doll, 900 - Cipó, Embu-Guaçu - SP, 06933-080.
- **Cores** só via tokens `--color-brand-*` (ver Task 3); proibido hex solto nos componentes.
- **Copy em pt-BR.** Corrigir erros do modelo: "Fita Acrilica" → "Fita Acrílica"; "Os pilares que guia" → "que guiam".
- **Arquitetura por feature**; arquivos focados e pequenos (uma responsabilidade cada).
- Cada task termina com **commit**. Mensagens de commit em pt-BR, prefixo convencional (`feat:`, `chore:`, `test:`, `docs:`).

---

## Mapa de arquivos (o que cada um faz)

```
package.json, vite.config.ts, tsconfig*.json, tailwind.config.ts, postcss.config.js  → build/config
index.html                          → shell da SPA (title/meta base)
public/.htaccess                    → fallback SPA para Apache/HostGator
public/produtos/<slug>/*.webp       → imagens dos produtos (baixadas do Framer)
src/main.tsx                        → bootstrap React + Router + providers
src/App.tsx                         → definição de rotas
src/styles/tokens.css               → CSS vars da marca + fontes
src/index.css                       → tailwind base + import tokens
src/lib/company.ts                  → dados fixos da empresa
src/lib/whatsapp.ts                 → monta mensagem + URL wa.me
src/lib/utils.ts                    → cn() (clsx+tailwind-merge)
src/components/ui/*                  → shadcn (button, sheet, tabs, switch, input, sonner...)
src/components/layout/Header.tsx     → topo + nav + CartButton
src/components/layout/Footer.tsx     → rodapé + monograma F + WhatsApp
src/components/layout/Layout.tsx     → Header + <Outlet/> + Footer
src/components/layout/DiferenciaisBand.tsx → faixa dos 4 diferenciais (variante verde|creme)
src/features/catalog/typings.ts      → Categoria, Produto, VariationGroup, VariationOption
src/features/catalog/data/categorias.ts → as 5 categorias
src/features/catalog/data/produtos.ts   → os 35 produtos (gerado por extração + revisão)
src/features/catalog/data/index.ts      → getProdutos, getProdutoBySlug, getVizinhos
src/features/catalog/hooks.ts        → useCategoryFilter, useProductSearch (fuse)
src/features/catalog/components/CategoryTabs.tsx
src/features/catalog/components/SearchBar.tsx
src/features/catalog/components/ProductCard.tsx
src/features/catalog/components/ProductGrid.tsx
src/features/product/components/VariationStepper.tsx  → orquestra grupos + stepper
src/features/product/components/OptionRow.tsx         → tipo 'opcoes'
src/features/product/components/ColorSwatch.tsx       → tipo 'swatch'
src/features/product/components/ToggleField.tsx       → tipo 'toggle'
src/features/product/components/TextField.tsx         → tipo 'texto'
src/features/product/components/ProductGallery.tsx
src/features/product/components/DescriptionList.tsx
src/features/product/components/PrevNextNav.tsx
src/features/product/hooks.ts        → useVariationSelection
src/features/cart/store.ts           → Zustand persistido (itens do orçamento)
src/features/cart/typings.ts
src/features/cart/components/CartButton.tsx
src/features/cart/components/CartSheet.tsx
src/features/cart/components/CartItem.tsx
src/features/company/components/{Hero,InstitutionalSplit,MissionVisionValues,PillarsBand}.tsx
src/features/contact/components/ContactCards.tsx
src/pages/{HomePage,LojaPage,ProdutoPage,SobrePage,ContatoPage}.tsx
scripts/extract-framer.mjs           → extrai atributos + baixa imagens do modelo
```

---

## Fase 0 — Scaffold & tooling

### Task 1: Scaffold Vite + React + TS + Vitest

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.node.json`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/index.css`, `src/vite-env.d.ts`
- Create: `src/test/setup.ts`

**Interfaces:**
- Produces: app Vite executável (`npm run dev`), runner de testes (`npm run test`).

- [ ] **Step 1: Scaffold em pasta temporária e mesclar** (evita prompt interativo por a pasta já ter `docs/` e `.git`)

```bash
cd "C:/Users/Pegazus/Documents/projetos"
npm create vite@latest fonpack-tmp -- --template react-ts
# copia tudo do template para o projeto, exceto o .git do template
cp -r fonpack-tmp/. fonpack-vitrine/
rm -rf fonpack-tmp fonpack-vitrine/.git-tmp 2>/dev/null
cd fonpack-vitrine
```

- [ ] **Step 2: Instalar deps base (últimas versões)**

```bash
npm install
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitest/coverage-v8
```

- [ ] **Step 3: Configurar Vitest** — editar `vite.config.ts`:

```ts
/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
})
```

- [ ] **Step 4: Setup de testes** — `src/test/setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 5: Alias `@` no tsconfig** — adicionar em `tsconfig.json` `compilerOptions`:

```json
"baseUrl": ".",
"paths": { "@/*": ["./src/*"] }
```

- [ ] **Step 6: Scripts no `package.json`**

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "test": "vitest run",
  "test:watch": "vitest"
}
```

- [ ] **Step 7: Teste de fumaça** — `src/test/smoke.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
describe('setup', () => { it('roda', () => { expect(1 + 1).toBe(2) }) })
```

- [ ] **Step 8: Rodar** — `npm run test` → Expected: 1 passed. `npm run dev` sobe sem erro.
- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "chore: scaffold Vite+React+TS com Vitest"
```

### Task 2: Tailwind + shadcn/ui

**Files:**
- Create/Modify: `tailwind.config.ts`, `postcss.config.js`, `src/index.css`, `components.json`, `src/lib/utils.ts`, `src/components/ui/*`

**Interfaces:**
- Produces: `cn()` de `@/lib/utils`; componentes shadcn instalados (`button`, `sheet`, `tabs`, `switch`, `input`, `sonner`).

- [ ] **Step 1: Instalar Tailwind (última) + peers**

```bash
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer
npm install clsx tailwind-merge class-variance-authority lucide-react
```

- [ ] **Step 2: `postcss.config.js`**

```js
export default { plugins: { '@tailwindcss/postcss': {}, autoprefixer: {} } }
```

- [ ] **Step 3: `src/index.css`** (topo)

```css
@import 'tailwindcss';
@import './styles/tokens.css';
```

- [ ] **Step 4: `src/lib/utils.ts`**

```ts
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)) }
```

- [ ] **Step 5: Inicializar shadcn e adicionar componentes** (usa última CLI)

```bash
npx shadcn@latest init -d
npx shadcn@latest add button sheet tabs switch input sonner
```

- [ ] **Step 6: Verificar** — `npm run build` compila sem erro de tipos.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "chore: configurar Tailwind + shadcn/ui"`

### Task 3: Design tokens (cores da marca) + fontes

**Files:**
- Create: `src/styles/tokens.css`
- Modify: `tailwind.config.ts`

**Interfaces:**
- Produces: classes Tailwind `bg-primary`, `text-brand`, `bg-surface`, `text-muted`, `bg-accent` etc., resolvidas via CSS vars; fontes `font-serif` (Amiri), `font-sans` (Alata), `font-script` (Italianno).

- [ ] **Step 1: Instalar fontes self-hosted**

```bash
npm install @fontsource/amiri @fontsource/alata @fontsource/italianno
```

- [ ] **Step 2: `src/styles/tokens.css`**

```css
@import '@fontsource/amiri/400.css';
@import '@fontsource/amiri/700.css';
@import '@fontsource/alata/400.css';
@import '@fontsource/italianno/400.css';

:root {
  --color-brand-primary: #3c5e3d;
  --color-brand-primary-2: #567644;
  --color-brand-green-soft: #bdd8b7;
  --color-brand-surface: #f5f1e6;
  --color-brand-surface-2: #fcfbf5;
  --color-brand-accent: #dac195;
  --color-brand-accent-2: #a57547;
  --color-brand-text: #2b2b2b;
  --color-brand-muted: #858585;
  --color-brand-white: #ffffff;

  --font-serif: 'Amiri', Georgia, serif;
  --font-sans: 'Alata', system-ui, sans-serif;
  --font-script: 'Italianno', cursive;
}
```

- [ ] **Step 3: Mapear no `tailwind.config.ts`** (`theme.extend`)

```ts
colors: {
  brand: {
    DEFAULT: 'var(--color-brand-text)',
    primary: 'var(--color-brand-primary)',
    'primary-2': 'var(--color-brand-primary-2)',
    'green-soft': 'var(--color-brand-green-soft)',
    surface: 'var(--color-brand-surface)',
    'surface-2': 'var(--color-brand-surface-2)',
    accent: 'var(--color-brand-accent)',
    'accent-2': 'var(--color-brand-accent-2)',
    muted: 'var(--color-brand-muted)',
  },
},
fontFamily: {
  serif: 'var(--font-serif)',
  sans: 'var(--font-sans)',
  script: 'var(--font-script)',
},
```

- [ ] **Step 4: Aplicar base** — em `src/index.css`, após imports:

```css
body { @apply bg-brand-surface text-brand font-sans; }
```

- [ ] **Step 5: Verificar** — criar um `<h1 className="font-serif text-brand-primary">` temporário na App e `npm run dev`; confirmar verde + serifada. Remover depois.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: tokens de cor da marca + fontes Amiri/Alata/Italianno"`

---

## Fase 1 — Modelo de dados & extração de conteúdo

### Task 4: Typings do catálogo

**Files:**
- Create: `src/features/catalog/typings.ts`, `src/features/cart/typings.ts`

**Interfaces:**
- Produces: tipos `Categoria`, `VariationOption`, `VariationGroup`, `Produto`, `CartItem`.

- [ ] **Step 1: `src/features/catalog/typings.ts`**

```ts
export type Categoria = { id: string; nome: string; slugPlural: string; ordem: number }

export type VariationOption = { label: string; sublabel?: string; value: string }

export type VariationGroup =
  | { titulo: string; tipo: 'opcoes'; instrucao?: string; opcoes: VariationOption[] }
  | { titulo: string; tipo: 'swatch'; instrucao?: string; opcoes: { label: string; cor: string }[] }
  | { titulo: string; tipo: 'toggle'; instrucao?: string; label: string; ajuda?: string }
  | { titulo: string; tipo: 'texto'; instrucao?: string; placeholder: string }

export type Produto = {
  slug: string
  nome: string
  categoriaId: string
  badge: string
  imagens: string[]
  descricao: string[]
  destaque?: boolean
  stepper?: string[]
  variacoes: VariationGroup[]
}
```

- [ ] **Step 2: `src/features/cart/typings.ts`**

```ts
export type CartItem = {
  id: string          // slug + hash da variação
  produtoSlug: string
  nome: string
  variacaoResumo: string   // "Onda: B | Cor: Pardo"
  quantidade: number
}
```

- [ ] **Step 3: Verificar tipos** — `npm run build` compila.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: typings do catálogo e do carrinho"`

### Task 5: Categorias + helpers de dados

**Files:**
- Create: `src/features/catalog/data/categorias.ts`, `src/features/catalog/data/index.ts`
- Test: `src/features/catalog/data/data.test.ts`

**Interfaces:**
- Consumes: `Categoria`, `Produto` (Task 4).
- Produces: `categorias`, `getProdutos()`, `getProdutoBySlug(slug)`, `getVizinhos(slug) => {anterior?, proximo?}`.

- [ ] **Step 1: Teste falho** — `src/features/catalog/data/data.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { categorias } from './categorias'
import { getProdutoBySlug, getVizinhos } from './index'

describe('dados do catálogo', () => {
  it('tem 5 categorias na ordem da loja', () => {
    expect(categorias.map(c => c.slugPlural)).toEqual(
      ['cantoneiras', 'bobinas', 'acessorios', 'caixas', 'fitas'],
    )
  })
  it('acha produto por slug', () => {
    expect(getProdutoBySlug('corte-vinco')?.nome).toBe('Caixa Corte vinco')
  })
  it('retorna vizinhos para prev/next', () => {
    const v = getVizinhos('corte-vinco')
    expect(v.anterior).toBeDefined()
    expect(v.proximo).toBeDefined()
  })
})
```

- [ ] **Step 2: Rodar** — `npm run test -- data.test` → FAIL (módulos inexistentes).
- [ ] **Step 3: `categorias.ts`**

```ts
import type { Categoria } from '../typings'
export const categorias: Categoria[] = [
  { id: 'cantoneira', nome: 'Cantoneiras', slugPlural: 'cantoneiras', ordem: 1 },
  { id: 'bobina',     nome: 'Bobinas',     slugPlural: 'bobinas',     ordem: 2 },
  { id: 'acessorio',  nome: 'Acessórios',  slugPlural: 'acessorios',  ordem: 3 },
  { id: 'caixa',      nome: 'Caixas',      slugPlural: 'caixas',      ordem: 4 },
  { id: 'fita',       nome: 'Fitas',       slugPlural: 'fitas',       ordem: 5 },
]
```

- [ ] **Step 4: `index.ts`** (usa `produtos` da Task 6; criar arquivo `produtos.ts` mínimo com `[]` agora, populado na Task 6)

```ts
import type { Produto } from '../typings'
import { produtos } from './produtos'

export function getProdutos(): Produto[] { return produtos }
export function getProdutoBySlug(slug: string): Produto | undefined {
  return produtos.find(p => p.slug === slug)
}
export function getVizinhos(slug: string): { anterior?: Produto; proximo?: Produto } {
  const i = produtos.findIndex(p => p.slug === slug)
  if (i === -1) return {}
  return { anterior: produtos[i - 1], proximo: produtos[i + 1] }
}
```

- [ ] **Step 5:** criar placeholder `src/features/catalog/data/produtos.ts`:

```ts
import type { Produto } from '../typings'
export const produtos: Produto[] = [
  // populado na Task 6 (extração). Provisório para compilar:
  { slug: 'corte-vinco', nome: 'Caixa Corte vinco', categoriaId: 'caixa', badge: 'Suas medidas', imagens: [], descricao: [], variacoes: [] },
  { slug: 'plastico-bolha', nome: 'Bobina Plástico bolha', categoriaId: 'bobina', badge: 'Consultar medidas', imagens: [], descricao: [], variacoes: [] },
]
```

- [ ] **Step 6: Rodar** — `npm run test -- data.test` → PASS.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: categorias e helpers de dados do catálogo"`

### Task 6: Extração de produtos + imagens do Framer

**Files:**
- Create: `scripts/extract-framer.mjs`
- Overwrite (gerado): `src/features/catalog/data/produtos.ts`
- Create: `public/produtos/<slug>/*.webp`

**Interfaces:**
- Consumes: `Produto` shape (Task 4).
- Produces: array `produtos` com os 35 itens (nome, categoriaId, badge, descricao, variacoes, imagens locais).

- [ ] **Step 1: Instalar ferramentas do script**

```bash
npm install -D puppeteer-core sharp
```

- [ ] **Step 2: `scripts/extract-framer.mjs`** — para cada slug (lista dos 35, ver `docs/reference/data/searchindex.json`): render headless, ler o bloco "VARIAÇÃO", mapear grupos por heurística (linhas com `+` → `opcoes` com `label`+`sublabel`; swatches → `swatch`; toggle → `toggle`; input → `texto`), capturar `badge` (subtítulo do card na `/loja`), `descricao` (bullets da "Descrição Básica"), baixar imagens do produto e converter p/ `.webp` com `sharp` em `public/produtos/<slug>/`. Emitir `produtos.ts`.

```js
// Estrutura (resumo executável — completar seletores conforme render-report.json):
import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import fs from 'node:fs'
import path from 'node:path'

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const BASE = 'https://enlivened-pomegranate-317762-1e9fffd39.framer.app'
const idx = JSON.parse(fs.readFileSync('docs/reference/data/searchindex.json', 'utf-8'))
const rotas = Object.keys(idx).filter(u => u.startsWith('/catalogo/'))
const CAT = { /* mapa nome→categoriaId a partir do breadcrumb h6[2] */ }

const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox'] })
const out = []
for (const rota of rotas) {
  const slug = decodeURIComponent(rota.replace('/catalogo/', ''))
    .normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/["']/g, '').replace(/\s+/g, '-').toLowerCase()
  const page = await browser.newPage()
  await page.goto(BASE + encodeURI(rota), { waitUntil: 'networkidle2', timeout: 60000 })
  await new Promise(r => setTimeout(r, 2500))
  const dados = await page.evaluate(() => {
    // extrai nome(h1), descricao(bullets), grupos de variação, urls de imagem
    // ... (implementar com base em render-report.json)
    return { nome: '', descricao: [], variacoes: [], imagens: [] }
  })
  // baixar+converter imagens
  const dir = `public/produtos/${slug}`; fs.mkdirSync(dir, { recursive: true })
  const locais = []
  for (const [i, url] of dados.imagens.entries()) {
    const buf = Buffer.from(await (await fetch(url)).arrayBuffer())
    const dest = `${dir}/${i}.webp`
    await sharp(buf).webp({ quality: 82 }).toFile(dest)
    locais.push(`/produtos/${slug}/${i}.webp`)
  }
  out.push({ slug, nome: dados.nome, categoriaId: CAT[slug] ?? '', badge: '', imagens: locais, descricao: dados.descricao, variacoes: dados.variacoes })
  await page.close()
}
await browser.close()
fs.writeFileSync('src/features/catalog/data/produtos.ts',
  `import type { Produto } from '../typings'\nexport const produtos: Produto[] = ${JSON.stringify(out, null, 2)}\n`)
console.log(`Gerados ${out.length} produtos`)
```

- [ ] **Step 3: Rodar extração** — `node scripts/extract-framer.mjs` → Expected: "Gerados 35 produtos"; pasta `public/produtos/` populada.
- [ ] **Step 4: Revisão manual** — abrir `produtos.ts`, conferir contra os screenshots em `docs/reference/screenshots/`; preencher `badge` e `destaque: true` nos 5 da home (Fita Acrílica, Bobina Plástico bolha, Caixa Corte vinco, Caixa Maleta 30, Divisória); ajustar `stepper` nos multi-grupo; corrigir acentos/typos. Onde a heurística falhar, completar à mão pelos screenshots.
- [ ] **Step 5: Ajustar teste** — atualizar `data.test.ts` para `expect(getProdutos()).toHaveLength(35)`; rodar `npm run test -- data.test` → PASS.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: extrair 35 produtos e imagens do modelo Framer"`

---

## Fase 2 — Lógica de negócio (TDD)

### Task 7: Store do carrinho (Zustand persistido)

**Files:**
- Create: `src/features/cart/store.ts`
- Test: `src/features/cart/store.test.ts`

**Interfaces:**
- Consumes: `CartItem` (Task 4).
- Produces: `useCart` com `{ itens, add(item), remove(id), setQtd(id, n), clear(), totalItens() }`.

- [ ] **Step 1: Instalar Zustand** — `npm install zustand`
- [ ] **Step 2: Teste falho** — `src/features/cart/store.test.ts`:

```ts
import { describe, it, expect, beforeEach } from 'vitest'
import { useCart } from './store'

const item = { id: 'corte-vinco#b-pardo', produtoSlug: 'corte-vinco', nome: 'Caixa Corte vinco', variacaoResumo: 'Onda: B | Cor: Pardo', quantidade: 1 }

describe('useCart', () => {
  beforeEach(() => useCart.getState().clear())
  it('adiciona item novo', () => {
    useCart.getState().add(item)
    expect(useCart.getState().itens).toHaveLength(1)
  })
  it('mesma variação incrementa quantidade em vez de duplicar', () => {
    useCart.getState().add(item)
    useCart.getState().add(item)
    expect(useCart.getState().itens).toHaveLength(1)
    expect(useCart.getState().itens[0].quantidade).toBe(2)
  })
  it('remove e conta total', () => {
    useCart.getState().add(item)
    useCart.getState().add({ ...item, id: 'x', quantidade: 3 })
    expect(useCart.getState().totalItens()).toBe(4)
    useCart.getState().remove('x')
    expect(useCart.getState().totalItens()).toBe(1)
  })
})
```

- [ ] **Step 3: Rodar** — `npm run test -- store.test` → FAIL.
- [ ] **Step 4: `store.ts`**

```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from './typings'

type CartState = {
  itens: CartItem[]
  add: (item: CartItem) => void
  remove: (id: string) => void
  setQtd: (id: string, n: number) => void
  clear: () => void
  totalItens: () => number
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      itens: [],
      add: (item) => set((s) => {
        const ex = s.itens.find((i) => i.id === item.id)
        if (ex) return { itens: s.itens.map((i) => i.id === item.id ? { ...i, quantidade: i.quantidade + item.quantidade } : i) }
        return { itens: [...s.itens, item] }
      }),
      remove: (id) => set((s) => ({ itens: s.itens.filter((i) => i.id !== id) })),
      setQtd: (id, n) => set((s) => ({ itens: s.itens.map((i) => i.id === id ? { ...i, quantidade: Math.max(1, n) } : i) })),
      clear: () => set({ itens: [] }),
      totalItens: () => get().itens.reduce((acc, i) => acc + i.quantidade, 0),
    }),
    { name: 'fonpack-orcamento' },
  ),
)
```

- [ ] **Step 5: Rodar** — `npm run test -- store.test` → PASS.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: store do carrinho de orçamento (zustand persistido)"`

### Task 8: Gerador de mensagem WhatsApp

**Files:**
- Create: `src/lib/company.ts`, `src/lib/whatsapp.ts`
- Test: `src/lib/whatsapp.test.ts`

**Interfaces:**
- Consumes: `CartItem` (Task 4).
- Produces: `company` (const); `buildOrcamentoUrl(itens: CartItem[]): string`; `buildItemUrl(nome: string, resumo: string): string`.

- [ ] **Step 1: Teste falho** — `src/lib/whatsapp.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { buildOrcamentoUrl, buildItemUrl } from './whatsapp'

describe('whatsapp', () => {
  it('gera url wa.me com o número da empresa', () => {
    const url = buildItemUrl('Caixa Corte vinco', 'Onda: B')
    expect(url.startsWith('https://wa.me/5511942508424?text=')).toBe(true)
  })
  it('inclui todos os itens do orçamento', () => {
    const url = buildOrcamentoUrl([
      { id: '1', produtoSlug: 'a', nome: 'Caixa Corte vinco', variacaoResumo: 'Onda: B', quantidade: 2 },
      { id: '2', produtoSlug: 'b', nome: 'Bobina Kraft', variacaoResumo: 'Tamanho: 60cm', quantidade: 1 },
    ])
    const txt = decodeURIComponent(url.split('text=')[1])
    expect(txt).toContain('Caixa Corte vinco')
    expect(txt).toContain('Onda: B')
    expect(txt).toContain('Qtd: 2')
    expect(txt).toContain('Bobina Kraft')
  })
})
```

- [ ] **Step 2: Rodar** — `npm run test -- whatsapp.test` → FAIL.
- [ ] **Step 3: `src/lib/company.ts`**

```ts
export const company = {
  nome: 'FonPack Embalagens',
  whatsapp: '5511942508424',
  whatsappLabel: '(11) 94250-8424',
  email: 'fonpack@hotmail.com',
  endereco: 'R. Sesefredo Klein Doll, 900 - Cipó, Embu-Guaçu - SP, 06933-080',
}
```

- [ ] **Step 4: `src/lib/whatsapp.ts`**

```ts
import type { CartItem } from '@/features/cart/typings'
import { company } from './company'

const base = `https://wa.me/${company.whatsapp}?text=`

export function buildItemUrl(nome: string, resumo: string): string {
  const txt = `Olá! Gostaria de um orçamento:\n\n• ${nome}${resumo ? ` — ${resumo}` : ''}\n\nEnviado pela vitrine FonPack.`
  return base + encodeURIComponent(txt)
}

export function buildOrcamentoUrl(itens: CartItem[]): string {
  const linhas = itens.map(i => `• ${i.nome}${i.variacaoResumo ? ` — ${i.variacaoResumo}` : ''} — Qtd: ${i.quantidade}`)
  const txt = `Olá! Gostaria de um orçamento:\n\n${linhas.join('\n')}\n\nEnviado pela vitrine FonPack.`
  return base + encodeURIComponent(txt)
}
```

- [ ] **Step 5: Rodar** — `npm run test -- whatsapp.test` → PASS.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: gerador de mensagem de orçamento p/ WhatsApp"`

### Task 9: Hooks de filtro e busca do catálogo

**Files:**
- Create: `src/features/catalog/hooks.ts`
- Test: `src/features/catalog/hooks.test.ts`

**Interfaces:**
- Consumes: `getProdutos()` (Task 5), `fuse.js`.
- Produces: `filtrarPorCategoria(produtos, catId | 'tudo')`; `useProductSearch(termo)` retornando produtos filtrados por busca fuzzy sobre `nome`.

- [ ] **Step 1: Instalar fuse** — `npm install fuse.js`
- [ ] **Step 2: Teste falho** — `src/features/catalog/hooks.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { filtrarPorCategoria, buscarProdutos } from './hooks'
import { getProdutos } from './data'

import { getProdutos } from './data'  // resolve para ./data/index.ts (pasta)

describe('catálogo', () => {
  it("'tudo' retorna todos", () => {
    expect(filtrarPorCategoria(getProdutos(), 'tudo')).toHaveLength(getProdutos().length)
  })
  it('filtra por categoria', () => {
    const caixas = filtrarPorCategoria(getProdutos(), 'caixa')
    expect(caixas.every(p => p.categoriaId === 'caixa')).toBe(true)
  })
  it('busca fuzzy acha por nome parcial', () => {
    const r = buscarProdutos(getProdutos(), 'corte')
    expect(r.some(p => p.slug === 'corte-vinco')).toBe(true)
  })
})
```

> Nota de resolução: `import ... from './data'` resolve para `src/features/catalog/data/index.ts` (a pasta com `index.ts` da Task 5). **NÃO** criar um arquivo `data.ts` irmão — isso colidiria com a pasta `data/` e tornaria o import ambíguo. Basta a pasta com `index.ts`.

- [ ] **Step 3: Rodar** — FAIL (arquivo `hooks.ts` inexistente). Nenhum barrel extra é necessário: `./data` já resolve para `./data/index.ts`.
- [ ] **Step 4: `hooks.ts`**

```ts
import Fuse from 'fuse.js'
import type { Produto } from './typings'

export function filtrarPorCategoria(produtos: Produto[], catId: string): Produto[] {
  if (catId === 'tudo') return produtos
  return produtos.filter(p => p.categoriaId === catId)
}

export function buscarProdutos(produtos: Produto[], termo: string): Produto[] {
  if (!termo.trim()) return produtos
  const fuse = new Fuse(produtos, { keys: ['nome'], threshold: 0.4 })
  return fuse.search(termo).map(r => r.item)
}
```

- [ ] **Step 5: Rodar** — `npm run test -- hooks.test` → PASS.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: filtro por categoria + busca fuzzy do catálogo"`

---

## Fase 3 — Layout, rotas e componentes compartilhados

### Task 10: Roteamento + Layout base

**Files:**
- Create: `src/App.tsx` (sobrescreve), `src/main.tsx` (ajusta), `src/components/layout/Layout.tsx`, `src/pages/*` (stubs)

**Interfaces:**
- Consumes: react-router-dom.
- Produces: rotas `/`, `/loja`, `/catalogo/:slug`, `/sobre-nos`, `/fale-conosco` renderizando dentro do `Layout`.

- [ ] **Step 1: Instalar router** — `npm install react-router-dom`
- [ ] **Step 2: Stubs de página** — criar `src/pages/HomePage.tsx`, `LojaPage.tsx`, `ProdutoPage.tsx`, `SobrePage.tsx`, `ContatoPage.tsx`, cada um `export default function X(){ return <div>X</div> }`.
- [ ] **Step 3: `Layout.tsx`**

```tsx
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-brand-surface">
      <Header />
      <main className="flex-1"><Outlet /></main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 4: `App.tsx`**

```tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import HomePage from './pages/HomePage'
import LojaPage from './pages/LojaPage'
import ProdutoPage from './pages/ProdutoPage'
import SobrePage from './pages/SobrePage'
import ContatoPage from './pages/ContatoPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="loja" element={<LojaPage />} />
          <Route path="catalogo/:slug" element={<ProdutoPage />} />
          <Route path="sobre-nos" element={<SobrePage />} />
          <Route path="fale-conosco" element={<ContatoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
```

> `Header`/`Footer` são criados na Task 11; para este passo, criar stubs mínimos que apenas renderizam `<header/>`/`<footer/>` e substituí-los na Task 11.

- [ ] **Step 5: Rodar** — `npm run dev`, navegar às 5 rotas manualmente; cada uma mostra o stub. `npm run build` compila.
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: roteamento SPA + layout base"`

### Task 11: Header + Footer

**Files:**
- Create: `src/components/layout/Header.tsx`, `src/components/layout/Footer.tsx`, `src/components/layout/WhatsAppFloat.tsx`
- Test: `src/components/layout/Footer.test.tsx`

**Interfaces:**
- Consumes: `company` (Task 8), `CartButton` (Task 14 — usar stub agora, integrar depois), `lucide-react`.
- Produces: `<Header/>`, `<Footer/>`.

- [ ] **Step 1: Teste falho** — `Footer.test.tsx` verifica que o rodapé mostra o WhatsApp da empresa:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Footer from './Footer'

it('mostra o whatsapp da empresa', () => {
  render(<MemoryRouter><Footer /></MemoryRouter>)
  expect(screen.getByText(/94250-8424/)).toBeInTheDocument()
})
```

- [ ] **Step 2: Rodar** — FAIL.
- [ ] **Step 3: `Footer.tsx`** — implementar rodapé creme: coluna "Fale conosco" (endereço, `company.whatsappLabel`, `company.email`), coluna "Links rápidos" (Nossa Loja, Sobre nós, Fale conosco via `<Link>`), monograma "F" `font-script text-brand-primary text-[16rem]` posicionado à direita, botão pílula WhatsApp. Usar apenas classes de token.
- [ ] **Step 4: `Header.tsx`** — topo creme: logo "FonPack / Embalagens" (à esq. mark folha-F), nav à direita (`Loja`, `Contatos`→/fale-conosco, `Sobre nós`) + `<CartButton/>` (stub por ora: ícone `ShoppingBag`); mobile: menu hambúrguer (`Sheet`).
- [ ] **Step 5: `WhatsAppFloat.tsx`** — botão flutuante fixo inferior-esquerdo linkando `buildItemUrl` vazio/loja. Renderizar no `Layout`.
- [ ] **Step 6: Substituir stubs** de Header/Footer no Layout pelos reais.
- [ ] **Step 7: Rodar** — `npm run test -- Footer.test` → PASS; `npm run dev` confere visual contra `docs/reference/screenshots/shot-home.png` (header/footer).
- [ ] **Step 8: Commit** — `git add -A && git commit -m "feat: header e footer com identidade FonPack"`

### Task 12: Faixa de diferenciais (reutilizável)

**Files:**
- Create: `src/components/layout/DiferenciaisBand.tsx`

**Interfaces:**
- Produces: `<DiferenciaisBand variant="verde" | "creme" items={...} />` (4 itens com ícone + título + texto).

- [ ] **Step 1:** implementar com prop `variant` (verde = `bg-brand-primary text-white`; creme = `bg-brand-surface-2 text-brand-primary`), `items: {icon, titulo, texto}[]`, ícones `lucide-react` (Recycle, ShieldCheck, Package, Truck). Grid 4 col desktop, empilha no mobile.
- [ ] **Step 2:** usar na home (verde) — conferir contra screenshot.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: faixa de diferenciais reutilizável"`

---

## Fase 4 — Features/páginas

### Task 13: Catálogo — CategoryTabs, SearchBar, ProductCard, ProductGrid, LojaPage

**Files:**
- Create: `src/features/catalog/components/{CategoryTabs,SearchBar,ProductCard,ProductGrid}.tsx`, `src/pages/LojaPage.tsx`
- Test: `src/features/catalog/components/ProductCard.test.tsx`

**Interfaces:**
- Consumes: `categorias`, `getProdutos`, `filtrarPorCategoria`, `buscarProdutos` (Tasks 5/9), `Tabs`/`Input` (shadcn).
- Produces: `LojaPage` funcional com abas + busca + grid.

- [ ] **Step 1: Teste falho** — `ProductCard.test.tsx`:

```tsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import ProductCard from './ProductCard'

const p = { slug: 'corte-vinco', nome: 'Caixa Corte vinco', categoriaId: 'caixa', badge: 'Suas medidas', imagens: ['/produtos/corte-vinco/0.webp'], descricao: [], variacoes: [] }

it('mostra nome, selo e link para o produto', () => {
  render(<MemoryRouter><ProductCard produto={p} /></MemoryRouter>)
  expect(screen.getByText('Caixa Corte vinco')).toBeInTheDocument()
  expect(screen.getByText('Suas medidas')).toBeInTheDocument()
  expect(screen.getByRole('link')).toHaveAttribute('href', '/catalogo/corte-vinco')
})
```

- [ ] **Step 2: Rodar** — FAIL.
- [ ] **Step 3: `ProductCard.tsx`** — `<Link to={/catalogo/${slug}}>` card creme arredondado: `<img loading="lazy">`, nome `font-serif`, badge `text-brand-muted text-sm`. Sem preço.
- [ ] **Step 4: `CategoryTabs.tsx`** (shadcn `Tabs`, valores `tudo` + `categorias`), `SearchBar.tsx` (`Input` controlado, placeholder "Buscar..."), `ProductGrid.tsx` (grid responsivo 1/2/3 col).
- [ ] **Step 5: `LojaPage.tsx`** — estado `categoria` + `termo`; aplica `filtrarPorCategoria` depois `buscarProdutos`; renderiza Tabs + SearchBar + Grid.
- [ ] **Step 6: Rodar** — `npm run test -- ProductCard` → PASS; `npm run dev` confere contra `shot-loja.png` (grid, abas, busca).
- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: página da loja (grid + categorias + busca)"`

### Task 14: Carrinho — store UI (CartButton, CartSheet, CartItem)

**Files:**
- Create: `src/features/cart/components/{CartButton,CartSheet,CartItem}.tsx`
- Test: `src/features/cart/components/CartSheet.test.tsx`

**Interfaces:**
- Consumes: `useCart` (Task 7), `buildOrcamentoUrl` (Task 8), `Sheet` (shadcn).
- Produces: `<CartButton/>` (badge com `totalItens`), `<CartSheet/>` (lista + botão finalizar).

- [ ] **Step 1: Teste falho** — `CartSheet.test.tsx`: com 1 item no `useCart`, o Sheet aberto mostra o nome e um link cujo href começa com `https://wa.me/5511942508424`.
- [ ] **Step 2: Rodar** — FAIL.
- [ ] **Step 3: `CartItem.tsx`** — nome, `variacaoResumo`, controle de quantidade (`setQtd`), botão remover (`remove`).
- [ ] **Step 4: `CartSheet.tsx`** — `Sheet` lateral (mobile: lado inferior); lista `useCart().itens`; rodapé com botão verde "Enviar orçamento pelo WhatsApp" → `buildOrcamentoUrl(itens)` (target `_blank`); vazio mostra mensagem.
- [ ] **Step 5: `CartButton.tsx`** — ícone `ShoppingBag` + badge `totalItens()`; abre o `CartSheet`. Integrar no `Header` (substituir stub da Task 11).
- [ ] **Step 6: Rodar** — `npm run test -- CartSheet` → PASS; `npm run dev` adiciona item e confere o Sheet.
- [ ] **Step 7: Commit** — `git add -A && git commit -m "feat: carrinho de orçamento (botão + sheet + itens)"`

### Task 15: Produto — grupos de variação + stepper

**Files:**
- Create: `src/features/product/components/{OptionRow,ColorSwatch,ToggleField,TextField,VariationStepper,ProductGallery,DescriptionList,PrevNextNav}.tsx`, `src/features/product/hooks.ts`
- Test: `src/features/product/components/VariationStepper.test.tsx`, `src/features/product/hooks.test.ts`

**Interfaces:**
- Consumes: `VariationGroup` (Task 4), `useCart` (Task 7), `Switch`/`Input` (shadcn).
- Produces: `useVariationSelection(variacoes)` → `{ selecao, setOpcao, setSwatch, setToggle, setTexto, resumo }`; `<VariationStepper/>`.

- [ ] **Step 1: Teste falho (hook)** — `hooks.test.ts`: dado `variacoes` com 1 grupo `swatch` (pardo/branco) + 1 `toggle`, ao `setSwatch('Pardo')` e `setToggle(true)`, `resumo` contém `"Cor: Pardo"` e `"Impressão: Sim"`.
- [ ] **Step 2: Rodar** — FAIL.
- [ ] **Step 3: `hooks.ts`** — `useVariationSelection`: mantém `Record<titulo, valor>`; `resumo` = junta `titulo: valor` com ` | `; mapeia toggle `true→'Sim'`, `false→'Não'`.
- [ ] **Step 4:** implementar componentes por tipo: `OptionRow` (linha cinza arredondada: label + sublabel + botão `+` verde que faz `useCart.add`), `ColorSwatch` (círculos), `ToggleField` (`Switch`), `TextField` (`Input`).
- [ ] **Step 5: `VariationStepper.tsx`** — se `produto.stepper?.length`, renderiza os dots do stepper; mapeia `produto.variacoes` para o componente do `tipo` correspondente; abaixo os 3 CTAs (Adicionar ao orçamento, Comprar agora (WhatsApp) → `buildItemUrl(nome, resumo)`, Falar com um especialista → `buildItemUrl(nome, '')`).
- [ ] **Step 6: Teste componente** — `VariationStepper.test.tsx`: renderiza um produto com grupo `opcoes`; clicar no `+` de uma opção chama `useCart` (item aparece). PASS.
- [ ] **Step 7: `ProductGallery`, `DescriptionList`, `PrevNextNav`** (usa `getVizinhos`).
- [ ] **Step 8: Commit** — `git add -A && git commit -m "feat: seletor de variações do produto + stepper"`

### Task 16: ProdutoPage (montagem)

**Files:**
- Create/Modify: `src/pages/ProdutoPage.tsx`

**Interfaces:**
- Consumes: `useParams`, `getProdutoBySlug`, componentes da Task 15, `DiferenciaisBand`.

- [ ] **Step 1:** `ProdutoPage` lê `:slug`; se `!produto` → redireciona `/loja`. Renderiza breadcrumb + `PrevNextNav` + card 2 colunas ([`ProductGallery` + `DescriptionList`] · [título + "Vendido e entregue por FonPack Embalagens" + `VariationStepper`]) + `DiferenciaisBand variant="creme"`.
- [ ] **Step 2: Verificar** — `npm run dev` em `/catalogo/corte-vinco` e `/catalogo/acrilica`; comparar com `shot-prod-corte-vinco.png` e mobile `shot-mobile-produto.png`.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: página de produto completa"`

### Task 17: HomePage

**Files:**
- Create: `src/features/company/components/{Hero,InstitutionalSplit}.tsx`, `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `getProdutos().filter(p => p.destaque)`, `ProductCard`, `DiferenciaisBand`.

- [ ] **Step 1: `Hero.tsx`** — título serifado verde "Protegendo o que é importante para você" + subtítulo + botão "Conheça nossos produtos" (→ `/loja`) + imagem.
- [ ] **Step 2: `InstitutionalSplit.tsx`** — painel verde com "Embalamos mais que produtos, embalamos confiança." + parágrafo + botão "Nos conheça" (→ `/sobre-nos`) · imagem.
- [ ] **Step 3: `HomePage.tsx`** — Hero → `DiferenciaisBand variant="verde"` → seção "Nossos produtos" (5 destaques + botão "Ver todos os produtos") → InstitutionalSplit → bloco "Tem alguma dúvida?" (→ /fale-conosco).
- [ ] **Step 4: Verificar** — comparar com `shot-home.png`.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "feat: home page"`

### Task 18: SobrePage + ContatoPage

**Files:**
- Create: `src/features/company/components/{PillarsBand,MissionVisionValues}.tsx`, `src/features/contact/components/ContactCards.tsx`, `src/pages/SobrePage.tsx`, `src/pages/ContatoPage.tsx`

- [ ] **Step 1: `SobrePage`** — Hero "Quem somos" + `PillarsBand` (4 pilares: Segurança, Praticidade, Eficiência, Qualidade) + bloco "Qualidade que acompanha cada envio..." + `MissionVisionValues` (3 cards; Visão em verde). Corrigir "que guia" → "que guiam". Comparar com `shot-sobre.png`.
- [ ] **Step 2: `ContatoPage`** — banner + `ContactCards` (WhatsApp → `buildItemUrl('','')`/link direto, E-mail → `mailto:${company.email}`, Telefone → `tel:`), **rebrandado em verde/tan** (não roxo/azul/vermelho). Comparar com `shot-contato.png`.
- [ ] **Step 3: Commit** — `git add -A && git commit -m "feat: páginas sobre e contato"`

---

## Fase 5 — Polish, SEO & deploy

### Task 19: SEO, favicon e meta por página

**Files:**
- Modify: `index.html`; Create: `src/components/Seo.tsx`; add `public/favicon.svg`, `public/og-image.jpg`

- [ ] **Step 1: Instalar** — `npm install react-helmet-async` (última).
- [ ] **Step 2:** `Seo.tsx` com `<Helmet>` (title, description, og:title/description/image); envolver App em `HelmetProvider` no `main.tsx`; usar `<Seo/>` em cada página com textos próprios.
- [ ] **Step 3:** favicon próprio (marca folha-F) em `public/favicon.svg`, referenciar no `index.html`; `<html lang="pt-BR">`.
- [ ] **Step 4: Commit** — `git add -A && git commit -m "feat: SEO, favicon e metatags por página"`

### Task 20: Build estático + `.htaccess` + verificação de deploy

**Files:**
- Create: `public/.htaccess`; Modify: `vite.config.ts` (se subpasta)

- [ ] **Step 1: `public/.htaccess`**

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

- [ ] **Step 2: Build** — `npm run build` → Expected: sucesso, `dist/` gerado com `.htaccess` incluído.
- [ ] **Step 3: Preview** — `npm run preview`; navegar todas as rotas + dar F5 numa rota profunda (ex.: `/catalogo/corte-vinco`) e confirmar que não quebra (fallback SPA local ok).
- [ ] **Step 4: `README.md`** — passos de deploy HostGator: subir conteúdo de `dist/` para `public_html` via File Manager/FTP; se subpasta, setar `base` no `vite.config.ts` e `RewriteBase`. Documentar `npm run build`.
- [ ] **Step 5: Commit** — `git add -A && git commit -m "chore: build estático, .htaccess e guia de deploy HostGator"`

### Task 21: Passe final de fidelidade & responsividade

- [ ] **Step 1:** rodar `npm run dev`, comparar cada página lado a lado com os screenshots em `docs/reference/screenshots/`; ajustar espaçamentos/cores/tipografia divergentes.
- [ ] **Step 2:** testar responsivo (390px e 1440px) em todas as páginas; ajustar breakpoints.
- [ ] **Step 3:** `npm run test` (tudo verde) + `npm run build` (sem erros de tipo).
- [ ] **Step 4: Commit** — `git add -A && git commit -m "polish: fidelidade visual e responsividade final"`

---

## Verificação de cobertura (spec → tasks)
- Stack/estática: Tasks 1–3, 20 · Tokens de cor/fontes: Task 3 · Arquitetura por feature: mapa + Tasks 4+
- 35 produtos/5 categorias: Tasks 5–6 · Atributos/stepper: Tasks 4, 15–16 · Sem preço: constraint + Tasks 13/15
- Carrinho→WhatsApp: Tasks 7–8, 14 · Busca/filtro: Task 9, 13
- Páginas Home/Loja/Produto/Sobre/Contato: Tasks 13, 16–18 · Header/Footer/Diferenciais: Tasks 11–12
- Melhorias (rebrand contato, typos, SEO, mobile, perf): Tasks 18, 19, 21 · Deploy HostGator/.htaccess: Task 20
- Imagens baixadas do Framer: Task 6
