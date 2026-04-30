import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpCard extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .card {
      background: var(--color-bg-raised);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg, 0.5rem);
      padding: var(--space-4, 1rem) var(--space-5, 1.25rem);
      overflow: hidden;
      position: relative;
    }

    :host([accent]) .card::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 3px;
      background: var(--sp-card-accent, var(--color-primary));
    }

    :host([interactive]) .card {
      cursor: pointer;
      transition: transform var(--transition-normal, 200ms ease),
                  border-color var(--transition-normal, 200ms ease),
                  box-shadow var(--transition-normal, 200ms ease);
    }

    :host([interactive]) .card:hover {
      transform: translateY(-2px);
      border-color: var(--color-border-strong);
      box-shadow: var(--shadow-md);
    }
  `

  static properties = {
    interactive: { type: Boolean, reflect: true },
    accent: { type: Boolean, reflect: true },
  }

  render() {
    return html`<div class="card" part="card"><slot></slot></div>`
  }
}

customElements.define('sp-card', SpCard)
