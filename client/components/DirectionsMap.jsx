import React, { Component } from 'react'
import { connect } from 'react-redux'
import 'regenerator-runtime/runtime'

import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import MapBoxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions'
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css'

require('dotenv').config()

mapboxgl.accessToken = process.env.ACCESS_TOKEN

class DirectionsMap extends Component {
  map = null

  componentDidMount () {
    const start = this.props.roadieform[0][0].concat(', New Zealand')
    const end = this.props.roadieform[0][1].concat(', New Zealand')

    this.map = new mapboxgl.Map({
      container: this.mapWrapper,
      style: 'mapbox://styles/mapbox/light-v10',
      center: [172.76205, -40.852931],
      zoom: 4
    })

    this.map.on('load', () => {
      const directions = new MapBoxDirections({
        accessToken: mapboxgl.accessToken,
        unit: 'metric',
        profile: 'mapbox/driving'
      })

      this.map.addControl(directions, 'top-left')
      directions.setOrigin(start).setDestination(end)
    })
  }

  addNationalParks = () => {
    const { nationalParks } = this.props

    nationalParks.nationalParks.map((park) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(
        name
      )

      new mapboxgl.Marker()
        .setLngLat([park.long, park.lat])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  addCampsites = () => {
    const { campsites } = this.props

    campsites.map((campsite) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(
        campsite.name
      )

      new mapboxgl.Marker()
        .setLngLat([campsite.longLat[0], campsite.longLat[1]])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  addHuts = () => {
    const { huts } = this.props

    huts.map((hut) => {
      var popup = new mapboxgl.Popup({ offset: 25 }).setText(
        hut.name
      )

      new mapboxgl.Marker()
        .setLngLat([hut.longLat[0], hut.longLat[1]])
        .setPopup(popup)
        .addTo(this.map)
    })
  }

  render () {
    if (this.map) {
      this.addNationalParks()
      this.addCampsites()
      this.addHuts()
    }

    return (
      <>
        <div className="coolmap">
          <p>Directions Map</p>
          <div ref={el => (this.mapWrapper = el)}
            className ="mapWrapper"/>
        </div>
        <div ref={el => (this.mapWrapper = el)}
          className ="mapWrapper"/>
      </>
    )
  }
}

const mapStateToProps = state => ({
  roadieform: state.roadieform,
  nationalParks: state.nationalParks,
  campsites: state.campsites,
  huts: state.huts
})

export default connect(mapStateToProps)(DirectionsMap)
