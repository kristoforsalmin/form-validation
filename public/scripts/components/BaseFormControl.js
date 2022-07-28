import { findTarget } from '@github/catalyst'
import getValidationMessage from '../utilities/getValidationMessage.js'
import getValidationReason from '../utilities/getValidationReason.js'

export default class BaseFormControl extends HTMLElement {
  static attrPrefix = ''

  isDirty = false

  get controlElement() {
    return findTarget(this, 'controlElement')
  }

  get errorMessage() {
    return findTarget(this, 'errorMessage')
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

    if (this.errorMessage) {
      this.hideErrorMessage()
    }
  }

  markInvalid() {
    this.controlElement.classList.add('is-invalid')

    if (this.errorMessage) {
      this.showErrorMessage()
    }
  }

  showErrorMessage() {
    this.errorMessage.textContent = getValidationMessage(this.controlElement, getValidationReason(this.controlElement))
    this.controlElement.setAttribute('aria-describedby', this.errorMessage.id)
  }

  hideErrorMessage() {
    this.errorMessage.textContent = ''
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

  handleInvalid = (event) => {
    event.preventDefault()

    this.isDirty = true

    this.markInvalid()
  }
}
