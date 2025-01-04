import { useState, useEffect, useRef } from 'react';
import React from 'react';
import './MapComponentStyle.css';
const MapComponent = () => {
  const [map, setMap] = useState();
  const [marker, setMarker] = useState();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current && !map) {
      setMap(
        new window.google.maps.Map(ref.current, {
          mapId: 'f351ed5064543873',
        })
      );
    }

    if (map) {
      setMarker(
        new window.google.maps.Marker({
          position: { lat: 47.019996, lng: 20.286777 },
          map,
          optimized: true,
          animation: window.google.maps.Animation.DROP,
          icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/red-pushpin.png',
            size: new window.google.maps.Size(32, 32),
            scaledSize: new window.google.maps.Size(32, 32),
            anchor: new window.google.maps.Point(0, 32),
          },
        })
      );
      map.setOptions({
        zoom: 15,
        // center: { lat: eventInfo[1]?.geoLat, lng: eventInfo[1]?.geoLng },
        center: { lat: 47.019996, lng: 20.286777 },
        // disableDefaultUI: true,
        mapTypeControl: false,
        streetViewControl: false,
        // gestureHandling: "greedy",
      });
    }
  }, [ref, map]);
  return (
    <>
      <div className='google-maps-container' ref={ref}></div>
    </>
  );
};

export default MapComponent;
