import { LitElement, html, css } from 'https://esm.sh/lit@3'

class SpTag extends LitElement {
  static styles = css`
    :host {
      display: inline-block;
    }

    .tag {
      display: inline-flex;
      align-items: center;
      gap: var(--space-1, 0.25rem);
      font-family: var(--font-family-base);
      font-size: var(--font-size-xs, 0.75rem);
      font-weight: var(--font-weight-medium, 500);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      padding: var(--space-1, 0.25rem) var(--space-3, 0.75rem);
      border-radius: var(--radius-full, 9999px);
      border: 1px solid var(--color-border);
      background: var(--color-bg-subtle);
      color: var(--color-text-subtle);
      line-height: 1;
      white-space: nowrap;
    }

    /* Color variants */
    :host([color='primary']) .tag {
      background: var(--color-primary-subtle);
      border-color: var(--color-primary);
      color: var(--color-primary);
    }

    :host([color='success']) .tag {
      background: var(--color-success-subtle);
      border-color: var(--color-success);
      color: var(--color-success);
    }

    :host([color='warning']) .tag {
      background: var(--color-warning-subtle);
      border-color: var(--color-warning);
      color: var(--color-warning);
    }

    :host([color='error']) .tag {
      background: var(--color-error-subtle);
      border-color: var(--color-error);
      color: var(--color-error);
    }

    :host([color='info']) .tag {
      background: var(--color-info-subtle);
      border-color: var(--color-info);
      color: var(--color-info);
    }
  `

  static properties = {
    color: { type: String, reflect: true },
  }

  render() {
    return html`<span class="tag" part="tag"><slot></slot></span>`
  }
}

customElements.define('sp-tag', SpTag)
