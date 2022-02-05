import classnames from 'classnames'
import { CSSProperties } from 'react'

interface Props {
  src: string | null | undefined
  blur?: 'blur' | 'blur-sm' | 'blur-md' | 'blur-xl' | 'blur-none'
  onlyOnHover?: boolean
}

const BackgroundImage = ({
  src,
  blur = 'blur',
  onlyOnHover = false,
}: Props) => {
  if (!src) return null

  const style = { '--image-url': `url(${src})` } as CSSProperties

  return (
    <div
      style={style}
      className={classnames(
        'absolute inset-0 bg-white bg-[color:var(--color-original)] bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat blur after:absolute after:inset-0 after:bg-white/80 after:content-[""] dark:bg-zinc-700 dark:after:bg-zinc-900/80',
        { 'hidden group-focus-within:block group-hover:block': onlyOnHover },
        blur
      )}
    />
  )
}

export default BackgroundImage
