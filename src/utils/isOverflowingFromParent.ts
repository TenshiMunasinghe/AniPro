import { toStartCase } from './toStartCase'

type Directions = 'top' | 'bottom' | 'left' | 'right'
const allDirections: Directions[] = ['top', 'bottom', 'left', 'right']

export type IsOverflowingFromParent = (
  element: HTMLElement,
  directions?: Directions[] | 'all'
) =>
  | {
      top?: boolean
      bottom?: boolean
      left?: boolean
      right?: boolean
      any: boolean
    }
  | undefined

export const isOverflowingFromParent: IsOverflowingFromParent = (
  element,
  directions = 'all'
) => {
  const parentElm = element.parentElement
  if (!parentElm) return

  const parent = {
    rect: parentElm.getBoundingClientRect(),
    style: getComputedStyle(parentElm as HTMLElement),
  }
  const childRect = element.getBoundingClientRect()

  const overflow = Object.fromEntries(
    (directions === 'all' ? allDirections : directions).map(direction => {
      const childVal = childRect[direction]
      const parentVal = parent.rect[direction]
      const key = ('padding' +
        toStartCase(direction)) as keyof typeof parent.style
      const padding = parseFloat(parent.style[key] as string)

      const difference =
        direction === 'top' || direction === 'left'
          ? childVal - parentVal - padding
          : parentVal - padding - childVal

      const isOverflow = difference < 0

      const isSignificant = Math.abs(difference) > 0.1

      return [direction, isOverflow && isSignificant]
    })
  )

  console.log(overflow)

  return { ...overflow, any: Object.values(overflow).some(val => val) }
}
