import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useForm, FormProvider } from 'react-hook-form'

import { useWindowResize } from './hooks/useWindowResize'
import { Search } from './pages/search/Search'
import { Anime } from './pages/anime/Anime'
import { Home } from './pages/home/Home'
import { Header } from './components/Header/Header'
import { Filters } from './components/Filters/Filters'

export const App = () => {
  const methods = useForm({ defaultValues: { searchText: '' } })
  useWindowResize()

  return (
    <>
      <Header />
      <Router>
        <Switch>
          <Route exact path='/anime/:id'>
            <Anime />
          </Route>
          <Route path='/'>
            <FormProvider {...methods}>
              <div id='container'>
                <Filters />
                <Route exact path='/'>
                  <Home />
                </Route>
                <Route exact path='/search'>
                  <Search />
                </Route>
              </div>
            </FormProvider>
          </Route>
        </Switch>
      </Router>
    </>
  )
}
