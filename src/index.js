import {run} from '@cycle/run'
import {makeDOMDriver} from '@cycle/dom'
import {App} from './app'
// import run from '@cycle/most-run'
// import 'aframe'

const main = App

const drivers = {
  DOM: makeDOMDriver('#app')
}

run(main, drivers)
