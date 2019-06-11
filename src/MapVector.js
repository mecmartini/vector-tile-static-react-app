import React, { createRef, PureComponent } from 'react'
import { Map, TileLayer, Pane, withLeaflet } from 'react-leaflet'
import VectorGridDefault from 'react-leaflet-vectorgrid'
import BasemapVectorStyle from './BasemapVectorStyle'
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

  handleClick = (e) => {
    console.log('click')
    console.log(e)
  }

  render() {
    const basemapOptions = {
      type: 'protobuf',
      url: 'https://api.maptiler.com/tiles/v3/{z}/{x}/{y}.pbf?key={key}',
      subdomains: 'hilmnopq',
      accessKey: 'HEHrAR0e6Zq0aFnl3aun',
      vectorTileLayerStyles: BasemapVectorStyle
    }

    const countryOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/country/{z}/{x}/{y}.pbf',
      subdomains: 'country',
      vectorTileLayerStyles: VectorTileStyling
    };

    const regionsOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/regions/{z}/{x}/{y}.pbf',
      subdomains: 'regions',
      vectorTileLayerStyles: VectorTileStyling
    };

    const provincesOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/provinces/{z}/{x}/{y}.pbf',
      subdomains: 'provinces',
      vectorTileLayerStyles: VectorTileStyling
    };

    const departementsOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/departements/{z}/{x}/{y}.pbf',
      subdomains: 'departements',
      vectorTileLayerStyles: VectorTileStyling
    };

    const options = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/roads/{z}/{x}/{y}.pbf',
      subdomains: 'roads',
      vectorTileLayerStyles: VectorTileStyling
    };

    return(
      <Map className="my-map" ref={this._map} bounds={bounds} zoom={5}>
        {/*
        <Pane name="base" style={{ zIndex: 0 }}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </Pane>
        */}

        {/*
        <Pane name="national-roads" style={{ zIndex: 10 }}>
          <VectorGrid {...basemapOptions} />
        </Pane>
        */}

        <Pane name="country" style={{ zIndex: 10 }}>
          <VectorGrid {...countryOptions} onClick={this.handleClick} />
          <VectorGrid {...regionsOptions} onClick={this.handleClick} />
          <VectorGrid {...provincesOptions} onClick={this.handleClick} />
          <VectorGrid {...departementsOptions} onClick={this.handleClick} />
        </Pane>

        <Pane name="roads" style={{ zIndex: 20 }}>
          <VectorGrid {...options} />
        </Pane>
      </Map>
    )
  }
}

export default MapVector
