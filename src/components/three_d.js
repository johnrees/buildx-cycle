import '../lib/aframe-extrude-svg-component'
import '../lib/aframe-clone-component'

import {h, div} from '@cycle/dom'
import xs from 'xstream'

import { rails, bays, floor, frames, walls, connectors } from '../parts'
import { floorArea, model, renderControls } from '../extras/functions'

// import S from '../lib/s'
// const {viewBox, points, bounds, close} = S({width, height, wallHeight, frameWidth})
// const b = bounds(0)

const piece = (path, color) => h('a-entity', {attrs:{
  'extrude-svg': {
    // path: close(points(0).map(([x,y]) => [(x-b.minX)/100, (y-b.minY)/100])),
    path,
    amount: 0.25
  },
  material: { color }
  // position: '0 0 0',
  // rotation: '0 0 0',
}})

export default function ThreeD(sources) {

  const vtree$ = model(sources)
    .map(([width, height, wallHeight, length]) =>
      div([
        h('a-scene', {attrs:{stats: true}}, [
          h('a-entity', {attrs: {id: 'frames', position: '-2.4 6 -10', rotation: '180 0 0'}}, [
            h('a-entity', {attrs: {id: 'frame', position: '0 0 0'}}, [
              piece('M2.4133,0 2.8713,0.3539 2.75,0.5129 2.4133,0.26 0.1213,2.0060 0,1.8470z', 'yellow'),
              piece('M5.263307453372858,2.18 5.263307453372858,2.73 5.063307453372858,2.73 5.063307453372858,2.28 2.75,0.512933583073788 2.8713827206724467,0.35398002028844217z', 'green'),
              piece('M5.263307453372858,5.73 4.663307453372858,5.73 4.663307453372858,5.53 5.063307453372858,5.53 5.063307453372858,2.73 5.263307453372858,2.73z', 'pink'),
              piece('M-0.436692546627142,5.73 -0.436692546627142,5.13 -0.236692546627142,5.13 -0.236692546627142,5.53 4.663307453372858,5.53 4.663307453372858,5.73z', 'blue'),
              piece('M-0.436692546627142,2.18 0,1.8470664169262119 0.121382720672446,2.0060199797115583 -0.236692546627142,2.28 -0.236692546627142,5.13 -0.436692546627142,5.13z', 'orange')
            ]),
            h('a-entity', {attrs: { clone: {id: '#frame'}, position: '0 0 3'}}),
            h('a-entity', {attrs: { clone: {id: '#frame'}, position: '0 0 2'}}),
            h('a-entity', {attrs: { clone: {id: '#frame'}, position: '0 0 1'}}),
            h('a-entity', {attrs: { clone: {id: '#frame'}, position: '0 0 -1'}}),
            h('a-entity', {attrs: { clone: {id: '#frame'}, position: '0 0 -2'}}),
            h('a-entity', {attrs: { clone: {id: '#frame'}, position: '0 0 -3'}})
          ])
        ]),
        ...renderControls(width, height, wallHeight, length)
      ])
    )

  return { DOM: vtree$ }
}

/*
<a-scene stats={true}>
  <a-entity id="frames" position="-2.4 6 -10" rotation="180 0 0">
    <a-entity id="frame" position="0 0 0">
      <a-entity extrude-svg={{path: path, amount: 0.25}} material={{ color: color }}></a-entity>
    </a-entity>
    <a-entity clone={{id: '#frame'}} position="0 0 3" />
    <a-entity clone={{id: '#frame'}} position="0 0 2" />
    <a-entity clone={{id: '#frame'}} position="0 0 1" />
  </a-entity>
</a-scene>
*/
