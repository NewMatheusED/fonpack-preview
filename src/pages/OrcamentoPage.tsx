import { Link } from 'react-router-dom'
import Breadcrumb from '@/components/layout/Breadcrumb'
import Seo from '@/components/seo/Seo'
import OrcamentoItem from '@/features/cart/components/OrcamentoItem'
import { useCart } from '@/features/cart/store'
import { buildOrcamentoUrl } from '@/lib/whatsapp'

export default function OrcamentoPage() {
  const itens = useCart((s) => s.itens)
  const clear = useCart((s) => s.clear)
  const vazio = itens.length === 0

  return (
    <div className="bg-brand-surface-2">
      <Seo
        titulo="Seu Orçamento | FonPack Embalagens"
        descricao="Revise seu pedido e solicite seu orçamento sem compromisso com a FonPack Embalagens."
      />

      <div className="mx-auto min-h-[50vh] max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Breadcrumb
          items={[{ label: 'Home', to: '/' }, { label: 'Loja', to: '/loja' }, { label: 'Carrinho' }]}
        />

        <h1 className="mt-6 font-sans text-3xl text-brand">Seu Orçamento</h1>
        <p className="mt-2 text-sm text-brand-muted">
          Revise seu pedido e solicite seu orçamento sem compromisso.
        </p>

        <div className="mt-8">
          {vazio ? (
            <div className="flex min-h-[180px] w-full items-center justify-center rounded-md bg-brand-surface px-6 py-12">
              <div className="text-center">
                <p className="font-bold text-brand">Seu orçamento está vazio</p>
                <p className="mt-1 text-sm text-brand-muted">
                  Adicione produtos na loja para solicitar cotação.
                </p>
                <Link
                  to="/loja"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
                >
                  Ver os produtos
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8">
              <ul className="flex flex-col gap-4">
                {itens.map((item) => (
                  <OrcamentoItem key={item.id} item={item} />
                ))}
              </ul>

              <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                  <a
                    href={buildOrcamentoUrl(itens)}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3.5 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
                  >
                    Solicitar orçamento pelo WhatsApp
                  </a>
                  <Link
                    to="/loja"
                    className="text-center text-sm font-medium text-brand-primary underline underline-offset-4"
                  >
                    Continuar comprando
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={clear}
                  className="text-sm text-brand-muted underline underline-offset-4 transition-colors hover:text-brand-primary"
                >
                  Limpar orçamento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
