const validationReasons = [
  'badInput',
  'customError',
  'patternMismatch',
  'rangeOverflow',
  'rangeUnderflow',
  'stepMismatch',
  'tooLong',
  'tooShort',
  'typeMismatch',
  'valueMissing'
]

/**
 * @param {HTMLInputElement | HTMLSelectElement} element
 * @returns {?string}
 */
export default function getValidationReason(element) {
  for (const reason of validationReasons) {
    if (element.validity[reason]) {
      return reason
    }
  }
}
