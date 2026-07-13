import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const p = await B.newPage()
await p.setViewport({ width:1440, height:900 })
const BASE='https://enlivened-pomegranate-317762-1e9fffd39.framer.app'
await p.goto(BASE+'/catalogo/bobina-kraft', { waitUntil:'networkidle0', timeout:90000 })
await new Promise(r=>setTimeout(r,3500))
const clicked = await p.evaluate(() => {
  const b=[...document.querySelectorAll('button')].find(e=>/^Adicionar ao or/i.test((e.innerText||'').trim()))
  if(!b) return null
  b.click(); return b.innerText.trim()
})
console.log('clicou em:', clicked)
await new Promise(r=>setTimeout(r,5000))
await p.screenshot({ path:'docs/reference/audit/shots/produto-apos-add.png' })
await p.goto(BASE+'/orcamento', { waitUntil:'networkidle0', timeout:90000 })
await new Promise(r=>setTimeout(r,4000))
await p.evaluate(()=>{for(const el of document.querySelectorAll('body > div, body > a')){const t=el.textContent||'';if(/BUY LICENCE|Made in Framer|Framer Commerce|FRAMESHIP/i.test(t)&&el.id!=='main')el.remove()}})
await p.screenshot({ path:'docs/reference/audit/shots/orcamento-cheio.png', fullPage:true })
console.log('---\n'+(await p.evaluate(()=>document.body.innerText)).slice(0,700))
await B.close()
