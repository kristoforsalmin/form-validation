import { controller, findTarget, findTargets } from '@github/catalyst'

export default class SiteForm extends HTMLElement {
  get formElement() {
    return findTarget(this, 'formElement')
  }

  get controls() {
    return findTargets(this, 'controls')
  }

  connectedCallback() {
    this.formElement.addEventListener('invalid', this.handleInvalid)
  }

  validate() {
    for (const control of this.controls) {
      control.validate()
    }
  }

  async isValid() {
    const validityStates = await Promise.all(this.controls.map((control) => control.isValid()))

    return validityStates.every((state) => state)
  }

  reset() {
    this.formElement.reset()

    for (const control of this.controls) {
      control.reset()
    }
  }

  handleInvalid = () => {
    this.validate()
  }
}

controller(SiteForm)
