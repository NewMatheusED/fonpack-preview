import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })

// 1) wordmark centralizado?
for (const w of [1440, 1024, 390]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900 })
  await p.goto('http://localhost:4370/', { waitUntil:'networkidle0' })
  await new Promise(r=>setTimeout(r,600))
  const d = await p.evaluate(()=>{
    const el=[...document.querySelectorAll('header a')].find(a=>/FonPack/.test(a.innerText)&&/Embalagens/i.test(a.innerText))
    const b=el.getBoundingClientRect()
    return { centroMarca: Math.round(b.left+b.width/2), centroTela: Math.round(window.innerWidth/2) }
  })
  console.log(`wordmark @${String(w).padStart(4)}px -> centro da marca: ${d.centroMarca} | centro da tela: ${d.centroTela} | DESVIO: ${d.centroMarca-d.centroTela}px`)
  await p.close()
}

// 2) card do orçamento vazio
const p2 = await B.newPage(); await p2.setViewport({ width:1440, height:900 })
await p2.goto('http://localhost:4370/orcamento', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,700))
console.log('\ncard vazio:', JSON.stringify(await p2.evaluate(()=>{
  const c=[...document.querySelectorAll('div')].find(d=>/Seu orçamento está vazio/.test(d.innerText)&&d.className.includes('bg-brand-surface'))
  const b=c.getBoundingClientRect(); const cont=c.parentElement.parentElement.getBoundingClientRect()
  return { largura: Math.round(b.width), containerDisponivel: Math.round(cont.width), cta: !!c.querySelector('a') }
})))

// 3) link "Ver meu orçamento" persiste depois dos 2.2s?
const p3 = await B.newPage(); await p3.setViewport({ width:390, height:844, isMobile:true })
await p3.goto('http://localhost:4370/catalogo/bobina-kraft', { waitUntil:'networkidle0' })
await new Promise(r=>setTimeout(r,800))
await p3.evaluate(()=>document.querySelectorAll('[role=radio]')[0].click())
await new Promise(r=>setTimeout(r,250))
await p3.evaluate(()=>[...document.querySelectorAll('button')].find(e=>/adicionar ao or/i.test(e.innerText)).click())
const linkVisivel = () => p3.evaluate(()=>[...document.querySelectorAll('a')].map(a=>a.innerText.trim()).find(t=>/ver meu orçamento/i.test(t)) ?? 'SUMIU')
await new Promise(r=>setTimeout(r,500));  console.log('\nlink 0,5s após adicionar:', JSON.stringify(await linkVisivel()))
await new Promise(r=>setTimeout(r,3000)); console.log('link 3,5s após adicionar:', JSON.stringify(await linkVisivel()), '(o "Adicionado ✓" já expirou)')
await B.close()
