import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
for (const rota of ['/','/loja','/catalogo/palete','/guia/como-tirar-medidas']) {
  const p = await B.newPage()
  await p.setViewport({ width:390, height:844, deviceScaleFactor:2, isMobile:true })  // mobile
  await p.evaluateOnNewDocument(() => {
    window.__cls = 0
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value
    }).observe({ type: 'layout-shift', buffered: true })
  })
  await p.goto('http://localhost:4351'+rota, { waitUntil:'networkidle0' })
  await p.evaluate(async () => { const h=document.body.scrollHeight; for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60))} })
  await new Promise(r=>setTimeout(r,900))
  const cls = await p.evaluate(()=>window.__cls)
  console.log(rota.padEnd(28), 'CLS =', cls.toFixed(3), cls>0.25?'  <<< RUIM':cls>0.1?'  << precisa melhorar':'  ok')
  await p.close()
}
await B.close()
