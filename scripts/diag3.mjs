import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:1000 })
await p.goto('http://localhost:4350/catalogo/palete', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,900))
const estado = () => p.evaluate(()=>({
  botoes: [...document.querySelectorAll('button')].map(b=>`${JSON.stringify(b.innerText.trim().slice(0,25))}${b.disabled?' [DISABLED]':''}`),
  aviso: [...document.querySelectorAll('p')].map(e=>e.innerText).find(t=>/para adicionar ao orçamento/i.test(t)) ?? null,
  itens: (localStorage.getItem('fonpack-orcamento') ? JSON.parse(localStorage.getItem('fonpack-orcamento')).state.itens.length : 0),
}))
console.log('INICIO:', JSON.stringify(await estado(), null, 1))
await p.evaluate(()=>[...document.querySelectorAll('[role=radio]')].find(e=>e.innerText.trim()==='B').click())
await new Promise(r=>setTimeout(r,300))
console.log('\nDEPOIS DE CLICAR NA ONDA B:', JSON.stringify(await estado(), null, 1))
await B.close()
