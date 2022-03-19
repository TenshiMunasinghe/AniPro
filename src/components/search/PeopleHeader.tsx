import { useLocation } from 'react-router-dom'
import SearchBarInput from '../common/SearchBarInput'

interface Props {
  heading: string
  link?: string
}

const PeopleHeader = ({ heading, link }: Props) => {
  const location = useLocation()

  return (
    <div className='w-full space-y-5 sm:max-w-sm'>
      <h5 className='text-xl'>{heading}</h5>
      <SearchBarInput
        link={link}
        placeholder={`search ${location.pathname.split('/')[2]}`}
      />
    </div>
  )
}

export default PeopleHeader
