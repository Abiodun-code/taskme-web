export const truncateText = (text: string | undefined | null, maxLength: number): string => {
  if (!text) return ""  // safeguard against null/undefined
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + "..."
  }
  return text
}
