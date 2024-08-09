import React, { useState, useEffect } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSMSource from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Icon, Style } from 'ol/style';

const SearchBar = () => {
  const [map, setMap] = useState(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: 'Railway Station', longitude: 50.1025, latitude: 53.4810 },
    { id: 2, name: 'TsUM Samara - Suburban Bus Station', longitude: 50.1050, latitude: 53.4830 },
    { id: 3, name: 'Gubernskiy Market', longitude: 50.1070, latitude: 53.4850 },
    { id: 4, name: 'Michurinsky Square', longitude: 50.1090, latitude: 53.4870 },
    { id: 5, name: 'Memorial Square', longitude: 50.1110, latitude: 53.4890 },
    { id: 6, name: 'Samara Aerospace University', longitude: 50.1130, latitude: 53.4910 },
  ]);
  const [highlightedResult, setHighlightedResult] = useState(null);

  useEffect(() => {
    const initMap = () => {
      const newMap = new Map({
        target: 'map',
        layers: [
          new TileLayer({
            source: new OSMSource(),
          }),
          new VectorLayer({
            source: new VectorSource({
              features: searchResults.map((result) =>
                new Feature({
                  geometry: new Point([result.longitude, result.latitude]),
                  name: result.name,
                })
              ),
              projection: 'EPSG:4326',
            }),
            style: new Style({
              image: new Icon({
                src: 'https://openlayers.org/en/latest/examples/data/icon.png',
                scale: 0.05,
              }),
            }),
          }),
        ],
        view: new View({
          center: [50.1025, 53.4810], // Координаты Самары
          lng: 50.1790,
          lat: 53.2120,
          zoom: 4,
        }),
      });

      setMap(newMap);
    };

    if (!map) {
      initMap();
    }

    return () => {
      if (map) {
        map.setTarget(null);
      }
    };
  }, [map, searchResults]);

  const handleSearch = (searchValue) => {
    setSearchTerm(searchValue);
    const filteredResults = searchResults.filter((item) =>
      item.name.toLowerCase().includes(searchValue)
    );
    setSearchResults(filteredResults);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      const result = searchResults.find((item) =>
        item.name.toLowerCase() === searchTerm.toLowerCase()
      );
      setHighlightedResult(result);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Название остановки..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value.toLowerCase())}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div
        id="map"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: `${windowSize.height}px`,
          zIndex: -1,
        }}
      />
      {highlightedResult && (
        <div>
          Выделена остановка: {highlightedResult.name}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
