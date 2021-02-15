export const isChildOverflow = (element: HTMLElement) => {
  const x = element.scrollWidth - element.clientWidth
  const y = element.scrollHeight - element.clientHeight

  return {
    overflow: { x: x > 0, y: y > 0, either: x > 0 || y > 0 },
    overflownAmount: { x, y },
  }
}
