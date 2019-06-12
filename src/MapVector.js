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

  constructor(props) {
    super(props);

    this.state = {
      regionFilter: null,
      provinceFilter: null,
      departmentFilter: null,
    }
  }

  handleClick = (e) => {
    console.log(e.layer.properties)
  }

  handleRegionClick = (e) => {
    this.setState({
      regionFilter: e.layer.properties.region,
      provinceFilter: null,
      departmentFilter: null
    })
  }

  handleProvinceClick = (e) => {
    this.setState({
      provinceFilter: e.layer.properties.province,
      departmentFilter: null,
    })
  }

  handleDepartmentClick = (e) => {
    this.setState({ departmentFilter: e.layer.properties.departement })
  }

  render() {
    const { regionFilter, provinceFilter, departmentFilter } = this.state;

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

    const regionStyle = {
      regions: {
        fill: true,
        weight: 0.5,
        fillColor: '#000000',
        color: '#000000',
        fillOpacity: 0.2,
        opacity: 0.4,
      }
    }

    const regionsOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/regions/{z}/{x}/{y}.pbf',
      subdomains: regionFilter ? regionFilter : 'regions',
      vectorTileLayerStyles: regionStyle
    };

    const provinceStyle = {
      provinces: (properties, zoom) => {
        const region = properties.region;
        if (region === regionFilter) {
          return {
            fill: true,
        		weight: 1,
        		fillColor: '#ff0000',
        		color: '#ff0000',
        		fillOpacity: 0.2,
        		opacity: 0.4
          }
        }

        return {
          fill: false,
          stroke: false,
          fillOpacity: 0,
          opacity: 0,
          weight: 0,
        }
      },
  	}

    const provincesOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/provinces/{z}/{x}/{y}.pbf',
      subdomains: provinceFilter ? provinceFilter : 'provinces',
      vectorTileLayerStyles: provinceStyle
    };

    const departementStyle = {
      departements: (properties, zoom) => {
        const province = properties.province;
        if (province === provinceFilter) {
          return {
            fill: true,
        		weight: 1.5,
        		fillColor: '#00ff00',
        		color: '#00ff00',
        		fillOpacity: 0.2,
        		opacity: 0.4
          }
        }

        return {
          fill: false,
          stroke: false,
          fillOpacity: 0,
          opacity: 0,
          weight: 0,
        }
      },
  	}

    const departementsOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/departements/{z}/{x}/{y}.pbf',
      subdomains: departmentFilter ? departmentFilter : 'departements',
      vectorTileLayerStyles: departementStyle
    };

    const options = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/roads/{z}/{x}/{y}.pbf',
      subdomains: 'roads',
      vectorTileLayerStyles: VectorTileStyling
    };

    console.log(regionFilter)

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
          <VectorGrid {...regionsOptions} onClick={this.handleRegionClick} />

          { regionFilter &&
            <VectorGrid key={provinceFilter ? provinceFilter : 'province'} {...provincesOptions} onClick={this.handleProvinceClick} />
          }

          { provinceFilter &&
            <VectorGrid key={departmentFilter ? departmentFilter : 'departments'} {...departementsOptions} onClick={this.handleDepartmentClick} />
          }
        </Pane>

        <Pane name="roads" style={{ zIndex: 20 }}>
          {/* <VectorGrid {...options} /> */}
        </Pane>
      </Map>
    )
  }
}

export default MapVector
