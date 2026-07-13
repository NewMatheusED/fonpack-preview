import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const BASE='https://enlivened-pomegranate-317762-1e9fffd39.framer.app'
for (const [n,rota] of [['fita-personalizada','/catalogo/fita-acr%C3%ADlica-personalizada'],['bobina-kraft','/catalogo/bobina-kraft']]) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:1100, deviceScaleFactor:2 })
  await p.goto(BASE+rota, { waitUntil:'networkidle0', timeout:90000 })
  await new Promise(r=>setTimeout(r,3500))
  await p.evaluate(()=>{for(const el of document.querySelectorAll('body > div, body > a')){const t=el.textContent||'';if(/BUY LICENCE|Made in Framer|Framer Commerce|FRAMESHIP/i.test(t)&&el.id!=='main')el.remove()}})
  await p.screenshot({ path:`docs/reference/audit/framer-${n}.png`, fullPage:true })
  const info = await p.evaluate(()=>({
    inputs: [...document.querySelectorAll('input')].map(i=>({type:i.type, value:i.value, min:i.min, max:i.max, ph:i.placeholder, name:i.name})),
    botoes: [...document.querySelectorAll('button')].map(b=>b.innerText.trim()).filter(Boolean),
    texto: document.body.innerText.replace(/\n{2,}/g,'\n').slice(0,900),
  }))
  console.log(`\n===== ${n} =====`)
  console.log('inputs:', JSON.stringify(info.inputs))
  console.log('botoes:', JSON.stringify(info.botoes))
  console.log('---\n'+info.texto)
  await p.close()
}
await B.close()
