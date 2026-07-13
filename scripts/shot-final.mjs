import puppeteer from 'puppeteer-core'
import fs from 'node:fs'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
fs.mkdirSync('docs/reference/audit/meu', { recursive:true })
const ROTAS = [['home','/'],['loja','/loja'],['produto','/catalogo/bobina-kraft'],['orcamento','/orcamento'],['guia-medidas','/guia/como-tirar-medidas'],['guia-onda','/guia/qual-onda-escolher'],['guia-materiais','/guia/plastico-bolha-divisorias-ou-papel-kraft'],['sobre','/sobre-nos'],['contato','/fale-conosco']]
const rolar = async (p) => {
  await p.evaluate(async () => {
    const h = document.body.scrollHeight
    for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 90)) }
    window.scrollTo(0, 0)
    await new Promise(r => setTimeout(r, 400))
  })
}
for (const [n,r] of ROTAS) {
  const p = await B.newPage()
  await p.setViewport({ width:1440, height:900 })
  await p.goto('http://localhost:4331'+r, { waitUntil:'networkidle0', timeout:30000 })
  await rolar(p); await new Promise(x=>setTimeout(x,900))
  await p.screenshot({ path:`docs/reference/audit/meu/${n}.png`, fullPage:true })
  await p.setViewport({ width:390, height:844 })
  await rolar(p); await new Promise(x=>setTimeout(x,900))
  await p.screenshot({ path:`docs/reference/audit/meu/${n}-mobile.png`, fullPage:true })
  console.log('ok', n); await p.close()
}
await B.close()
