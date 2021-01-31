import React, { useLayoutEffect, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import debounce from 'lodash/debounce'

import { Search } from './pages/search/Search'
import { Anime } from './pages/anime/Anime'
import { Home } from './pages/home/Home'
import { Header } from './components/common/Header/Header'
import { useWindowSizeStore, WindowSizeStore } from './zustand/stores'

const selector = (state: WindowSizeStore) => state.set

export const App = () => {
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

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path='/anime/:id'>
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
