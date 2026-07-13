import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const [n,r] of [['home','/'],['loja','/loja'],['produto','/catalogo/palete']]) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
  await p.goto('http://localhost:4422'+r, { waitUntil:'networkidle0' })
  await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(x=>setTimeout(x,70))};window.scrollTo(0,0)})
  await new Promise(x=>setTimeout(x,900))
  await p.screenshot({ path:`docs/reference/audit/paleta-${n}.png`, fullPage:true })
  console.log('ok', n); await p.close()
}
await B.close()
