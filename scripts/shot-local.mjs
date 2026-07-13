import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
fs.mkdirSync('docs/reference/audit/meu', { recursive:true })
for (const [n,r] of [['home','/'],['loja','/loja'],['produto','/catalogo/bobina-kraft'],['sobre','/sobre-nos'],['contato','/fale-conosco']]) {
  const p = await B.newPage()
  await p.setViewport({ width:1440, height:900 })
  await p.goto('http://localhost:4321'+r, { waitUntil:'networkidle0', timeout:30000 })
  await new Promise(r=>setTimeout(r,1200))
  await p.screenshot({ path:`docs/reference/audit/meu/${n}.png`, fullPage:true })
  console.log('ok', n); await p.close()
}
await B.close()
