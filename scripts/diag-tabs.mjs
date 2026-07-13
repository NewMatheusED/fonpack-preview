import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
for (const w of [1440, 390]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4382/loja', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,800))
  const d = await p.evaluate(()=>{
    const list=document.querySelector('[role=tablist]')
    const cs=getComputedStyle(list)
    const ativo=list.querySelector('[data-active], [aria-selected=true]')
    // procura o indicador (elemento que desenha o risco)
    const filhos=[...list.children].map(c=>({tag:c.tagName, role:c.getAttribute('role'), h:Math.round(c.getBoundingClientRect().height), bottom:Math.round(c.getBoundingClientRect().bottom)}))
    return {
      overflowX: cs.overflowX, overflowY: cs.overflowY,
      alturaVisivel: Math.round(list.clientHeight),
      alturaConteudo: Math.round(list.scrollHeight),
      rolaNaVertical: list.scrollHeight > list.clientHeight,
      fundoDoAtivo: ativo ? Math.round(ativo.getBoundingClientRect().bottom) : null,
      fundoDaLista: Math.round(list.getBoundingClientRect().bottom),
      filhos,
    }
  })
  console.log(`@${w}px`, JSON.stringify(d, null, 1))
  await p.close()
}
await B.close()
