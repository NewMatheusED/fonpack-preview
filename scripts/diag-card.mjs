import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
for (const w of [1440, 390]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4370/orcamento', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,700))
  const d = await p.evaluate(()=>{
    // sobe a partir do texto até o elemento que tem o fundo creme do card
    let el=[...document.querySelectorAll('p')].find(e=>/Seu orçamento está vazio/.test(e.innerText))
    while (el && getComputedStyle(el).backgroundColor === 'rgba(0, 0, 0, 0)') el = el.parentElement
    const card = el.getBoundingClientRect()
    const container = el.parentElement.getBoundingClientRect()
    return { card: Math.round(card.width), container: Math.round(container.width), bg: getComputedStyle(el).backgroundColor }
  })
  console.log(`@${String(w).padStart(4)}px -> card: ${d.card}px | espaço do container: ${d.container}px | ${d.card===d.container?'PREENCHE':'SOBRA '+(d.container-d.card)+'px'} | bg ${d.bg}`)
  await p.close()
}
await B.close()
