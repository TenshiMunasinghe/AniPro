import debounce from 'lodash/debounce'
import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import loadable from '@loadable/component'

import NavBar from './components/common/NavBar/NavBar'
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
        <NavBar />
        <Switch>
          <Route exact path='/media/:id'>
            <Media />
          </Route>
          <Route path='/'>
            <div id='container'>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/search'>
                <Search />
              </Route>
            </div>
          </Route>
        </Switch>
      </Router>
    </QueryClientProvider>
  )
}

export default App
