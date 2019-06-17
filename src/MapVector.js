import React, { createRef, PureComponent } from 'react'
import { Map, LayersControl, TileLayer, Pane, Popup, withLeaflet } from 'react-leaflet'
import VectorGridDefault from 'react-leaflet-vectorgrid'
import BasemapVectorStyle from './BasemapVectorStyle'
import VectorTileStyling from './VectorTileStyling'
import Control from '@skyeer/react-leaflet-custom-control'
import styled from "styled-components";

import 'leaflet/dist/leaflet.css'

const { BaseLayer } = LayersControl

// wrap the VectorGrid component using `withLeaflet` HOC
const VectorGrid = withLeaflet(VectorGridDefault);

const initBounds = [
  [
    9.40110000000073,
    -5.51889999982625
  ],
  [
    15.0824999999973,
    2.40529997196798
  ]
];

const MapReset = styled.button`
  background: white;
  padding: 10px 20px;
  border-radius: 2px;
  border-color: rgba(0,0,0,0.2);
  text-transform: uppercase;
  box-shadow: 0 0;
  font-size: 1em;
  letter-spacing: 1.5px;
  cursor: pointer;
`;

const MapData = styled.section`
  background: white;
  padding: 10px 20px;
  border-radius: 2px;
  border-color: rgba(0,0,0,0.2);
  box-shadow: 0 0;
  font-size: 1em;
  letter-spacing: 1.5px;
  p {
    text-transform: uppercase;
  }
`;

class MapVector extends PureComponent {
  _map = createRef();

  constructor(props) {
    super(props);

    this.state = {
      bounds: initBounds,
      zoom: 7,
      center: null,
      regionFilter: null,
      provinceFilter: null,
      departmentFilter: null,
    }
  }

  handleRegionClick = (e) => {
    this.setState({
      center: [ e.latlng.lat, e.latlng.lng ],
      zoom: 8,
      regionFilter: e.layer.properties.region,
      provinceFilter: null,
      departmentFilter: null
    })
  }

  handleProvinceClick = (e) => {
    console.log(e.layer.properties)
    this.setState({
      center: [ e.latlng.lat, e.latlng.lng ],
      zoom: 9,
      provinceFilter: e.layer.properties.province,
      departmentFilter: null,
    })
  }

  handleDepartmentClick = (e) => {
    this.setState({
      center: [ e.latlng.lat, e.latlng.lng ],
      zoom: 10,
      departmentFilter: e.layer.properties.departement
    })
  }

  handleMouseover = (e) => {
    console.log('mouse over')
  }

  handleMouseout = (e) => {
    console.log('mouse out')
  }

  mapReset = (e) => {
    this.setState({
      bounds: initBounds,
      zoom: 7,
      center: null,
      regionFilter: null,
      provinceFilter: null,
      departmentFilter: null
    })
  }

  render() {
    const { bounds, center, zoom, regionFilter, provinceFilter, departmentFilter } = this.state;

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

    const departmentstyle = {
      departments: (properties, zoom) => {
        const province = properties.province;
        const department = properties.departement;
        if (province === provinceFilter) {
          return {
            fill: true,
        		weight: department === departmentFilter ? 3 : 1.5,
        		fillColor: '#00ff00',
        		color: '#00ff00',
        		fillOpacity: department === departmentFilter ? 0.5 : 0.2,
        		opacity: department === departmentFilter ? 0.7 :0.4
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

    const departmentsOptions = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/departments/{z}/{x}/{y}.pbf',
      subdomains: departmentFilter ? departmentFilter : 'departments',
      vectorTileLayerStyles: departmentstyle
    };

    const options = {
    	type: 'protobuf',
      url: 'http://localhost:8000/public/tiles/roads/{z}/{x}/{y}.pbf',
      subdomains: 'roads',
      vectorTileLayerStyles: VectorTileStyling
    };

    const provinceKey = 'province_' + regionFilter + provinceFilter + departmentFilter;
    const departmentkey = 'department_' + regionFilter + provinceFilter + departmentFilter;

    return(
      <Map
        className="my-map"
        ref={this._map}
        bounds={bounds}
        maxBounds={initBounds}
        center={center}
        zoom={zoom}
        minZoom={7}
        maxZoom={12}
      >
        {/*
        <Pane name="national-roads" style={{ zIndex: 10 }}>
          <VectorGrid {...basemapOptions} />
        </Pane>
        */}

        <Pane name="burkina" style={{ zIndex: 10 }}>
          <VectorGrid {...countryOptions} />
          <VectorGrid {...regionsOptions} onClick={this.handleRegionClick} onMouseover={this.handleMouseover} onMouseout={this.handleMouseout} />

          { regionFilter &&
            <VectorGrid key={provinceKey} {...provincesOptions} onClick={this.handleProvinceClick} />
          }

          { provinceFilter &&
            <VectorGrid key={departmentkey} {...departmentsOptions} onClick={this.handleDepartmentClick}>
              { departmentFilter &&
                <Popup position={center}>{departmentFilter}</Popup>
              }
            </VectorGrid>
          }
        </Pane>

        <Pane name="roads" style={{ zIndex: 20 }}>
          {/* <VectorGrid {...options} /> */}
        </Pane>

        <LayersControl position="topleft">
          <BaseLayer checked name="Mapnik">
            <Pane name="mapnik" style={{ zIndex: 0 }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </Pane>
          </BaseLayer>
          <BaseLayer name="Black&White">
            <Pane name="blackandwhite" style={{ zIndex: 10 }}>
              <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
            </Pane>
          </BaseLayer>
        </LayersControl>

        <Control position="topright" className="mapReset">
          <MapReset onClick={this.mapReset} >Reset</MapReset>
        </Control>

        { regionFilter &&
          <Control position="topright" className="mapData">
            <MapData>
              { departmentFilter &&
                <p><strong>Department:</strong> {departmentFilter}</p>
              }

              { provinceFilter &&
                <p><strong>Province:</strong> {provinceFilter}</p>
              }

              { regionFilter &&
                <p><strong>Region:</strong> {regionFilter}</p>
              }
            </MapData>
          </Control>
        }
      </Map>
    )
  }
}

export default MapVector
