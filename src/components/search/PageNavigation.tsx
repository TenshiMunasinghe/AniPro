import classnames from 'classnames'
import { useUpdateUrlParam } from '../../hooks/useUpdateUrlParam'

interface Props {
  page: number
  text: string
  isCurrent?: boolean
}

const PageNavigation = ({ page, text, isCurrent = false }: Props) => {
  const { movePage } = useUpdateUrlParam()

  const onClick = !isCurrent ? () => movePage(page) : () => {}
  return (
    <button
      className={classnames(
        'h-12 w-12 rounded-sm bg-zinc-100 transition-all dark:bg-zinc-600',
        {
          'cursor-default opacity-50': isCurrent,
          ' hocus:bg-zinc-200  dark:hocus:bg-zinc-500': !isCurrent,
        }
      )}
      onClick={onClick}>
      {text}
    </button>
  )
}

export default PageNavigation
