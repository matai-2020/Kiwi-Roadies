import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'regenerator-runtime/runtime'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBoxDirections from 'mapbox-gl-directions'
import 'mapbox-gl/dist/mapbox-gl-directions.css'
import MapboxGeocoder from 'mapbox-gl-geocoder'

require('dotenv').config()

console.log('mapbox token for Directions map', process.env.ACCESS_TOKEN)

mapboxgl.accessToken = process.env.ACCESS_TOKEN

class DirectionsMap extends Component {
  updateView =(viewport) => {
    this.setState({ viewport })
  }

  componentDidMount () {
    const map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [172.76205, -40.852931],
      zoom: 4
    })

    const directions = new MapBoxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    })

    map.addControl(directions, 'bottom-left')

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      types: 'country,region,place,postcode,locality,neighborhood'
    })

    geocoder.addTo('#geocoder')
  }

  render () {
    return (
      <>
        <p>Directions Map</p>
        <div ref={el => (this.mapWrapper = el)}
          className ="mapWrapper"/>
      </>
    )
  }
}

export default connect()(DirectionsMap)
