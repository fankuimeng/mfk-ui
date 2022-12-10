import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import styles from './style';

@customElement('mfk-button')
class MfkButton extends LitElement {
  static styles = styles;

  @property({
    type: Boolean,
  })
  disabled = false;

  @property()
  size!: string;

  @property()
  type = '';

  @property()
  icon: string | undefined = undefined;

  @property()
  shape!: string;

  @property({
    type: Boolean,
  })
  loading = false;

  @property()
  loadtype!: string;

  @property()
  loadingcolor!: string;

  @property()
  loadingsize!: number;

  @property({
    type: Boolean,
  })

  //   handleIncrease() {
  //     this.value = Math.min(this.value + 1, this.max);
  //     this.requestUpdate();
  //     emit(this, 'myChange', {
  //       detail: {
  //         value: this.value,
  //       },
  //     });
  //   }
  //   handleReduce() {
  //     this.value = Math.max(this.value - 1, this.min);
  //     this.requestUpdate();
  //     emit(this, 'myChange', {
  //       detail: {
  //         value: this.value,
  //       },
  //     });
  //   }
  render() {
    return html`
      <div class="mfk-button">
        <slot></slot>
      </div>
    `;
  }
}

function emit(el: HTMLElement, name: string, options?: CustomEventInit) {
  const event = new CustomEvent(
    name,
    Object.assign(
      {
        bubbles: true,
        cancelable: false,
        composed: true,
        detail: {},
      },
      options,
    ),
  );
  el.dispatchEvent(event);
  return event;
}

export default MfkButton;
