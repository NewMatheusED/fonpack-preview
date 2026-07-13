# FonPack Embalagens — Vitrine

Vitrine estática (SPA) da FonPack Embalagens: catálogo de produtos com atributos
selecionáveis (medidas, cores, opções) e carrinho de orçamento que finaliza a
conversa direto no WhatsApp da empresa. Não há preços em nenhum lugar da UI —
todo pedido é tratado como orçamento sob consulta.

Não existe backend: é um site 100% estático, feito para ser hospedado como
arquivos puros (HTML/CSS/JS) em qualquer servidor, incluindo a HostGator.

## Stack

- [Vite](https://vite.dev/) + [React 19](https://react.dev/) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com/) (CSS-first, tokens em `src/styles/tokens.css`)
- [shadcn/ui](https://ui.shadcn.com/) (Radix/base-ui) para componentes de UI
- [Zustand](https://zustand-demo.pmnd.rs/) para o estado do carrinho (persistido em `localStorage`)
- [react-router-dom](https://reactrouter.com/) para as rotas
- [fuse.js](https://www.fusejs.io/) para busca fuzzy no catálogo
- [react-helmet-async](https://github.com/staylor/react-helmet-async) para SEO por página
- [Vitest](https://vitest.dev/) + Testing Library para os testes

## Scripts

```bash
npm run dev       # sobe o servidor de desenvolvimento (Vite)
npm run build     # checa tipos (tsc -b) e gera o build de produção em dist/
npm run preview   # serve o conteúdo de dist/ localmente, para conferir o build
npm run test      # roda a suíte de testes (Vitest) uma vez
npm run test:watch  # roda os testes em modo watch
npm run lint      # roda o oxlint
```

## Estrutura do projeto

Arquitetura organizada por feature, cada uma com seus próprios componentes,
hooks, store e tipos:

```
src/
  components/
    layout/       → Header, Footer, Layout, DiferenciaisBand, WhatsAppFloat
    seo/           → <Seo/>, componente reutilizável de metatags por página
    ui/            → componentes shadcn/ui (button, sheet, tabs, switch, input...)
  features/
    catalog/       → typings, dados (categorias + 35 produtos), hooks de busca/filtro,
                      componentes de listagem (ProductCard, ProductGrid, CategoryTabs, SearchBar)
    product/       → seleção de variações (stepper, opções, swatch, toggle, texto),
                      galeria de imagens, descrição, navegação prev/next
    cart/          → store do carrinho (Zustand persistido) + botão/sheet/itens
    company/       → seções institucionais (Hero, InstitutionalSplit, PillarsBand, MissionVisionValues)
    contact/       → cards de contato (WhatsApp, e-mail, telefone)
  lib/
    company.ts     → dados fixos da empresa (WhatsApp, e-mail, endereço)
    whatsapp.ts    → monta a mensagem e a URL wa.me do orçamento
    utils.ts       → cn() (clsx + tailwind-merge)
  pages/           → HomePage, LojaPage, ProdutoPage, SobrePage, ContatoPage
  styles/
    tokens.css     → tokens de cor da marca (--color-brand-*) e fontes
public/
  produtos/<slug>/ → imagens dos produtos (.webp)
  .htaccess        → fallback de rotas SPA + cache para o Apache da HostGator
```

## Como adicionar um novo produto

1. Adicione um objeto no array `produtos` em
   `src/features/catalog/data/produtos.ts`, seguindo o tipo `Produto`
   (`src/features/catalog/typings.ts`): `slug`, `nome`, `categoriaId`
   (deve bater com um `id` de `src/features/catalog/data/categorias.ts`),
   `badge`, `imagens`, `descricao` e `variacoes`.
2. Crie a pasta `public/produtos/<slug>/` e coloque as imagens do produto
   nela, nomeadas `0.webp`, `1.webp`, etc. (o campo `imagens` do produto deve
   apontar para `/produtos/<slug>/0.webp` e assim por diante).
3. Se o produto tiver várias etapas de escolha (ex.: tamanho → cor), preencha
   `stepper` com os rótulos de cada etapa, na mesma ordem de `variacoes`.
4. Se o produto for um dos destaques da home, marque `destaque: true`.
5. Rode `npm run dev` e confira o produto em `/catalogo/<slug>`.

Nenhum preço deve ser exibido em nenhum campo — o fluxo é sempre orçamento via
WhatsApp.

## Deploy na HostGator

1. Gere o build de produção:

   ```bash
   npm run build
   ```

   Isso cria a pasta `dist/` com todos os arquivos estáticos prontos,
   incluindo o `.htaccess` (copiado de `public/.htaccess`).

2. Suba o **conteúdo** da pasta `dist/` — e não a pasta `dist` em si — para
   `public_html` (ou para a subpasta desejada) via cPanel File Manager ou FTP.
   O arquivo `.htaccess` precisa ir junto (ele costuma ficar oculto; habilite
   "mostrar arquivos ocultos" no File Manager antes de subir/conferir).

3. O `.htaccess` já cuida do fallback de rotas da SPA (qualquer URL que não
   seja um arquivo/pasta existente cai em `index.html`, para o React Router
   assumir) e de cache/gzip para os arquivos estáticos.

### Se o site ficar em uma subpasta

Se a vitrine não vai morar na raiz do domínio (ex.:
`seudominio.com/vitrine/` em vez de `seudominio.com/`), duas coisas precisam
mudar antes do build:

1. Em `vite.config.ts`, adicione `base: '/vitrine/'` (troque pelo nome real
   da subpasta) na configuração do `defineConfig`.
2. Em `public/.htaccess`, troque `RewriteBase /` por `RewriteBase /vitrine/`.

Depois disso, rode `npm run build` novamente e suba o conteúdo de `dist/`
para a subpasta correspondente.
