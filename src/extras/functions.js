import xs from 'xstream'
import config from './config'

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

module.exports = { floorArea, model }
