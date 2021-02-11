export const checkElementOverflow = (element?: HTMLElement) => {
  if (!element) return

  const _parent = element.parentElement
  const parent = {
    rect: _parent?.getBoundingClientRect(),
    style: getComputedStyle(_parent as HTMLElement),
  }
  const childRect = element.getBoundingClientRect()

  if (!parent.rect || !childRect) return

  const overflow = {
    top: childRect.top < parent.rect.top + parseFloat(parent.style.paddingTop),
    bottom:
      childRect.bottom >
      parent.rect.bottom - parseFloat(parent.style.paddingBottom),
    left:
      childRect.left < parent.rect.left + parseFloat(parent.style.paddingLeft),
    right:
      childRect.right >
      parent.rect.right - parseFloat(parent.style.paddingRight),
  }

  return Object.values(overflow).some(val => val === true)
}
