# Auditoria de fidelidade — o que diverge do modelo Framer

Fonte da verdade: `docs/reference/audit/shots/*.png` (modelo, desktop + mobile) e
`docs/reference/audit/dom/*.txt` (texto real de cada página).
Comparativo do que EU construí: `docs/reference/audit/meu/*.png`.

**Regra:** a base tem que ficar **basicamente idêntica ao Framer**. Só melhorar o que
tem margem (transições/animações e loading já estão melhores que o modelo — MANTER).
Não redesenhar, não "dar um toque pessoal".

---

## Rotas do modelo (sitemap oficial)

| Rota do modelo | Rota nossa | Status |
|---|---|---|
| `/` | `/` | existe, com divergências |
| `/loja` | `/loja` | existe |
| `/catalogo/<slug>` | `/catalogo/<slug>` | existe |
| `/sobre-nós` | `/sobre-nos` | existe |
| `/fale-conosco` | `/fale-conosco` | existe |
| `/orcamento` | — | **FALTA — o carrinho é uma PÁGINA, não um sheet** |
| `/guia/como-tirar-medidas` | — | **FALTA** |
| `/guia/qual-onda-escolher` | — | **FALTA** |
| `/guia/plástico-bolha-divisórias-ou-papel-kraft` | — | **FALTA** |
| `/entrega` | — | página VAZIA no modelo — **ignorar, não construir** |

Slugs nossos são sem acento: `/guia/como-tirar-medidas`, `/guia/qual-onda-escolher`,
`/guia/plastico-bolha-divisorias-ou-papel-kraft`.

---

## 1. Header (`src/components/layout/Header.tsx`)

**Modelo:** três colunas.
- **Esquerda:** só o monograma FP (imagem, sem texto ao lado).
- **Centro:** wordmark — "FonPack" (sans, ~20px, verde `brand-primary`) e abaixo,
  centralizado, "Embalagens" (~9px, letter-spacing largo, verde). É o link para `/`.
- **Direita:** nav `Loja` · `Contatos` · `Sobre nós` + ícone de sacola (bag) do carrinho.

Fundo `brand-surface`, altura ~64px, sem borda pesada.

**O meu:** monograma+texto colados na esquerda, ícone genérico de folha. **Errado.**

Assets: `public/marca/monograma.webp` (logo real: F verde corrugado + P kraft).
O wordmark deve ser **texto renderizado**, não imagem.

Mobile: o modelo colapsa a nav; manter nosso Sheet/hamburger (já está bom), mas o
monograma fica à esquerda e o wordmark centralizado.

---

## 2. Hero da home (`src/features/company/components/Hero.tsx`)

**Modelo:** foto lifestyle **sangrando** (caixa de papelão + bobina kraft + chapa),
ocupando da metade pra direita e vazando até a borda; o degradê da própria foto
funde com o creme à esquerda. Texto por cima, à esquerda:
- h1 serif verde, 2 linhas: "Protegendo o que é / importante para você"
- parágrafo: "Soluções completas para proteger, armazenar e transportar seus produtos com segurança."
- botão **pill** (rounded-full) verde escuro: "Conheça nossos produtos" → `/loja`

Altura ~calc(100vh - header), a foto encosta na faixa verde embaixo.

Asset: `public/home/hero.webp`.

**O meu:** colagem de fotos de produto num card, hero baixo. **Errado.**

---

## 3. Faixa de diferenciais (`src/components/layout/DiferenciaisBand.tsx`)

**Modelo:** faixa verde `brand-primary`, 4 colunas, cada uma com **ícone outline
branco fino** à esquerda + título (branco, sans) + descrição (2-3 linhas, menor,
verde clarinho):
1. **Sustentável** — "Materiais recicláveis e compromisso com o futuro." (ícone: reciclagem)
2. **Resistência** — "Embalagens desenvolvidas para proteger o que realmente importa." (escudo com check)
3. **Personalizados** — "Soluções sob medida para o seu negócio." (caixa 3D)
4. **Entrega rápida** — "Agilidade e eficiência em todo o Brasil." (caminhão)

Usar `lucide-react` (`Recycle`, `ShieldCheck`, `Package`, `Truck`), stroke fino (~1.25).

**BUG no meu:** o botão flutuante do WhatsApp está **sobrepondo o texto** da faixa
("Sustentável / ...e compromisso" fica coberto). Ver `docs/reference/audit/meu/home.png`.
O float tem que ser `position: fixed` no canto **inferior direito**, acima de tudo
(`z-50`), nunca no fluxo.

---

## 4. Split institucional (`src/features/company/components/InstitutionalSplit.tsx`)

**Modelo:** metade esquerda verde chapado com h2 serif branco em 3 linhas
("Embalamos / mais que produtos, / embalamos confiança."), parágrafo e botão **pill
creme** "Nos conheça" → `/sobre-nos`. Metade direita: **foto real de galpão**
(estantes com paletes) sangrando, sem moldura, sem padding.

Asset: `public/home/galpao.webp`.

**O meu:** foto de produto (palete) dentro de uma moldura branca. **Errado.**

---

## 5. "Tem alguma dúvida?" — bento dos guias (home)

**Modelo:** seção creme, centralizada:
- h2 serif verde "Tem alguma dúvida?"
- subtítulo: "Tudo o que você precisa saber para receber a embalagem ideal para o seu produto."
- **bento de 3 cards** (grid 2 colunas; o da esquerda ocupa as 2 linhas):

  - **Esquerda (alto, ocupa 2 linhas):** foto (`guias/medidas-card.webp`, mão medindo
    caixa com trena) preenchendo o card; sobre ela, no canto inferior esquerdo, um
    cartão creme flutuante arredondado com ícone, título serif "Como tirar medidas?" e
    "Aprenda a medir corretamente para escolher a embalagem ideal".
    → `/guia/como-tirar-medidas`
  - **Direita topo:** card **verde**, título serif branco "Qual onda devo escolher?",
    descrição "Entenda as diferenças entre os tipos de onda e escolha a melhor proteção.",
    imagem de papelão ondulado no canto inferior direito.
    → `/guia/qual-onda-escolher`
  - **Direita baixo:** card **creme**, título serif verde "Plástico bolha, Papel kraft
    ou divisórias?", descrição "Compare os materiais e descubra qual é o mais adequado
    para o seu produto", imagens (bobina de bolha, divisória, kraft) no rodapé do card.
    → `/guia/plastico-bolha-divisorias-ou-papel-kraft`

Cards com hover sutil (lift/scale) — aqui pode caprichar, é melhoria válida.

**O meu:** só o título + um botão "Fale conosco". **Falta o bento inteiro.**

---

## 6. Carrinho: vira PÁGINA `/orcamento`

**Modelo** (`shots/orcamento-desktop.png`): página normal com header/footer.
- Breadcrumb no topo: `Home  ›  Loja  ›  Carrinho` (links verdes, chevron cinza).
- h1 "Seu Orçamento" (sans, escuro, ~30px)
- subtítulo: "Revise seu pedido e solicite seu orçamento sem compromisso."
- **Estado vazio:** card retangular `brand-surface` (largura ~60%, alt ~110px),
  centralizado dentro dele: "Seu orçamento está vazio" (bold) + "Adicione produtos na
  loja para solicitar cotação." (muted). Sem borda arredondada forte.

**Estado cheio:** o modelo NÃO renderiza (licença Framer do Commerce expirou), então
não há screenshot. Construir no mesmo estilo do card vazio: lista de itens em cards
`brand-surface`, cada item com miniatura, nome, resumo das variações, stepper de
quantidade e remover; abaixo, botão pill verde "Solicitar orçamento pelo WhatsApp"
usando `buildOrcamentoUrl` de `src/lib/whatsapp.ts`, e um link "Continuar comprando".

**Ação:** o `CartSheet` (aside) deve ser **removido**. O ícone de sacola do header
vira `<Link to="/orcamento">` com o badge de contagem. O `useCart` store fica como está.

---

## 7. Páginas de guia (3) — nova feature `src/features/guias/`

As 3 compartilham: header/footer, e uma seção final **"Confira mais"** (h2 sans
centralizado) com os **2 cards dos outros dois guias** (mesmo visual do bento da home).
Isso é um componente reaproveitado: `ConfiraMais` recebe o slug atual e renderiza os
outros dois.

### 7a. `/guia/como-tirar-medidas` (`guias/medidas-hero.webp`)
Hero split: esquerda creme com h1 serif verde "Como tirar as medidas da sua embalagem",
subtítulo verde "Aprenda a medir corretamente para encontrar a embalagem ideal" e uma
linha muted "Um guia simples para medir seu produto corretamente". Direita: foto de
caixinhas kraft em grade, sangrando.

Seção de conteúdo (fundo `brand-surface`): imagem à esquerda (`guias/medidas-caixa.webp`,
cantos arredondados), texto à direita:
- h2 serif verde "Meça da forma correta, evite erros"
- "É importante informar as medidas na ordem correta:"
- destaque em verde bold: "Comprimento × Largura × Altura (C × L × A)"
- bullets: "Comprimento: lado maior da base" / "Largura: lado menor da base" /
  "Altura: distância da base até a tampa"
- "As caixas de papelão são medidas pela parte interna, considerando o espaço útil
  disponível para acomodar o produto"
- **callout** arredondado fundo `brand-green-soft`: "Ainda não tem a caixa? Meça o
  produto e adicione uma pequena folga para acomodação e, se necessário, para materiais
  de proteção como plástico-bolha, papel kraft ou divisórias."

### 7b. `/guia/qual-onda-escolher` (`guias/onda-hero.webp`)
Hero: **foto full-bleed** (operador manuseando caixas), sem texto por cima.
Depois, centralizado: h1 serif verde "Qual onda escolher?" + subtítulo
"A espessura do papelão influencia diretamente na resistência da embalagem".

**Carrossel horizontal** de 5 cards (scroll-snap; setas nas laterais no desktop).
Cada card (fundo cinza-claro/surface, arredondado):
- título serif "Onda X" + label sublinhado à direita
- bullets
- imagem do corte do papelão
- "Diferenças visuais:" + a descrição
- uma **linha de onda colorida** (SVG) — amplitude/frequência refletem a onda
- espessura à direita (ex: "≈ 2,2mm")

| Onda | Label | Espessura | Cor da onda | Bullets | Diferenças visuais |
|---|---|---|---|---|---|
| D | Ultrafina | ≈ 2,2mm | rosa/magenta | Produtos leves; Embalagens para brindes; Cosméticos e acessórios | Ondas baixas e menos espaçadas |
| B | Fina | ≈ 3mm | vermelho | Caixas de e-commerce; Alimentos; Caixas para uso geral. | ondulações pequenas e próximas |
| C | Média | ≈ 3,8mm | azul | Vidros e cerâmicas leves; Produtos frágeis; Eletrônicos leves | ondas mais altas e mais espaçadas |
| BB | Reforçada | ≈ 3,8mm | verde | Transporte pesado; Empilhamento; Produtos industriais | Duas camadas de onda B empilhadas |
| BC | Reforçada | ≈ 6mm | roxo | Eletrodomésticos; Mudanças; Produtos pesados e frágeis. | Duas camadas de onda, uma B e outra C |

Imagens: `guias/onda-d.webp`, `onda-b.webp`, `onda-c.webp`, `onda-bb.webp`, `onda-bc.webp`.
As cores das ondas são **decorativas** — declarar como tokens novos em `tokens.css`
(`--color-onda-d`, `--color-onda-b`, …), não hex solto no componente.

### 7c. `/guia/plastico-bolha-divisorias-ou-papel-kraft` (`guias/materiais-hero.webp`)
Hero: foto full-bleed (mãos com plástico bolha), sem texto.
Depois, centralizado (fundo `brand-surface`): h1 serif verde
"Plástico bolha, divisórias ou papel kraft?" + subtítulo em 2 linhas
"Cada material possui uma função diferente. / Escolher o correto evita danos e reduz custos."

**3 cards** lado a lado, cada um: topo verde (`brand-primary`) com h2 serif branco
**sublinhado** + bullets em 2 colunas; embaixo, foto ocupando o resto do card, com os
"✔ benefícios" em texto branco sobre a foto (canto inferior).

| Card | Bullets | Benefícios | Imagem |
|---|---|---|---|
| Plástico bolha | Produtos frágeis; Vidros; Eletrônicos; Cerâmicas | ✔ Absorve impactos / ✔ Protege contra riscos | `guias/materiais-bolha.webp` |
| Divisórias | Garrafas; Frascos; Copos; Delicados | ✔ Evitam atritos durante o transporte | (reusar imagem de divisória do catálogo: `public/produtos/divisoria/0.webp`) |
| Papel kraft | Preenchimento de espaços; Proteção superficial | ✔ Econômico / ✔ Reciclável / ✔ Versátil | `guias/materiais-kraft.webp` |

---

## 8. Footer (`src/components/layout/Footer.tsx`)

**Modelo:** o botão do WhatsApp é uma **pill branca** com o logo real do WhatsApp
(verde) + a palavra "WhatsApp" em verde bold. O meu tem um balão genérico e diz
"Fale conosco". Trocar pelo ícone do WhatsApp e o rótulo "WhatsApp".

O "F" script gigante do canto já foi ajustado pelo usuário — **não mexer**.

---

## 9. Página de produto — conferir

O modelo tem **três** botões: `Adicionar ao orçamento`, `Comprar agora (WhatsApp)`,
`Falar com um especialista`. Conferir se os três existem no nosso `ProdutoPage` e, se
faltarem, adicionar. Após "Adicionar ao orçamento", o nosso deve navegar/dar feedback
sem abrir sheet (o sheet vai deixar de existir).
