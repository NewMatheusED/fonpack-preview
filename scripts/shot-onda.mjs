import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const p = await B.newPage(); await p.setViewport({ width:1900, height:1000, deviceScaleFactor:1 })
await p.goto('http://localhost:4430/guia/qual-onda-escolher', { waitUntil:'networkidle0' })
await p.evaluate(()=>window.scrollTo(0,520)); await new Promise(r=>setTimeout(r,800))
await p.screenshot({ path:'docs/reference/audit/onda-grid.png' })
console.log('ok')
await B.close()
