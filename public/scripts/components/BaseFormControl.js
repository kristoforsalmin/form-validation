import { findTarget } from '@github/catalyst'

import getValidationMessage from '../utilities/getValidationMessage.js'
import getValidationReason from '../utilities/getValidationReason.js'

/**
 * Abstract class providing common validation logic
 * built on top of Constraint Validation API for controls
 * consisting of a single input (or select) and an optional message.
 *
 * @implements {import('./FormControl').FormControl}
 */
export default class BaseFormControl extends HTMLElement {
  isDirty = false

  /** @type {HTMLInputElement | HTMLSelectElement} */
  get controlElement() {
    return findTarget(this, 'controlElement')
  }

  /** @type {?HTMLElement} */
  get message() {
    return findTarget(this, 'message')
  }

  connectedCallback() {
    this.controlElement.addEventListener('blur', this.handleBlur)
    this.controlElement.addEventListener('input', this.handleInput)
    this.controlElement.addEventListener('invalid', this.handleInvalid)
  }

  validate() {
    this.controlElement.checkValidity()
  }

  async isValid() {
    return this.controlElement.validity.valid
  }

  reset() {
    this.markValid()

    this.isDirty = false
  }

  markValid() {
    this.controlElement.classList.remove('is-invalid')

    if (this.message) {
      this.hideMessage()
    }
  }

  markInvalid() {
    this.controlElement.classList.add('is-invalid')

    if (this.message) {
      this.showMessage()
    }
  }

  showMessage() {
    this.message.classList.remove('u-hidden')
    this.message.textContent = getValidationMessage(this.controlElement, getValidationReason(this.controlElement))
    this.controlElement.setAttribute('aria-describedby', this.message.id)
  }

  hideMessage() {
    this.message.classList.add('u-hidden')
    this.message.textContent = ''
    this.controlElement.removeAttribute('aria-describedby')
  }

  handleBlur = async () => {
    if (await this.isValid()) {
      this.markValid()
    } else if (this.isDirty) {
      this.markInvalid()
    }
  }

  handleInput = async () => {
    this.isDirty = true

    if (await this.isValid()) {
      this.markValid()
    }
  }

  /**
   * @param {Event} event
   */
  handleInvalid = (event) => {
    event.preventDefault()

    this.isDirty = true

    this.markInvalid()
  }
}
