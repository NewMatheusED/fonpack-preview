import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const cruza = (a,b) => !(a.right<=b.left || a.left>=b.right || a.bottom<=b.top || a.top>=b.bottom)
for (const [n,w] of [['mobile',390],['mobile-lg',430],['tablet',768],['desktop',1440]]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:844, deviceScaleFactor:2 })
  await p.goto('http://localhost:4442/orcamento', { waitUntil:'networkidle0' })
  // rola até o fim: é aí que o botão fixo encosta no footer
  await p.evaluate(()=>window.scrollTo(0, document.body.scrollHeight))
  await new Promise(r=>setTimeout(r,800))
  const d = await p.evaluate(()=>{
    const f=document.querySelector('footer')
    const span=[...f.querySelectorAll('span')].filter(s=>s.textContent.trim()==='F').find(s=>s.getBoundingClientRect().width>0)
    const float=[...document.querySelectorAll('a,button')].find(e=>/fale no whatsapp/i.test(e.innerText||'') && getComputedStyle(e).position==='fixed')
    const links=[...f.querySelectorAll('a')].filter(a=>/nossa loja|sobre nós|fale conosco/i.test(a.innerText))
    const r=e=>{const b=e.getBoundingClientRect();return {left:b.left,right:b.right,top:b.top,bottom:b.bottom}}
    return {
      f: span?r(span):null, fr: r(f),
      float: float?r(float):null,
      links: links.map(r),
    }
  })
  if(!d.f){ console.log(`${n.padEnd(9)} @${String(w).padStart(4)}  F ausente`); await p.close(); continue }
  const cortado = d.f.top<d.fr.top||d.f.bottom>d.fr.bottom||d.f.right>d.fr.right||d.f.left<d.fr.left
  const bateNoBotao = d.float ? cruza(d.f, d.float) : false
  const bateNoTexto = d.links.some(l=>cruza(d.f,l))
  console.log(`${n.padEnd(9)} @${String(w).padStart(4)}  cortado: ${cortado?'SIM':'não'} | encosta no botão: ${bateNoBotao?'SIM':'não'} | encosta nos links: ${bateNoTexto?'SIM':'não'}`)
  const el=await p.$('footer'); await el.screenshot({ path:`docs/reference/audit/footer-${n}.png` })
  await p.close()
}
await B.close()
