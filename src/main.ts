import 'normalize.css'
import './style.scss'
import hljs from 'highlight.js/lib/core'
import typescript from 'highlight.js/lib/languages/typescript'
import 'highlight.js/styles/github-dark.min.css'

hljs.registerLanguage('typescript', typescript)

const smarts = import.meta.glob<string>('./smart/*.ts', {
  as: 'raw',
  eager: true,
})

for (let name in smarts) {
  name = name.replace('./smart/', '').replace('.ts', '')
  const link = document.createElement('a')
  link.href = `#${name}`
  link.textContent = name
  document
    .querySelector<HTMLDivElement>('#page-index .links')
    ?.appendChild<HTMLAnchorElement>(link)
}

function handleRoute(route: string) {
  if (route.startsWith('#')) {
    route = route.substring(1)
  }
  if (route === '') {
    document.querySelector<HTMLDivElement>('#page-index')!.style.display =
      'block'
    document.querySelector<HTMLDivElement>('#page-smart')!.style.display =
      'none'
  } else {
    document.querySelector<HTMLDivElement>('#page-index')!.style.display =
      'none'
    document.querySelector<HTMLDivElement>('#page-smart')!.style.display =
      'flex'
    const filename = decodeURI(`./smart/${route}.ts`)
    const code = smarts[filename]
    document.querySelector<HTMLHeadingElement>('#page-smart h1')!.textContent =
      decodeURI(route)
    document.querySelector<HTMLElement>('#page-smart .code pre')!.innerHTML =
      hljs.highlight(code, { language: 'typescript' }).value
    const match = code.match(/\/\/ (BV.+)/)
    document.querySelector<HTMLAnchorElement>(
      '#page-smart a.bilibili'
    )!.href = `https://www.bilibili.com/video/${match ? match[1] : '?'}`
    document.querySelector<HTMLIFrameElement>(
      '#page-smart iframe'
    )!.src = `https://player.bilibili.com/player.html?poster=1&autoplay=0&bvid=${
      match ? match[1] : '?'
    }`
  }
}
window.addEventListener('hashchange', () => handleRoute(window.location.hash))
handleRoute(window.location.hash)
