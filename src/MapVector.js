import React, { createRef, PureComponent } from 'react'
import { Map, TileLayer, Pane, withLeaflet } from 'react-leaflet'
import VectorGridDefault from 'react-leaflet-vectorgrid'
import VectorTileStyling from './VectorTileStyling'

import 'leaflet/dist/leaflet.css'

// wrap the VectorGrid component using `withLeaflet` HOC
const VectorGrid = withLeaflet(VectorGridDefault);

const bounds = [
  [
    9.40110000000073,
    -5.51889999982625
  ],
  [
    15.0824999999973,
    2.40529997196798
  ]
];

class MapVector extends PureComponent {
  _map = createRef();

  render() {
    const options = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/{z}/{x}/{y}.pbf',
      subdomains: 'abcdefg',
      vectorTileLayerStyles: VectorTileStyling
    };

    return(
      <Map className="my-map" ref={this._map} bounds={bounds} zoom={5}>
        <Pane name="base" style={{ zIndex: 0 }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Pane>

        <Pane name="national-roads" style={{ zIndex: 10 }}>
          <VectorGrid {...options} />
        </Pane>
      </Map>
    )
  }
}

export default MapVector
