import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const w of [1900, 1440, 1024, 768, 390]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4431/guia/qual-onda-escolher', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,900))
  const d = await p.evaluate(()=>{
    const cards=[...document.querySelectorAll('[data-onda-card]')]
    const topo=(sel)=>[...new Set(cards.map(c=>Math.round(c.querySelector(sel).getBoundingClientRect().top)))]
    const sc=cards[0].parentElement
    return {
      titulo: topo('h3').length, bullets: topo('ul').length,
      imagem: topo('img').length, onda: topo('svg').length,
      base: [...new Set(cards.map(c=>Math.round(c.getBoundingClientRect().bottom)))].length,
      rola: sc.scrollWidth > sc.clientWidth + 4,
      setas: [...document.querySelectorAll('button[aria-label*="onda" i]')].filter(b=>b.getBoundingClientRect().width>0).length,
      overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
    }
  })
  const faixas=[d.titulo,d.bullets,d.imagem,d.onda,d.base]
  const ok = faixas.every(n=>n===1)
  console.log(`@${String(w).padStart(4)}px  faixas alinhadas: ${ok?'TODAS':'DESALINHADO '+JSON.stringify({titulo:d.titulo,bullets:d.bullets,imagem:d.imagem,onda:d.onda,base:d.base})} | rola:${d.rola} setas:${d.setas} overflow:${d.overflow}`)
  await p.close()
}
await B.close()
