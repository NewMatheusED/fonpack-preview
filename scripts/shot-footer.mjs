import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const [nome,w] of [['desktop',1440],['mobile',390]]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900, deviceScaleFactor:2 })
  await p.goto('http://localhost:4391/orcamento', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,800))
  const el = await p.$('footer'); const box = await el.boundingBox()
  await p.evaluate((y)=>window.scrollTo(0,y-40), box.y)
  await new Promise(r=>setTimeout(r,500))
  const el2 = await p.$('footer')
  await el2.screenshot({ path:`docs/reference/audit/footer-${nome}.png` })
  console.log('ok', nome, Math.round(box.width)+'x'+Math.round(box.height))
  await p.close()
}
await B.close()
