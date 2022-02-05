import classnames from 'classnames'
import { Theme, ThemeStore, useThemeStore } from '../../zustand/stores'

interface Props {
  theme: Theme
}

const STYLES = {
  light: 'bg-white text-zinc-700',
  dark: 'bg-zinc-800 text-zinc-300',
}

const themeSelector = ({ set }: ThemeStore) => set

const ThemeButton = ({ theme }: Props) => {
  const setTheme = useThemeStore(themeSelector)

  return (
    <button
      className={classnames(
        'relative h-9 w-9 rounded-sm border-2 border-solid border-zinc-400 transition-all hocus:border-teal-400',
        STYLES[theme]
      )}
      aria-label={`${theme} theme`}
      title={theme}
      onClick={() => setTheme({ theme })}>
      <span className='absolute left-1 bottom-1 leading-none'>A</span>
    </button>
  )
}

export default ThemeButton
