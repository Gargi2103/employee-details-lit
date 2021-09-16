import { __decorate } from "tslib";
import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';
export class DemoProject extends LitElement {
    constructor() {
        super(...arguments);
        this.title = 'Hey there';
        this.counter = 5;
    }
    __increment() {
        this.counter += 1;
    }
    render() {
        return html `
      <h2>${this.title} Nr. ${this.counter}!</h2>
      <button @click=${this.__increment}>increment</button>
    `;
    }
}
DemoProject.styles = css `
    :host {
      display: block;
      padding: 25px;
      color: var(--demo-project-text-color, #000);
    }
  `;
__decorate([
    property({ type: String })
], DemoProject.prototype, "title", void 0);
__decorate([
    property({ type: Number })
], DemoProject.prototype, "counter", void 0);
//# sourceMappingURL=DemoProject.js.map