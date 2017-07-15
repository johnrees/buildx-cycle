import {h, div, input} from '@cycle/dom'
import xs from 'xstream'

export function App (sources) {

  const width$ = sources.DOM.select('input#width')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(1.5)

  const height$ = sources.DOM.select('input#height')
    .events('input')
    .map(ev => ev.target.value)
    .startWith(3)

  const vtree$ = xs.combine(width$, height$)
    .map( ([width, height]) =>
      div([
        h('a-scene', {attrs:{ stats: true }}, [
          h('a-box', {
            attrs: {
              position: `0 0 -10`,
              width: width,
              height: height,
              color: 'red'
            }
          })
        ]),
        div({attrs: { id: 'controls'}}, [
          input({attrs: { id: 'width', value: width, type: 'range', min: 1, max: 4, step: 0.1 }}),
          input({attrs: { id: 'height', value: height, type: 'range', min: 1, max: 4, step: 0.1 }})
        ])
      ])
    )

  const sinks = {
    DOM: vtree$
  }
  return sinks
}
