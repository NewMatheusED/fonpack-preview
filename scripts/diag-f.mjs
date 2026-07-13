import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const [n,w] of [['mobile',390],['tablet',768],['desktop',1440]]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900, deviceScaleFactor:2 })
  await p.goto('http://localhost:4440/orcamento', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,700))
  const d = await p.evaluate(()=>{
    const f=document.querySelector('footer')
    const span=[...f.querySelectorAll('span')].filter(s=>s.textContent.trim()==='F')
      .find(s=>s.getBoundingClientRect().width>0)
    if(!span) return { presente:false }
    const s=span.getBoundingClientRect(), fr=f.getBoundingClientRect()
    return { presente:true, cortado: s.top<fr.top||s.bottom>fr.bottom||s.right>fr.right||s.left<fr.left }
  })
  console.log(`${n.padEnd(8)} @${String(w).padStart(4)}px  F: ${d.presente ? (d.cortado?'presente e CORTADO':'presente e inteiro') : 'ausente (correto no mobile)'}`)
  const el = await p.$('footer')
  await el.screenshot({ path:`docs/reference/audit/footer-${n}.png` })
  await p.close()
}
await B.close()
