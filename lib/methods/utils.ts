/**
 * Helper function that resolves a Promise after the specified duration (in milliseconds)
 * @private
 */
export function sleep(durationMs: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, durationMs))
}
