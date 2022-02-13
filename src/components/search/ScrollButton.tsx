import { FaCaretUp } from 'react-icons/fa'

const handleClick = () => {
  window.scrollTo(0, 0)
}

const ScrollButton = () => {
  return (
    <button
      className='fixed bottom-5 right-5 z-50 grid h-14 w-14 place-content-center rounded bg-zinc-300 leading-none opacity-70 hocus:bg-zinc-200 dark:bg-zinc-700 dark:hocus:bg-zinc-600'
      onClick={handleClick}
      aria-label='scroll to the top'>
      <FaCaretUp aria-label='caret up' className='h-7 w-7' />
    </button>
  )
}

export default ScrollButton
