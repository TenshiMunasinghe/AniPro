import Dropdown, { DropdownProps } from '../common/Dropdown/Dropdown'

interface Props {
  dropdowns: DropdownProps[]
}

const Dropdowns = ({ dropdowns }: Props) => {
  return (
    <div className='flex justify-end space-x-5'>
      {dropdowns.map((prop, idx) => (
        <Dropdown key={idx.toString() + prop.options.toString()} {...prop} />
      ))}
    </div>
  )
}

export default Dropdowns
