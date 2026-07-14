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
  const qtdLinhas = itens.length

  return (
    <div className="bg-brand-base">
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
            <div className="flex min-h-45 w-full items-center justify-center rounded-md border border-brand-accent/40 bg-brand-base px-6 py-12">
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
            <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
              <div>
                <div>
                  <ul>
                    {itens.map((item) => (
                      <OrcamentoItem key={item.id} item={item} />
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <Link
                    to="/loja"
                    className="text-sm font-medium text-brand-primary underline underline-offset-4"
                  >
                    Continuar comprando
                  </Link>
                  <button
                    type="button"
                    onClick={clear}
                    className="text-sm text-brand-muted underline underline-offset-4 transition-colors hover:text-brand-primary"
                  >
                    Limpar orçamento
                  </button>
                </div>
              </div>

              <aside className="h-fit rounded-md border border-brand-accent/40 bg-brand-base p-6 lg:sticky lg:top-24">
                <h2 className="font-sans text-lg font-bold text-brand">Resumo do orçamento</h2>

                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <dt className="text-brand-muted">Itens</dt>
                    <dd className="font-medium text-brand">
                      {qtdLinhas} {qtdLinhas === 1 ? 'item' : 'itens'}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between">
                    <dt className="text-brand-muted">Frete</dt>
                    <dd className="font-medium text-brand">A combinar</dd>
                  </div>
                </dl>

                <div className="mt-6 border-t border-brand-accent/30 pt-6 text-center">
                  <p className="text-sm text-brand-muted">Como deseja enviar seu orçamento?</p>
                  <a
                    href={buildOrcamentoUrl(itens)}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 flex w-full items-center justify-center rounded-full bg-brand-primary px-6 py-3.5 text-sm font-semibold text-brand-surface transition-colors hover:bg-brand-primary-2"
                  >
                    Enviar pelo WhatsApp
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
