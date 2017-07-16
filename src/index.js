import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'

// import App from './components/three_d'
import App from './components/svg'

const main = App

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
