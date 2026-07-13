import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
await p.goto('http://localhost:4398/', { waitUntil:'networkidle0' })
await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}})
await new Promise(r=>setTimeout(r,900))
console.log(JSON.stringify(await p.evaluate(()=>{
  const sec=[...document.querySelectorAll('section')].find(s=>/Tem alguma dúvida/.test(s.innerText))
  const cards=[...sec.querySelectorAll('a[href^="/guia"]')]
  return cards.map(c=>{
    const r=c.getBoundingClientRect()
    const img=c.querySelector('img'); const ir=img.getBoundingClientRect()
    const conteudo=[...c.children].reduce((s,el)=>s+el.getBoundingClientRect().height,0)
    return {
      guia:c.getAttribute('href').replace('/guia/',''),
      card:Math.round(r.width)+'x'+Math.round(r.height),
      imagem:Math.round(ir.width)+'x'+Math.round(ir.height),
      alturaDoConteudo:Math.round(conteudo),
      vaoMorto:Math.round(r.height-conteudo),
    }
  })
}), null, 1))
await B.close()
