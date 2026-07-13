import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const [nome,w] of [['desktop',1440],['mobile',390]]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900, deviceScaleFactor:2 })
  await p.goto('http://localhost:4382/loja', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,700))
  // seleciona a categoria "Bobinas" pra ver o risco na aba ativa
  await p.evaluate(()=>{const t=[...document.querySelectorAll('[role=tab]')].find(e=>/bobina/i.test(e.innerText)); if(t) t.click()})
  await new Promise(r=>setTimeout(r,500))
  const el = await p.$('[role=tablist]')
  const box = await el.boundingBox()
  await p.screenshot({ path:`docs/reference/audit/tabs-${nome}.png`, clip:{ x:Math.max(0,box.x-8), y:box.y-8, width:Math.min(w, box.width+16), height:box.height+22 } })
  console.log('ok', nome)
  await p.close()
}
await B.close()
