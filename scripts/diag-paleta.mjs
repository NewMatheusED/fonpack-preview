import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
import fs from 'node:fs'

const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const BASE='https://enlivened-pomegranate-317762-1e9fffd39.framer.app'
const hex=(r,g,b)=>'#'+[r,g,b].map(n=>n.toString(16).padStart(2,'0')).join('')
fs.mkdirSync('docs/reference/audit/paleta',{recursive:true})

for (const [nome, rota] of [['loja','/loja'],['produto','/catalogo/bobina-kraft'],['sobre','/sobre-n%C3%B3s'],['contato','/fale-conosco'],['guia','/guia/como-tirar-medidas']]) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
  await p.goto(BASE+rota, { waitUntil:'networkidle0', timeout:90000 })
  await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70))};window.scrollTo(0,0)})
  await new Promise(r=>setTimeout(r,2000))
  await p.evaluate(()=>{for(const el of document.querySelectorAll('body > div, body > a')){const t=el.textContent||'';if(/BUY LICENCE|Made in Framer|Framer Commerce|FRAMESHIP/i.test(t)&&el.id!=='main')el.remove()}})
  const arq=`docs/reference/audit/paleta/${nome}.png`
  await p.screenshot({ path:arq, fullPage:true })
  const { data, info } = await sharp(arq).raw().toBuffer({resolveWithObject:true})
  const px=(x,y)=>{const i=(y*info.width+x)*info.channels; return hex(data[i],data[i+1],data[i+2])}
  const faixas=[]; let ant=null
  for(let y=2;y<info.height-2;y+=6){ const c=px(8,y); if(c!==ant){ faixas.push([y,c]); ant=c } }
  // só as faixas que persistem (ignora ruído de foto)
  const solidas=faixas.filter(([y],i)=> (faixas[i+1]?faixas[i+1][0]:info.height) - y > 60)
  console.log(`\n=== ${nome} (${info.width}x${info.height}) ===`)
  solidas.forEach(([y,c])=>console.log(String(y).padStart(5)+'px  '+c))
  await p.close()
}
await B.close()
