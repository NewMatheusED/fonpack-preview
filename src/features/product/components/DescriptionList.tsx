type DescriptionListProps = {
  descricao: string[]
}

export default function DescriptionList({ descricao }: DescriptionListProps) {
  if (descricao.length === 0) return null

  return (
    <div>
      <h2 className="font-serif text-xl text-brand-primary">Descrição Básica</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-brand">
        {descricao.map((linha) => (
          <li key={linha}>{linha}</li>
        ))}
      </ul>
    </div>
  )
}
