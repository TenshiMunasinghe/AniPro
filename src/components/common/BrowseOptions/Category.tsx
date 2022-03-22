import { IconType } from 'react-icons'
import Link from '../Link/Link'

interface LinkType {
  to: string
  text: string
}

interface Props {
  Icon: IconType
  title: LinkType
  links: LinkType[]
}

const Category = ({ Icon, title, links }: Props) => {
  return (
    <div className='grid grid-cols-[auto_1fr] grid-rows-2 items-center gap-x-2'>
      <Link to={title.to}>
        <Icon />
      </Link>
      <Link to={title.to} className='w-min'>
        {title.text}
      </Link>
      <div className='col-start-2 flex space-x-2 whitespace-nowrap text-xs'>
        {links.map(({ to, text }) => (
          <Link to={to} key={to + text}>
            {text}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Category
