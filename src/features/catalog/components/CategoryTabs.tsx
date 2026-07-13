import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { categorias } from '../data/categorias'

type CategoryTabsProps = {
  value: string
  onValueChange: (value: string) => void
}

/**
 * O indicador da aba ativa é um `::after` que o shadcn posiciona em
 * `bottom-[-5px]`, ou seja, fora da caixa do botão. Dois problemas vinham daí:
 *
 * - `overflow-x-auto` faz o navegador promover o eixo Y para `auto` também (a
 *   spec não deixa um eixo ficar `visible` com o outro rolável), então o risco
 *   ficava recortado e só aparecia quando se rolava. O `pb-2` traz esses pixels
 *   para dentro da área visível.
 * - o `::after` usa `bg-foreground`, um token cru do shadcn (quase preto). Num
 *   texto verde da marca isso fica errado — daí o override para `brand-primary`.
 */
const ABA =
  'shrink-0 px-1 py-1.5 text-sm font-medium text-brand data-active:text-brand-primary data-active:after:bg-brand-primary'

export default function CategoryTabs({ value, onValueChange }: CategoryTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(String(v))}>
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-5 overflow-x-auto bg-transparent p-0 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <TabsTrigger value="tudo" className={ABA}>
          Tudo
        </TabsTrigger>
        {categorias.map((categoria) => (
          <TabsTrigger key={categoria.id} value={categoria.id} className={ABA}>
            {categoria.nome}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
