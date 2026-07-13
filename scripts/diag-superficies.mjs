import puppeteer from 'puppeteer-core'
import sharp from 'sharp'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
const hex=(r,g,b)=>'#'+[r,g,b].map(n=>n.toString(16).padStart(2,'0')).join('')
const NOME={'#ffffff':'base (branco)','#f5efdd':'surface (creme)','#fbf8ef':'surface-2','#3c5e3d':'primary (verde)'}
for (const [n,rota] of [['home','/'],['loja','/loja'],['produto','/catalogo/bobina-kraft'],['orcamento','/orcamento'],['sobre','/sobre-nos'],['contato','/fale-conosco'],['guia','/guia/como-tirar-medidas']]) {
  const p = await B.newPage(); await p.setViewport({ width:1440, height:900 })
  await p.goto('http://localhost:4424'+rota, { waitUntil:'networkidle0' })
  await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,70))};window.scrollTo(0,0)})
  await new Promise(r=>setTimeout(r,900))
  const buf = await p.screenshot({ fullPage:true })
  const {data,info}=await sharp(buf).raw().toBuffer({resolveWithObject:true})
  const px=(x,y)=>{const i=(y*info.width+x)*info.channels;return hex(data[i],data[i+1],data[i+2])}
  const faixas=[]; let ant=null
  for(let y=2;y<info.height-2;y+=6){const c=px(6,y); if(c!==ant){faixas.push([y,c]);ant=c}}
  const solidas=faixas.filter(([y],i)=>((faixas[i+1]?faixas[i+1][0]:info.height)-y)>70)
  const fora=solidas.filter(([,c])=>!NOME[c])
  console.log(`\n${n} (${info.height}px)  ${fora.length? '⚠ '+fora.length+' cor(es) FORA da paleta' : '✓ só cores da paleta'}`)
  solidas.forEach(([y,c])=>console.log(`  ${String(y).padStart(5)}px  ${c}  ${NOME[c] ?? '<<< FORA DA PALETA'}`))
  await p.close()
}
await B.close()
