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
        'absolute inset-0 bg-white dark:bg-zinc-700 bg-[color:var(--color-original)] bg-[image:var(--image-url)] bg-no-repeat bg-cover bg-center blur after:content-[""] after:absolute after:inset-0 after:bg-white/80 dark:after:bg-zinc-900/80',
        { 'hidden group-hover:block group-focus-within:block': onlyOnHover },
        blur
      )}
    />
  )
}

export default BackgroundImage
