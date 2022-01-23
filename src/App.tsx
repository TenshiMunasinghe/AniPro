import loadable from '@loadable/component'
import debounce from 'lodash/debounce'
import { createContext, useEffect, useLayoutEffect, useMemo } from 'react'
import {
  LazyComponentProps,
  ScrollPosition,
  trackWindowScroll,
} from 'react-lazy-load-image-component'
import { QueryClient, QueryClientProvider } from 'react-query'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom'
import LoadingSpinner from './components/common/LoadingSpinner/LoadingSpinner'
import { MediaType } from './generated/index'
import {
  Theme,
  useThemeStore,
  useWindowSizeStore,
  WindowSizeStore,
} from './zustand/stores'

const Home = loadable(() => import('./pages/Home'))
const Search = loadable(() => import('./pages/Search'))
const Media = loadable(() => import('./pages/Media'))
const Character = loadable(() => import('./pages/Character'))
const Staff = loadable(() => import('./pages/Staff'))

const queryClient = new QueryClient()

export const ScrollPositionContext = createContext<ScrollPosition | undefined>(
  undefined
)

const windowSizeSelector = (state: WindowSizeStore) => state.set

export const linkToMediaPage = (id: number | undefined, type: MediaType) =>
  id ? `/media/${type.toLowerCase()}/${id}` : ''

export const linkToCharacterPage = (id: number | undefined) =>
  id ? `/character/${id}` : ''

export const linkToStaffPage = (id: number | undefined) =>
  id ? `/staff/${id}` : ''

const ScrollToTop = () => {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (pathname.split('/')[1] !== 'media') window.scrollTo(0, 0)
  }, [pathname, search])

  return null
}

const App = ({ scrollPosition }: LazyComponentProps) => {
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
      <ScrollPositionContext.Provider value={scrollPosition}>
        <Router>
          <ScrollToTop />
          <Switch>
            <Route exact path='/'>
              <Home fallback={<LoadingSpinner />} />
            </Route>

            <Route exact path='/media/:type/:id/:tab?'>
              <Media fallback={<LoadingSpinner />} />
            </Route>

            <Route exact path='/search/:type?'>
              <Search fallback={<LoadingSpinner />} />
            </Route>

            <Route exact path='/character/:id'>
              <Character fallback={<LoadingSpinner />} />
            </Route>

            <Route exact path='/staff/:id'>
              <Staff fallback={<LoadingSpinner />} />
            </Route>
          </Switch>
        </Router>
      </ScrollPositionContext.Provider>
    </QueryClientProvider>
  )
}

export default trackWindowScroll(App)
