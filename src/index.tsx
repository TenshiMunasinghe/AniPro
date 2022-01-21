/// <reference types="@welldone-software/why-did-you-render" />
import 'chartist/dist/chartist.min.css'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './css/index.scss'
import './index.css'
import * as serviceWorker from './serviceWorker'
import './wdyr.ts'

ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
