interface Props {
  text: string
  href: string
}

const Anchor = ({ text, href }: Props) => {
  return (
    <a
      href={href}
      className='text-zinc-900 underline underline-offset-1 hocus:text-teal-500 dark:text-zinc-400 dark:hocus:text-zinc-200'>
      {text}
    </a>
  )
}

export default Anchor
