import loadable from '@loadable/component'
import debounce from 'lodash/debounce'
import { useEffect, useLayoutEffect, useMemo } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import {
  Theme,
  useThemeStore,
  useWindowSizeStore,
  WindowSizeStore,
} from './zustand/stores'

const Home = loadable(() => import('./pages/home/Home'))
const Search = loadable(() => import('./pages/search/Search'))
const Media = loadable(() => import('./pages/media/Media'))

const queryClient = new QueryClient()

const windowSizeSelector = (state: WindowSizeStore) => state.set

export const linkToMediaPage = (id: number) => `/media/${id}`

const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

const App = () => {
  const setSize = useWindowSizeStore(windowSizeSelector)
  const updateSize = useMemo(
    () =>
      debounce(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }, 250),
    [setSize]
  )

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])

  useEffect(() => {
    useThemeStore.subscribe(
      (state: Theme) => (document.body.className = state),
      state => state.theme
    )
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ScrollToTop />
        <Switch>
          <Route exact path='/media/:id'>
            <Media />
          </Route>
          <Route path='/'>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/search'>
              <Search />
            </Route>
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
