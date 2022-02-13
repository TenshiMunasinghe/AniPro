interface Props {
  text: string
  href: string
}

const Anchor = ({ text, href }: Props) => {
  return (
    <a
      href={href}
      className='underline underline-offset-1 hocus:text-teal-500 dark:hocus:text-zinc-100'>
      {text}
    </a>
  )
}

export default Anchor

//TODO: add variants
