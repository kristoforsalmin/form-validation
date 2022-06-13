import { attr, controller } from '@github/catalyst'

import TextControl from './TextControl.js'

const attrs = [
  'sameAs'
]

export default class ConfirmationTextControl extends TextControl {
  sameAs = ''

  /** @type {?HTMLInputElement | HTMLSelectElement} */
  get referenceElement() {
    return document.getElementById(this.sameAs)
  }

  connectedCallback() {
    super.connectedCallback()

    this.referenceElement?.addEventListener('blur', this.handleBlur)
  }

  async isValid() {
    if (this.controlElement.value === this.referenceElement?.value) {
      this.controlElement.setCustomValidity('')
    } else {
      this.controlElement.setCustomValidity('Entered value does not match the value of the reference field.')
    }

    return super.isValid()
  }
}

for (const name of attrs) {
  attr(ConfirmationTextControl.prototype, name)
}

controller(ConfirmationTextControl)
