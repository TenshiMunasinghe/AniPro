import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { RecoilRoot } from 'recoil'

import Search from './pages/search/Search'
import Header from './components/Header/Header'

const App = () => {
  return (
    <RecoilRoot>
      <Header />
      <Router>
        <Switch>
          <Route exact path='/'>
            <Redirect to='/search' />
          </Route>
          <Route exact path='/search'>
            <Search />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  )
}

export default App
