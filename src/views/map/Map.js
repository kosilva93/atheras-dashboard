
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import './Map.css';
import { useSelector } from 'react-redux'

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const Mapbox = ({stationID}) => {

  const stations = useSelector(state => {
    if(stationID) {
      return state.stations.filter(item => item.id === parseInt(stationID))
    } else return state.stations
  })

  const mapContainerRef = useRef(null);

  const [lng, setLng] = useState(5);
  const [lat, setLat] = useState(34);
  const [zoom, setZoom] = useState(1.5);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');

    // Add fullscreen control
    map.addControl(new mapboxgl.FullscreenControl());

    // // add markers to map
    stations.forEach(item => {
      // Add pop up
      let popup1 = new mapboxgl.Popup({ offset: 2 }).setHTML(
        `<h6>${item.station.LocationName}</h6>
    <br />
    <p>Latitude: ${item.station.Latitude}<br/>
    Longitude: ${item.station.Longitude}<br/>
    Frequency: ${item.frequency} GHz<br/>
    Satellite: ${item.satellite.Name}<br/>
    SST: ${item.station.SST}</p>`
      )

      let popup2 = new mapboxgl.Popup({ offset: 2 }).setHTML(
        `<h6>${item.satellite.Name}</h6>
    <br />
    <p>Frequency: ${item.frequency} GHz<br/>
    Ground Station Communicating: ${item.station.LocationName}</p>`
      )

      // make a marker for each station
      new mapboxgl.Marker()
        .setLngLat([item.station.Longitude, item.station.Latitude])
        .setPopup(popup1)
        .addTo(map);

      // make a marker for each satellite
      new mapboxgl.Marker({ color: 'black' })
        .setLngLat([0, item.satellite.Longitude])
        .setPopup(popup2)
        .addTo(map);

    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    map.on('load', () => {
      map.resize();
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className='map-container' ref={mapContainerRef} />
    </div>
  );
};

export default Mapbox;