import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })

const hex = (rgb) => {
  const m = rgb.match(/\d+/g); if(!m) return rgb
  return '#'+m.slice(0,3).map(n=>(+n).toString(16).padStart(2,'0')).join('')
}

// Amostra a cor do pixel no meio de faixas horizontais da página inteira.
async function perfil(url, nome) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
  await p.goto(url, { waitUntil:'networkidle0', timeout:90000 })
  await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}; window.scrollTo(0,0)})
  await new Promise(r=>setTimeout(r,2000))
  const r = await p.evaluate(()=>{
    const secoes=[...document.querySelectorAll('body section, body footer, body header')]
    return secoes.map(s=>{
      const cs=getComputedStyle(s)
      const txt=(s.innerText||'').trim().replace(/\s+/g,' ').slice(0,42)
      return { tag:s.tagName.toLowerCase(), bg:cs.backgroundColor, txt }
    }).filter(x=>x.bg!=='rgba(0, 0, 0, 0)')
  })
  const body = await p.evaluate(()=>getComputedStyle(document.body).backgroundColor)
  console.log(`\n=== ${nome} ===`)
  console.log('body:'.padEnd(10), hex(body))
  r.forEach(x=>console.log(`${x.tag.padEnd(8)} ${hex(x.bg).padEnd(9)} ${x.txt}`))
  await p.close()
}

await perfil('https://enlivened-pomegranate-317762-1e9fffd39.framer.app/', 'MODELO (framer)')
await perfil('http://localhost:4410/', 'O MEU')
await B.close()
