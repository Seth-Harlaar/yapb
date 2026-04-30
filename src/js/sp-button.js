import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpButton extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-2, 0.5rem);
      font-family: var(--font-family-base);
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: var(--font-weight-medium, 500);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: var(--space-2, 0.5rem) var(--space-4, 1rem);
      border-radius: var(--radius-sm, 0.25rem);
      border: 1px solid var(--color-border);
      background: transparent;
      color: var(--color-text-subtle);
      cursor: pointer;
      transition: background var(--transition-fast, 100ms ease),
                  color var(--transition-fast, 100ms ease),
                  border-color var(--transition-fast, 100ms ease),
                  transform var(--transition-fast, 100ms ease);
      white-space: nowrap;
      user-select: none;
      line-height: 1;
    }

    button:hover {
      background: var(--color-bg-subtle);
      color: var(--color-text);
    }

    button:active {
      transform: translateY(1px);
    }

    button:disabled {
      opacity: 0.45;
      cursor: not-allowed;
      pointer-events: none;
    }

    /* Variants */
    :host([variant='primary']) button {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: var(--color-primary-contrast);
    }
    :host([variant='primary']) button:hover {
      background: var(--color-primary-hover);
      border-color: var(--color-primary-hover);
    }

    :host([variant='outline']) button {
      border-color: var(--color-text);
      color: var(--color-text);
    }
    :host([variant='outline']) button:hover {
      background: var(--color-bg-subtle);
    }

    :host([variant='ghost']) button {
      border-color: transparent;
      color: var(--color-text-subtle);
    }
    :host([variant='ghost']) button:hover {
      background: var(--color-bg-subtle);
      color: var(--color-text);
    }

    /* Sizes */
    :host([size='sm']) button {
      font-size: 0.65rem;
      padding: var(--space-1, 0.25rem) var(--space-3, 0.75rem);
    }

    :host([size='lg']) button {
      font-size: var(--font-size-sm, 0.875rem);
      padding: var(--space-3, 0.75rem) var(--space-6, 1.5rem);
    }

    :host([full]) {
      display: block;
    }
    :host([full]) button {
      width: 100%;
    }
  `

  static properties = {
    variant: { type: String, reflect: true },
    size: { type: String, reflect: true },
    full: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true },
    type: { type: String },
  }

  constructor() {
    super()
    this.type = 'button'
  }

  render() {
    return html`
      <button part="button" type=${this.type} ?disabled=${this.disabled}>
        <slot></slot>
      </button>
    `
  }
}

customElements.define('sp-button', SpButton)
