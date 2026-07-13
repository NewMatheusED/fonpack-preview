import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:900, deviceScaleFactor:2 })
await p.goto('https://enlivened-pomegranate-317762-1e9fffd39.framer.app/', { waitUntil:'networkidle0', timeout:90000 })
await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}})
await new Promise(r=>setTimeout(r,2500))
const r = await p.evaluate(()=>[...document.querySelectorAll('img')]
  .filter(i=>/ViWLkhKD|Ib46Ez3|IW0By33/.test(i.src||''))
  .map(i=>({ hash:(i.src.match(/images\/(\w+)/)||[])[1], natural:i.naturalWidth+'x'+i.naturalHeight, exibido:Math.round(i.getBoundingClientRect().width)+'px', srcset:(i.srcset||'(sem srcset)').slice(0,220) })))
console.log(JSON.stringify(r,null,1))
await B.close()
