import { useState } from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

interface Props {
  src: string
  fallbackSrc?: string
  alt: string
  [key: string]: any
}

interface State {
  src: string
  isError: boolean
}

const defaultFallbackSrc =
  'https://upload.wikimedia.org/wikipedia/commons/4/41/Noimage.svg'

const Image = <T extends Props>({
  fallbackSrc = defaultFallbackSrc,
  imageRef,
  ...props
}: T) => {
  const [state, setState] = useState<State>({ src: props.src, isError: false })

  const handleError = () => {
    setState({
      src: fallbackSrc,
      isError: true,
    })
  }

  const { src: _1, fallbackSrc: _2, alt: _3, ..._props } = props
  return (
    <LazyLoadImage
      src={state.src}
      alt={props.alt}
      onError={handleError}
      {..._props}
    />
  )
}

export default Image
