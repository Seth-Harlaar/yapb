import { LitElement, html, css } from 'https://esm.sh/lit@3'

const THEMES = ['default', 'dark', 'carnival', 'manuscript']

class SpNav extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    :host([sticky]) {
      position: sticky;
      top: 0;
      z-index: var(--z-raised, 10);
    }

    nav {
      display: flex;
      align-items: center;
      gap: var(--space-6, 1.5rem);
      padding: var(--space-4, 1rem) var(--space-6, 1.5rem);
      border-bottom: 1px solid var(--color-border);
      background: var(--color-bg);
    }

    :host([sticky]) nav {
      background: color-mix(in srgb, var(--color-bg) 88%, transparent);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
    }

    .brand {
      display: flex;
      align-items: center;
      flex-shrink: 0;
    }

    .links {
      display: flex;
      align-items: center;
      gap: var(--space-4, 1rem);
      flex: 1;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: var(--space-3, 0.75rem);
      flex-shrink: 0;
    }

    .theme-switcher {
      display: flex;
      align-items: center;
      margin-left: auto;
      flex-shrink: 0;
    }

    .theme-select {
      appearance: none;
      -webkit-appearance: none;
      background: var(--color-bg-subtle, #f8fafc);
      border: 1px solid var(--color-border, #e2e8f0);
      border-radius: var(--radius-md, 0.375rem);
      color: var(--color-text-subtle, #475569);
      font-family: var(--font-family-base, sans-serif);
      font-size: var(--font-size-sm, 0.875rem);
      padding: 0.25rem 1.75rem 0.25rem 0.625rem;
      cursor: pointer;
      transition: border-color var(--transition-fast, 100ms ease),
                  color var(--transition-fast, 100ms ease);
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'%3E%3Cpath d='M1 1l4 4 4-4' stroke='%2394a3b8' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.5rem center;
    }

    .theme-select:hover:not(:disabled) {
      border-color: var(--color-border-strong, #94a3b8);
      color: var(--color-text, #0f172a);
    }

    .theme-select:focus-visible {
      outline: 2px solid var(--color-primary, #2563eb);
      outline-offset: 2px;
    }

    .theme-select:disabled {
      opacity: 0.35;
      cursor: not-allowed;
    }
  `

  static properties = {
    sticky:   { type: Boolean, reflect: true },
    _current: { state: true },
    _disabled: { state: true },
  }

  constructor() {
    super()
    this._current  = 'default'
    this._disabled = false
  }

  connectedCallback() {
    super.connectedCallback()
    const themeEl = document.querySelector('sp-theme')
    if (!themeEl) {
      this._disabled = true
    } else {
      this._current  = themeEl.name || 'default'
      this._disabled = false
    }
  }

  _handleThemeChange(e) {
    const themeEl = document.querySelector('sp-theme')
    if (!themeEl) return
    themeEl.name  = e.target.value
    this._current = e.target.value
  }

  render() {
    return html`
      <nav part="nav">
        <div class="brand" part="brand">
          <slot name="brand"></slot>
        </div>
        <div class="links" part="links">
          <slot></slot>
        </div>
        <div class="actions" part="actions">
          <slot name="actions"></slot>
        </div>
        <div class="theme-switcher" part="theme-switcher">
          <select
            class="theme-select"
            ?disabled=${this._disabled}
            title=${this._disabled ? 'Add an sp-theme element to enable theme switching' : 'Switch theme'}
            @change=${this._handleThemeChange}
          >
            ${THEMES.map(t => html`
              <option value=${t} ?selected=${t === this._current}>${t}</option>
            `)}
          </select>
        </div>
      </nav>
    `
  }
}

customElements.define('sp-nav', SpNav)
