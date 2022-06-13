export interface FormControl {
  /**
   * Trigger validation with visual feedback
   */
  validate(): void

  /**
   * Check whether control satisfies validation constraints
   */
  isValid(): Promise<boolean>

  /**
   * Reset control to its default state
   */
  reset(): void
}
