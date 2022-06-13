/**
 * @param {HTMLInputElement | HTMLSelectElement} element
 * @param {string} [validationReason]
 * @returns {string}
 */
export default function getValidationMessage(element, validationReason) {
  const messages = [
    element.dataset.errorMessage,
    element.validationMessage
  ]

  if (validationReason) {
    messages.unshift(element.dataset[`${validationReason}Message`])
  }

  for (const message of messages) {
    if (message) {
      return message
    }
  }

  return ''
}
