import React, { useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSMSource from 'ol/source/OSM';

const OpenLayersMap = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) {
      const map = new Map({
        target: mapRef.current,
        layers: [
          new TileLayer({
            source: new OSMSource(),
          }),
        ],
        view: new View({
          center: [50.1025, 53.4810], // Координаты Самары
          lng: 50.1790,
          lat: 53.2120,
          zoom: 15, // Уровень масштабирования
        }),
      });

      mapRef.current = map;
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.setTarget(null);
      }
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '600px',
      }}
    />
  );
};

export default OpenLayersMap;
