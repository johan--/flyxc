import { css, CSSResult, customElement, html, internalProperty, LitElement } from 'lit-element';
import { TemplateResult } from 'lit-html';
import { connect } from 'pwa-helpers';

import { setAltitudeMultiplier } from '../../actions';
import { dispatch, RootState, store } from '../../store';
import { controlHostStyle } from '../control-style';

@customElement('exaggeration-element')
export class ExaggerationElement extends connect(store)(LitElement) {
  @internalProperty()
  multiplier = 1;

  @internalProperty()
  private expanded = false;

  static get styles(): CSSResult[] {
    return [
      controlHostStyle,
      css`
        input[type='range'] {
          width: 100px;
        }
      `,
    ];
  }

  stateChanged(state: RootState): void {
    this.multiplier = state.map.altMultiplier;
  }

  protected render(): TemplateResult {
    return html`
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/line-awesome@1/dist/line-awesome/css/line-awesome.min.css"
      />
      <label .hidden=${!this.expanded}>
        <input
          type="range"
          min="1"
          max="2.6"
          step="0.2"
          .value=${this.multiplier}
          @input=${(e: any) => dispatch(setAltitudeMultiplier(Number(e.target.value ?? 1)))}
        />
        ${this.multiplier.toFixed(1)}x
      </label>
      <i class="la la-mountain la-2x" style="cursor: pointer" @click=${() => (this.expanded = !this.expanded)}></i>
    `;
  }
}
