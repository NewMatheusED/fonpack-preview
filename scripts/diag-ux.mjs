import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })

// 1) 404
const p1 = await B.newPage(); await p1.setViewport({width:1440,height:900})
await p1.goto('http://localhost:4360/loja2-nao-existe', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,800))
console.log('1) URL inválida ->', JSON.stringify((await p1.evaluate(()=>document.querySelector('h1')?.innerText)) ?? 'PÁGINA EM BRANCO'))

// 2) fluxo completo -> mensagem do whatsapp
const p2 = await B.newPage(); await p2.setViewport({width:390,height:844,isMobile:true})
await p2.goto('http://localhost:4360/catalogo/palete', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,900))
await p2.evaluate(()=>[...document.querySelectorAll('[role=radio]')].find(e=>e.innerText.trim()==='BC').click())
await p2.evaluate(()=>document.querySelector('button[aria-pressed]').click())
await new Promise(r=>setTimeout(r,300))
await p2.evaluate(()=>[...document.querySelectorAll('button')].find(e=>/adicionar ao or/i.test(e.innerText)).click())
await new Promise(r=>setTimeout(r,500))
console.log('2) atalho pós-adicionar ->', JSON.stringify(await p2.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.innerText.trim()).find(t=>/ver meu orçamento/i.test(t)) ?? 'NÃO EXISTE')))

// adiciona um 2o produto
await p2.goto('http://localhost:4360/catalogo/bobina-kraft', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,800))
await p2.evaluate(()=>document.querySelectorAll('[role=radio]')[0].click())
await new Promise(r=>setTimeout(r,250))
await p2.evaluate(()=>[...document.querySelectorAll('button')].find(e=>/adicionar ao or/i.test(e.innerText)).click())
await new Promise(r=>setTimeout(r,400))

// 3) mensagem final do whatsapp
await p2.goto('http://localhost:4360/orcamento', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,900))
const href = await p2.evaluate(()=>[...document.querySelectorAll('a')].find(a=>/wa\.me/.test(a.href))?.href)
console.log('\n3) MENSAGEM QUE CHEGA NO WHATSAPP:\n---')
console.log(decodeURIComponent(href.split('?text=')[1]))
console.log('---')
await B.close()
