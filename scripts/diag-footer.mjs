import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
for (const w of [1440, 768, 390]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4391/orcamento', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,800))
  const d = await p.evaluate(()=>{
    const f=document.querySelector('footer')
    const span=[...f.querySelectorAll('span')].find(s=>s.textContent.trim()==='F')
    const fr=f.getBoundingClientRect(), sr=span.getBoundingClientRect()
    return {
      footer:{top:Math.round(fr.top), bottom:Math.round(fr.bottom), h:Math.round(fr.height)},
      glifo:{top:Math.round(sr.top), bottom:Math.round(sr.bottom), right:Math.round(sr.right)},
      cortadoNoTopo: sr.top < fr.top,
      sangraNaBase: sr.bottom > fr.bottom,
      folgaAteOTopo: Math.round(sr.top - fr.top),
      opacidade: getComputedStyle(span).color,
    }
  })
  console.log(`@${String(w).padStart(4)}px  cortado no topo: ${d.cortadoNoTopo ? 'SIM (BUG)' : 'não'} | folga até o topo do footer: ${d.folgaAteOTopo}px | sangra na base: ${d.sangraNaBase} | cor: ${d.opacidade}`)
  await p.close()
}
await B.close()
