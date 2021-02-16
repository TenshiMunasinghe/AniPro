import { useState, useEffect } from 'react'
import { isOverflowingFromParent } from '../utils/isOverflowingFromParent'
import { useResizeDetector } from 'react-resize-detector'

interface UseFitTextArgs {
  min: number
  max: number
  resolution: number
}

export const useFitText = ({ min, max, resolution }: UseFitTextArgs) => {
  const { width, ref } = useResizeDetector({
    refreshMode: 'debounce',
    refreshRate: 250,
  })

  const [state, setState] = useState({
    fontSize: max,
    fontSizePrev: min,
    fontSizeMax: max,
    fontSizeMin: min,
  })
  const { fontSize, fontSizeMax, fontSizeMin, fontSizePrev } = state

  useEffect(() => {
    const isDone = Math.abs(fontSize - fontSizePrev) <= resolution

    const isOverflow =
      isOverflowingFromParent(ref.current as HTMLElement)?.any && !width

    const isAsc = fontSize > fontSizePrev

    // return if the font size has been adjusted "enough" (change within RESOLUTION)
    // reduce font size by one increment if it's overflowing
    if (isDone) {
      if (isOverflow) {
        const fontSizeNew =
          fontSizePrev < fontSize
            ? fontSizePrev
            : fontSize - (fontSizePrev - fontSize)
        setState({
          fontSize: fontSizeNew,
          fontSizeMax,
          fontSizeMin,
          fontSizePrev,
        })
      }
      return
    }

    // binary search to adjust font size
    let delta
    let newMax = fontSizeMax
    let newMin = fontSizeMin
    if (isOverflow) {
      delta = isAsc ? fontSizePrev - fontSize : fontSizeMin - fontSize
      newMax = Math.min(fontSizeMax, fontSize)
    } else {
      delta = isAsc ? fontSizeMax - fontSize : fontSizePrev - fontSize
      newMin = Math.max(fontSizeMin, fontSize)
    }
    setState({
      fontSize: fontSize + delta / 2,
      fontSizeMax: newMax,
      fontSizeMin: newMin,
      fontSizePrev: fontSize,
    })
  }, [fontSize, fontSizeMax, fontSizeMin, fontSizePrev, ref, resolution, width])

  return { fontSize: `${fontSize}em`, ref }
}
