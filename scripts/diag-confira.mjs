import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const rota of ['/guia/como-tirar-medidas','/guia/qual-onda-escolher']) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
  await p.goto('http://localhost:4432'+rota, { waitUntil:'networkidle0' })
  await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70))}})
  await new Promise(r=>setTimeout(r,900))
  const d = await p.evaluate(()=>{
    const sec=[...document.querySelectorAll('section')].find(s=>/Confira mais/.test(s.innerText))
    const cards=[...sec.querySelectorAll('a[href^="/guia"]')]
    return cards.map(c=>{
      const r=c.getBoundingClientRect()
      const img=c.querySelector('img'); const ir=img.getBoundingClientRect()
      const escala=Math.max(ir.width/img.naturalWidth, ir.height/img.naturalHeight)
      // vão morto = espaço do card não coberto por nenhum filho (aproximação)
      const filhos=[...c.children].filter(e=>getComputedStyle(e).position!=='absolute')
      const usado=filhos.reduce((s,e)=>s+e.getBoundingClientRect().height,0)
      return { guia:c.getAttribute('href').replace('/guia/',''), card:Math.round(r.width)+'x'+Math.round(r.height), escalaImg:escala.toFixed(2)+'x' }
    })
  })
  const alturas=[...new Set(d.map(x=>x.card.split('x')[1]))]
  console.log(`\n${rota}`)
  d.forEach(x=>console.log(`  ${x.guia.padEnd(42)} card ${x.card.padEnd(9)} imagem ${x.escalaImg}`))
  console.log(`  => alturas iguais: ${alturas.length===1?'SIM':'NÃO ('+alturas.join(' vs ')+')'}`)
  await p.close()
}
await B.close()
