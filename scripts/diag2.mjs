import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:1000 })
p.on('pageerror', e=>console.log('PAGEERROR:', e.message))
await p.goto('http://localhost:4350/catalogo/palete', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,1200))
console.log(await p.evaluate(()=>JSON.stringify({
  url: location.pathname,
  botoes: [...document.querySelectorAll('button')].map(b=>b.innerText.trim().slice(0,30)).filter(Boolean),
  radios: [...document.querySelectorAll('[role=radio]')].map(b=>b.innerText.trim()),
  texto: document.body.innerText.slice(0,120)
}, null, 1)))
await B.close()
