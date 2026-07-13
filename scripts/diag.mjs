import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
await p.goto('http://localhost:4331/', { waitUntil:'networkidle0' })
const r = await p.evaluate(() => {
  const ps=[...document.querySelectorAll('p')].filter(e=>/Tudo o que você precisa/.test(e.textContent))
  return ps.map(e=>{const b=e.getBoundingClientRect();const cs=getComputedStyle(e);
    return {x:Math.round(b.x),w:Math.round(b.width),textAlign:cs.textAlign,ml:cs.marginLeft,mr:cs.marginRight,maxW:cs.maxWidth,parentAlign:getComputedStyle(e.parentElement).textAlign,cls:e.className}})
})
console.log(JSON.stringify(r,null,1))
// overflow check em todas as paginas
for (const rota of ['/','/guia/qual-onda-escolher','/loja','/catalogo/bobina-kraft']) {
  const q = await B.newPage(); await q.setViewport({ width:1440, height:900 })
  await q.goto('http://localhost:4331'+rota, { waitUntil:'networkidle0' })
  const o = await q.evaluate(()=>({sw:document.documentElement.scrollWidth, cw:document.documentElement.clientWidth}))
  console.log(rota, 'scrollWidth='+o.sw, o.sw>o.cw?'<<< OVERFLOW':'ok')
  await q.close()
}
await B.close()
