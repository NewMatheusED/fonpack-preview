import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
for (const w of [1440, 390]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4393/orcamento', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,800))
  const d = await p.evaluate(()=>{
    const f=document.querySelector('footer')
    // só o span REALMENTE visível (o outro está display:none)
    const span=[...f.querySelectorAll('span')].filter(s=>s.textContent.trim()==='F')
      .find(s=>s.getBoundingClientRect().width > 0)
    const fr=f.getBoundingClientRect(), sr=span.getBoundingClientRect()
    return {
      cortadoNoTopo: sr.top < fr.top,
      cortadoNaBase: sr.bottom > fr.bottom,
      cortadoNaDireita: sr.right > fr.right,
      alturaGlifo: Math.round(sr.height),
      alturaFooter: Math.round(fr.height),
    }
  })
  const ok = !d.cortadoNoTopo && !d.cortadoNaBase && !d.cortadoNaDireita
  console.log(`@${String(w).padStart(4)}px  glifo ${d.alturaGlifo}px em footer de ${d.alturaFooter}px | topo:${d.cortadoNoTopo?'CORTADO':'ok'} base:${d.cortadoNaBase?'CORTADO':'ok'} direita:${d.cortadoNaDireita?'CORTADO':'ok'}  => ${ok?'INTEIRO':'AINDA CORTADO'}`)
  await p.close()
}
await B.close()
