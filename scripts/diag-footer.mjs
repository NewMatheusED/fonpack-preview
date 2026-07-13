import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
for (const w of [1440, 1024, 768]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4410/orcamento', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,700))
  const d = await p.evaluate(()=>{
    const f=document.querySelector('footer')
    const span=[...f.querySelectorAll('span')].filter(s=>s.textContent.trim()==='F')
      .find(s=>s.getBoundingClientRect().width>0)
    if(!span) return null
    const col=span.parentElement
    const s=span.getBoundingClientRect(), c=col.getBoundingClientRect(), fr=f.getBoundingClientRect()
    return {
      centroGlifo: Math.round(s.left+s.width/2),
      centroColuna: Math.round(c.left+c.width/2),
      desvio: Math.round((s.left+s.width/2)-(c.left+c.width/2)),
      cortado: s.top<fr.top || s.bottom>fr.bottom || s.right>fr.right || s.left<fr.left,
    }
  })
  if(!d){ console.log(`@${w}px  (marca escondida neste tamanho)`); await p.close(); continue }
  console.log(`@${String(w).padStart(4)}px  centro do glifo: ${d.centroGlifo} | centro da coluna: ${d.centroColuna} | DESVIO: ${d.desvio}px | ${d.cortado?'CORTADO':'inteiro'}`)
  await p.close()
}
await B.close()
