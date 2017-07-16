import {h, div, input, span} from '@cycle/dom'
import {rails, bays, floor, frames, walls, connectors} from '../parts'
import {model} from '../extras/functions'

export default function SVG(sources) {

  const vtree$ = model(sources)
    .map(([width, height, wallHeight, length]) =>
      div([
        h('svg', {attrs:{ xmlns: 'http://www.w3.org/2000/svg', width: 600, height: 600 }}, [
          h('path', {attrs: { fill: 'red', d: `M 0,0 L ${width*100},0 ${width*100},${height*100} 0,${height*100}z` }},)
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
          ])
        ])
      ])
    )

  return { DOM: vtree$ }
}
