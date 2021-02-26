export const isChildOverflow = (element: HTMLElement) => {
  const rect = element.getBoundingClientRect()
  const style = getComputedStyle(element)
  const lastChild = element.lastElementChild?.getBoundingClientRect()
  if (!lastChild)
    return {
      overflow: { x: false, y: false, either: false },
      overflownAmount: { x: 0, y: 0 },
    }

  const x = lastChild.right - (rect.right - parseFloat(style.paddingRight))
  const y = lastChild.bottom - (rect.bottom - parseFloat(style.paddingBottom))

  return {
    overflow: { x: x > 0, y: y > 0, either: x > 0 || y > 0 },
    overflownAmount: { x, y },
  }
}
