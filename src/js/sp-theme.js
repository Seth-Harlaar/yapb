import { LitElement, html } from 'https://esm.sh/lit@3'

// Resolve the themes/ folder relative to this file's CDN URL.
// Works regardless of which CDN or path this file is served from.
const THEMES_URL = new URL('../themes/', import.meta.url).href

const STORAGE_KEY = 'sp-theme'

class SpTheme extends LitElement {
  static properties = {
    name: { type: String, reflect: true },
  }

  #tokensLink = null
  #themeLink = null

  constructor() {
    super()
    this.name = 'default'
  }

  connectedCallback() {
    super.connectedCallback()
    // Restore persisted theme (overrides the default / attribute value)
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) this.name = saved
    this.#tokensLink = this.#injectLink(`${THEMES_URL}default.css`, 'sp-theme-tokens')
    this.#themeLink = this.#injectLink(this.#themeHref(), 'sp-theme-active')
    // Set on <html> so all children (including <body>) inherit the variables
    document.documentElement.setAttribute('data-theme', this.name)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.#tokensLink?.remove()
    this.#themeLink?.remove()
    document.documentElement.removeAttribute('data-theme')
  }

  updated(changed) {
    if (!changed.has('name'))
      return
    document.documentElement.setAttribute('data-theme', this.name)
    localStorage.setItem(STORAGE_KEY, this.name)
    if (this.#themeLink) {
      this.#themeLink.href = this.#themeHref()
    }
  }

  #themeHref() {
    return `${THEMES_URL}${this.name}.css`
  }

  #injectLink(href, id) {
    let el = document.head.querySelector(`#${id}`)
    if (!el) {
      el = document.createElement('link')
      el.rel = 'stylesheet'
      el.id = id
      document.head.appendChild(el)
    }
    el.href = href
    return el
  }

  render() {
    return html`<slot></slot>`
  }
}

customElements.define('sp-theme', SpTheme)
