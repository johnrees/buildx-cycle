import xs from 'xstream'
import config from './config'
import {div, input, span} from '@cycle/dom'

const floorArea = (width, length) => width*length

const model = sources => {

  const width$ = sources.DOM.select('input#width')
    .events('input')
    .map(ev => Number(ev.target.value))
    .startWith(config.width)

  const height$ = sources.DOM.select('input#height')
    .events('input')
    .map(ev => Number(ev.target.value))
    .startWith(config.height)

  const wallHeight$ = sources.DOM.select('input#wallHeight')
    .events('input')
    .map(ev => Number(ev.target.value))
    .startWith(config.wallHeight)

  const length$ = sources.DOM.select('input#length')
    .events('input')
    .map(ev => Number(ev.target.value))
    .startWith(config.length)

  return xs.combine(width$, height$, wallHeight$, length$)

}

const renderControls = (width, height, wallHeight, length) => {
  return [
    div({attrs: { id: 'controls'}}, [
      div([
        input({attrs: { id: 'width', value: width, type: 'range', min: 1, max: 4, step: 0.1 }}),
        span(`Width: ${width}m`)
      ]),
      div([
        input({attrs: { id: 'height', value: height, type: 'range', min: wallHeight, max: 4, step: 0.1 }}),
        span(`Height: ${height}m`)
      ]),
      div([
        input({attrs: { id: 'wallHeight', value: wallHeight, type: 'range', min: 1, max: 4, step: 0.1 }}),
        span(`wallHeight: ${wallHeight}m`)
      ]),
      div([
        input({attrs: { id: 'length', value: length, type: 'range', min: 5, max: 15, step: 1 }}),
        span(`Bays: ${length}`)
      ]),
    ]),
    div({attrs: { id: 'figures'}}, [
      span(`Floor Area: ${floorArea(width, length).toFixed(2)}m²`)
    ])
  ]
}

module.exports = { floorArea, model, renderControls }
