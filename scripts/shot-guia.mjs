import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
await p.goto('http://localhost:4325/guia/como-tirar-medidas', { waitUntil:'networkidle0', timeout:30000 })
await new Promise(r=>setTimeout(r,1500))
await p.screenshot({ path:'docs/reference/audit/meu/guia-medidas.png', fullPage:true })
await B.close(); console.log('ok')
