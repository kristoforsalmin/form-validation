import { controller, findTarget } from '@github/catalyst'

export default class SiteRegistration extends HTMLElement {
  get form() {
    return findTarget(this, 'form')
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    alert(`Thanks, ${this.form.formElement.elements.name.value} 😀`)

    this.form.reset()
  }
}

controller(SiteRegistration)
