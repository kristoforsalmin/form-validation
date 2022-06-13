import { controller, findTarget } from '@github/catalyst'

export default class SiteRegistration extends HTMLElement {
  /** @type {import('./SiteForm').default} */
  get form() {
    return findTarget(this, 'form')
  }

  /**
   * @param {SubmitEvent} event
   */
  handleFormSubmit = (event) => {
    event.preventDefault()

    alert(`Thanks, ${this.form.formElement.elements.name.value} 😀`)

    this.form.reset()
  }
}

controller(SiteRegistration)
