import React from 'react'
import { LayersControl, TileLayer, Pane } from 'react-leaflet'

const { BaseLayer } = LayersControl

const MapControl = () => (
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
      <Pane name="blackandwhite" style={{ zIndex: 0 }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
        />
      </Pane>
    </BaseLayer>
  </LayersControl>
)

export default MapControl
