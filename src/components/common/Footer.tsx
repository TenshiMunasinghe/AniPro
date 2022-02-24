import Link from './Link/Link'
import ThemeButton from './ThemeButton'

const Footer = () => {
  return (
    <footer className='!mt-24 w-full md:!mt-32'>
      <div className='flex items-end'>
        <section className='mr-auto flex space-x-6'>
          <ThemeButton theme='light' />
          <ThemeButton theme='dark' />
        </section>
        <Link
          to='https://github.com/TenshiMunasinghe/AniPro'
          variant='underlined'
          toExternalSite>
          GitHub
        </Link>
      </div>

      <section className='mt-6 text-right'>
        This site is a clone of{' '}
        <Link to='https://anilist.co/' variant='underlined' toExternalSite>
          AniList.co
        </Link>
      </section>
    </footer>
  )
}

export default Footer
