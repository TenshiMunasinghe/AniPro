import SearchBarInput from '../common/SearchBarInput'

interface Props {
  heading: string
  link?: string
}

const PeopleHeader = ({ heading, link }: Props) => {
  return (
    <div className='w-full space-y-5 sm:max-w-sm'>
      <h5 className='text-xl'>{heading}</h5>
      <SearchBarInput link={link} placeholder='type here' />
    </div>
  )
}

export default PeopleHeader
