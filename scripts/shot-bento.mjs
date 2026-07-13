import puppeteer from 'puppeteer-core'
const B = await puppeteer.launch({ executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe', headless:'new', args:['--no-sandbox','--hide-scrollbars'] })
for (const [n,w] of [['desktop',1440],['mobile',390]]) {
  const p = await B.newPage(); await p.setViewport({ width:w, height:900, deviceScaleFactor:2 })
  await p.goto('http://localhost:4398/', { waitUntil:'networkidle0' })
  await p.evaluate(async()=>{const h=document.body.scrollHeight;for(let y=0;y<h;y+=300){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,80))}})
  await new Promise(r=>setTimeout(r,1000))
  const sec = await p.evaluateHandle(()=>[...document.querySelectorAll('section')].find(s=>/Tem alguma dúvida/.test(s.innerText)))
  await sec.asElement().screenshot({ path:`docs/reference/audit/bento-${n}.png` })
  console.log('ok', n); await p.close()
}
await B.close()
