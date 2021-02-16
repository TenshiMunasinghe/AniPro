import React, { useEffect, useLayoutEffect, useMemo } from 'react'
import loadable from '@loadable/component'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import debounce from 'lodash/debounce'

import {
  useWindowSizeStore,
  WindowSizeStore,
  useThemeStore,
  Theme,
} from './zustand/stores'
import NavBar from './components/common/NavBar/NavBar'

// import Search from './pages/search/Search'
// import Anime from './pages/anime/Anime'
// import Home from './pages/home/Home'

const Home = loadable(() => import('./pages/home/Home'))
const Search = loadable(() => import('./pages/search/Search'))
const Anime = loadable(() => import('./pages/anime/Anime'))

const selector = (state: WindowSizeStore) => state.set

const App = () => {
  const setSize = useWindowSizeStore(selector)

  const updateSize = useMemo(
    () =>
      debounce(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight })
      }, 250),
    [setSize]
  )

  useLayoutEffect(() => {
    window.addEventListener('resize', updateSize)
    updateSize()

    return () => window.removeEventListener('resize', updateSize)
  }, [updateSize])

  useEffect(() => {
    useThemeStore.subscribe(
      (state: Theme) => (document.body.className = state),
      state => state.theme
    )
  }, [])

  return (
    <>
      <Router>
        <NavBar />
        <Switch>
          <Route exact path='/anime/:id/:tab?'>
            <Anime />
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
    </>
  )
}

export default App
