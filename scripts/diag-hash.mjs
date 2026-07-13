import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
// hashes hostis: id numerico (seletor invalido), :has() aninhado (DoS), e uri malformada
const HOSTIS = ['#123', '#a' + ':has(div)'.repeat(30), '#%']
for (const h of HOSTIS) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
  const erros = []
  p.on('pageerror', e => erros.push(e.message))
  const t0 = Date.now()
  await p.goto('http://localhost:4341/loja' + h, { waitUntil:'networkidle0', timeout:15000 })
  await new Promise(r=>setTimeout(r,800))
  const vivo = await p.evaluate(() => !!document.querySelector('main') && document.body.innerText.length > 50)
  console.log(JSON.stringify(h.slice(0,28)).padEnd(34), 'render_ok='+vivo, 'ms='+(Date.now()-t0), 'erros=['+erros.join(' | ')+']')
  await p.close()
}
await B.close()
