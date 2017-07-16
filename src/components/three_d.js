import {h, div, input, span} from '@cycle/dom'
import xs from 'xstream'

import { rails, bays, floor, frames, walls, connectors } from '../parts'
import {floorArea} from '../extras/functions'
import config from '../extras/config'

export default function ThreeD(sources) {

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

  const vtree$ = xs.combine(width$, height$, wallHeight$, length$)
    .map( ([width, height, wallHeight, length]) =>
      div([
        h('a-scene', {attrs:{ stats: true }}, [
          h('a-entity', {attrs: {position: '0 0 -5'}}, [
            ...rails(width,height,length),
            ...bays(width,wallHeight,height,length)
          ])
        ]),
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
      ])
    )

  return { DOM: vtree$ }
}
