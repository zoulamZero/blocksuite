/// <reference types="vite/client" />
import { css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { type BlockHost, NonShadowLitElement } from '../__internal__/index.js';
import { BlockChildrenContainer } from '../__internal__/service/components.js';
import { tryUpdateFrameSize } from '../page-block/index.js';
import type { FrameBlockModel } from './frame-model.js';

@customElement('affine-frame')
export class FrameBlockComponent extends NonShadowLitElement {
  static styles = css`
    .affine-frame-block-container.selected {
      background-color: var(--affine-selected-color);
    }
  `;

  @property()
  model!: FrameBlockModel;

  @property()
  host!: BlockHost;

  firstUpdated() {
    this.model.propsUpdated.on(() => this.requestUpdate());
    this.model.childrenUpdated.on(() => this.requestUpdate());
  }

  render() {
    const childrenContainer = BlockChildrenContainer(
      this.model,
      this.host,
      () => {
        this.requestUpdate();
        tryUpdateFrameSize(this.host.page, 1);
      }
    );

    return html`
      <div class="affine-frame-block-container">${childrenContainer}</div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'affine-frame': FrameBlockComponent;
  }
}
