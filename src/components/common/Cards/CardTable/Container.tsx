import classnames from 'classnames'
import { FC, HTMLAttributes } from 'react'

const Container: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...prop
}) => {
  return (
    <article
      className={classnames(
        'flex overflow-hidden rounded-sm bg-zinc-100 dark:bg-zinc-700',
        className
      )}
      {...prop}>
      {children}
    </article>
  )
}

export default Container
