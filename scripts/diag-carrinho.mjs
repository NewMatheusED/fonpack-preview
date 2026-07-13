import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:1000 })
await p.goto('http://localhost:4351/catalogo/palete', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,900))

const estado = () => p.evaluate(()=>{
  const b=[...document.querySelectorAll('button')].find(e=>/adicionar/i.test(e.innerText))
  const s=localStorage.getItem('fonpack-orcamento')
  return {
    itens: s?JSON.parse(s).state.itens.length:0,
    botao: b ? b.innerText.trim()+(b.disabled?' [DESABILITADO]':' [ok]') : '?',
    aviso: [...document.querySelectorAll('p')].map(e=>e.innerText).find(t=>/adicionar ao orçamento\.$/i.test(t)) ?? '—',
  }
})
const onda=(l)=>p.evaluate((l)=>[...document.querySelectorAll('[role=radio]')].find(e=>e.innerText.trim()===l).click(),l)
const cor=()=>p.evaluate(()=>document.querySelector('button[aria-pressed]').click())
const add=()=>p.evaluate(()=>[...document.querySelectorAll('button')].find(e=>/adicionar/i.test(e.innerText)).click())
const log=async(t)=>{const e=await estado();console.log(t.padEnd(26),'| itens:',e.itens,'|',e.botao,'|',e.aviso)}

await log('início')
await onda('B'); await new Promise(r=>setTimeout(r,250)); await log('cliquei onda B')
await onda('C'); await onda('BC'); await new Promise(r=>setTimeout(r,250)); await log('cliquei +2 ondas')
await add(); await new Promise(r=>setTimeout(r,300)); await log('tentei adicionar sem cor')
await cor(); await new Promise(r=>setTimeout(r,300)); await log('escolhi a cor')
await add(); await new Promise(r=>setTimeout(r,400)); await log('ADICIONEI')
console.log('\norçamento:', JSON.stringify(await p.evaluate(()=>JSON.parse(localStorage.getItem('fonpack-orcamento')).state.itens)))
await B.close()
