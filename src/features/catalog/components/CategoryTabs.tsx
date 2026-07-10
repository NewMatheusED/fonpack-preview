import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { categorias } from '../data/categorias'

type CategoryTabsProps = {
  value: string
  onValueChange: (value: string) => void
}

export default function CategoryTabs({ value, onValueChange }: CategoryTabsProps) {
  return (
    <Tabs value={value} onValueChange={(v) => onValueChange(String(v))}>
      <TabsList
        variant="line"
        className="h-auto w-full justify-start gap-5 overflow-x-auto bg-transparent p-0"
      >
        <TabsTrigger
          value="tudo"
          className="shrink-0 px-1 py-1.5 text-sm font-medium text-brand data-active:text-brand-primary"
        >
          Tudo
        </TabsTrigger>
        {categorias.map((categoria) => (
          <TabsTrigger
            key={categoria.id}
            value={categoria.id}
            className="shrink-0 px-1 py-1.5 text-sm font-medium text-brand data-active:text-brand-primary"
          >
            {categoria.nome}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
