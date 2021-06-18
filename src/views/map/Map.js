
import React, { useEffect, useRef, useState } from "react";
import mapboxgl from 'mapbox-gl';
import './Map.css';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API;

const Mapbox = () => {

//   const [viewport, setViewport] = React.useState({
//     latitude: 37.7577,
//     longitude: -122.4376,
//     zoom: 8
//   });

//   let popup = new mapboxgl.Popup({ offset: 2 }).setText(
//     "SST: {{ lb.SST|floatformat:'2' }}"
//  );    

//  let marker = new mapboxgl.Marker()
//                 .setLngLat(["{{ gs.longitude|floatformat:'2' }}", "{{ gs.latitude|floatformat:'2' }}"])
//                 .setPopup(popup)
//                 .addTo(map);

//   return (
//     <ReactMapGL
//       mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_API}
//       {...viewport}
//       width="100%"
//       height="92%"
//       onViewportChange={(viewport) => setViewport(viewport)}
//     />
//   );

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
    //map.addControl(new mapboxgl.FullscreenControl({container: document.querySelector('main')}));
    map.addControl(new mapboxgl.FullscreenControl());

    // Add pop up
    let popup = new mapboxgl.Popup({ offset: 2 }).setText('SST: 5 dB')

    // Add marker
    let marker = new mapboxgl.Marker()
                //.setLngLat(["{{ gs.longitude|floatformat:'2' }}", "{{ gs.latitude|floatformat:'2' }}"])
                .setLngLat([-0.118092, 51.509865])
                .setPopup(popup)
                .addTo(map);

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