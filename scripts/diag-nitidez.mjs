import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
await p.goto('http://localhost:4400/', { waitUntil:'networkidle0' })
await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}})
await new Promise(r=>setTimeout(r,900))
const r = await p.evaluate(()=>[...document.querySelectorAll('img')]
  .filter(i=>/guias\//.test(i.currentSrc||i.src))
  .map(i=>{
    const b=i.getBoundingClientRect()
    const fit=getComputedStyle(i).objectFit
    // cover = escala pelo MAIOR eixo (e corta o outro); contain = pelo menor
    const sx=b.width/i.naturalWidth, sy=b.height/i.naturalHeight
    const escala = fit==='contain' ? Math.min(sx,sy) : Math.max(sx,sy)
    const cortaPct = fit==='cover' ? Math.round((1 - Math.min(sx,sy)/escala)*100) : 0
    return {
      img:(i.currentSrc||i.src).split('/').pop(),
      nativo:i.naturalWidth+'x'+i.naturalHeight,
      exibido:Math.round(b.width)+'x'+Math.round(b.height),
      fit,
      escalaReal:escala.toFixed(2)+'x',
      cortaDaImagem:cortaPct+'%',
      veredito: escala>1.6?'BORRA':escala>1.25?'levemente suave':'nítida',
    }
  }))
r.forEach(x=>console.log(`${x.img.padEnd(20)} nativo ${x.nativo.padEnd(9)} exibido ${x.exibido.padEnd(9)} ${x.fit.padEnd(8)} escala ${x.escalaReal.padEnd(6)} corta ${x.cortaDaImagem.padEnd(4)} => ${x.veredito}`))
await B.close()
