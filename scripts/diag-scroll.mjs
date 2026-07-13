import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
await p.goto('http://localhost:4341/', { waitUntil:'networkidle0' })

// rola até o fundo da home
await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
await new Promise(r=>setTimeout(r,600))
console.log('scrollY na home, no fundo:', await p.evaluate(()=>Math.round(window.scrollY)))

// clica no card do guia "Qual onda devo escolher?"
await p.evaluate(() => {
  const a=[...document.querySelectorAll('a[href*="qual-onda"]')][0]; a.click()
})
await new Promise(r=>setTimeout(r,300))
console.log('logo apos clicar (durante a animacao):', await p.evaluate(()=>Math.round(window.scrollY)))
await new Promise(r=>setTimeout(r,1600))
console.log('rota agora:', await p.evaluate(()=>location.pathname))
console.log('scrollY depois da animacao:', await p.evaluate(()=>Math.round(window.scrollY)))

// agora testa o VOLTAR: deve restaurar, nao ir pro topo
await p.evaluate(()=>window.scrollTo(0,1200)); await new Promise(r=>setTimeout(r,400))
await p.evaluate(() => { const a=[...document.querySelectorAll('a[href="/loja"]')][0]; a.click() })
await new Promise(r=>setTimeout(r,1500))
console.log('foi pra /loja, scrollY:', await p.evaluate(()=>Math.round(window.scrollY)))
await p.goBack({ waitUntil:'networkidle0' }); await new Promise(r=>setTimeout(r,1200))
console.log('apos VOLTAR, rota:', await p.evaluate(()=>location.pathname), '| scrollY:', await p.evaluate(()=>Math.round(window.scrollY)))
await B.close()
