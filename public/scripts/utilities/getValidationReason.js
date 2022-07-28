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

export default function getValidationReason(element) {
  for (const reason of validationReasons) {
    if (element.validity[reason]) {
      return reason
    }
  }
}
