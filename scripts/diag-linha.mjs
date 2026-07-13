import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox'] })
const p = await B.newPage(); await p.setViewport({ width:1440, height:1000 })
await p.goto('https://enlivened-pomegranate-317762-1e9fffd39.framer.app/catalogo/fita-acr%C3%ADlica-personalizada', { waitUntil:'networkidle0', timeout:90000 })
await new Promise(r=>setTimeout(r,3000))
console.log(await p.evaluate(()=>{
  const botao=[...document.querySelectorAll('button')].find(b=>b.innerText.trim()==='+')
  const out=[]
  let el=botao
  for(let i=0;i<7 && el.parentElement;i++){
    el=el.parentElement
    out.push(`nivel ${i+1}: <${el.tagName.toLowerCase()} class="${(el.className||'').toString().slice(0,40)}">  p=${el.querySelectorAll('p').length}  texto="${(el.innerText||'').trim().replace(/\n/g,' | ').slice(0,60)}"`)
  }
  return out.join('\n')
}))
await B.close()
