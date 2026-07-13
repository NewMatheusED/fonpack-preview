import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
await p.goto('http://localhost:4424/guia/como-tirar-medidas', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,1200))
await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70))};window.scrollTo(0,0)}); await new Promise(r=>setTimeout(r,700)); await p.screenshot({ path:'docs/reference/audit/guia-hero.png', fullPage:true })
console.log('ok')
await B.close()
