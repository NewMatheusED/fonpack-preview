import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:1200 })
await p.goto('http://localhost:4451/catalogo/gomada', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,900))

const linhas = () => p.evaluate(()=>[...document.querySelectorAll('[role=radio]')].map(r=>({
  texto: r.innerText.replace(/\n/g,' / ').trim(), marcada: r.getAttribute('aria-checked')
})))
const itens = () => p.evaluate(()=>{const s=localStorage.getItem('fonpack-orcamento');return s?JSON.parse(s).state.itens:[]})

console.log('--- opções da Fita Gomada:')
;(await linhas()).forEach((l,i)=>console.log(`  [${i}] ${l.texto.padEnd(28)} marcada=${l.marcada}`))

console.log('\n--- clico na PRIMEIRA "60mm" (a normal):')
await p.evaluate(()=>document.querySelectorAll('[role=radio]')[0].click())
await new Promise(r=>setTimeout(r,300))
;(await linhas()).forEach((l,i)=>console.log(`  [${i}] ${l.texto.padEnd(28)} marcada=${l.marcada}`))

console.log('\n--- digito 250 na quantidade e adiciono:')
await p.evaluate(()=>{const i=document.querySelector('input[aria-label=Quantidade]');
  const set=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  set.call(i,'250'); i.dispatchEvent(new Event('input',{bubbles:true}))})
await new Promise(r=>setTimeout(r,300))
await p.evaluate(()=>[...document.querySelectorAll('button')].find(b=>/adicionar ao or/i.test(b.innerText)).click())
await new Promise(r=>setTimeout(r,500))
console.log('  orçamento:', JSON.stringify(await itens()))

console.log('\n--- agora a SEGUNDA "60mm" (personalizada), qtd 3:')
await p.evaluate(()=>document.querySelectorAll('[role=radio]')[3].click())
await p.evaluate(()=>{const i=document.querySelector('input[aria-label=Quantidade]');
  const set=Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype,'value').set;
  set.call(i,'3'); i.dispatchEvent(new Event('input',{bubbles:true}))})
await new Promise(r=>setTimeout(r,300))
await p.evaluate(()=>[...document.querySelectorAll('button')].find(b=>/adicionar ao or/i.test(b.innerText)).click())
await new Promise(r=>setTimeout(r,500))
console.log('  orçamento:', JSON.stringify(await itens(), null, 1))
await B.close()
