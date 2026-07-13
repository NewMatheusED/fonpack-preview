import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:1250 })
await p.goto('http://localhost:4451/catalogo/palete', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,800))
await p.evaluate(()=>{
  [...document.querySelectorAll('[role=radio]')].find(r=>r.innerText.trim().startsWith('BC')).click()
  document.querySelector('button[aria-pressed]').click()
})
await new Promise(r=>setTimeout(r,300))
await p.evaluate(()=>{const i=document.querySelector('input[aria-label=Quantidade]');
  const set=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  set.call(i,'120'); i.dispatchEvent(new Event('input',{bubbles:true}))})
await new Promise(r=>setTimeout(r,400))
const area = await p.$('.fp-right-area, main')
await p.screenshot({ path:'docs/reference/audit/produto-qtd.png' })
console.log('ok')
await B.close()
