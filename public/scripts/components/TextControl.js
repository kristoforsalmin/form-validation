import { controller } from '@github/catalyst'
import BaseFormControl from './BaseFormControl.js'

export default class TextControl extends BaseFormControl {
  reset() {
    super.reset()

    this.controlElement.value = this.controlElement.getAttribute('value')
  }
}

controller(TextControl)
