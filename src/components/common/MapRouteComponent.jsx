import React, { useState, useEffect } from 'react';
import {
  APIProvider,
  Map,
  useMapsLibrary,
  useMap,
} from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;

const MapRouteComponent = ({ clientCordinate, hotspotCordinate }) => {
  return (
    <>
      <div className='h-96'>
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
          <Map
            mapId={GOOGLE_MAPS_ID}
            defaultZoom={13}
            defaultCenter={clientCordinate}
          >
            <Directions
              clientCordinate={clientCordinate}
              hotspotCordinate={hotspotCordinate}
            />
          </Map>
        </APIProvider>
      </div>
    </>
  );
};

function Directions({ clientCordinate, hotspotCordinate }) {
  const map = useMap();
  const routesLibrary = useMapsLibrary('routes');

  const [directionService, setDirectionService] = useState();
  const [directionRenderer, setDirectionRenderer] = useState();

  useEffect(() => {
    if (!map || !routesLibrary) return;
    setDirectionService(new routesLibrary.DirectionsService());
    setDirectionRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [map, routesLibrary]);

  useEffect(() => {
    if (!directionService || !directionRenderer) return;

    directionService.route({
      origin: { lat: parseFloat(clientCordinate.lat), lng: parseFloat(clientCordinate.lng) },
      destination: { lat: parseFloat(hotspotCordinate.lat), lng: parseFloat(hotspotCordinate.lng) },
      travelMode: google.maps.TravelMode.DRIVING,
      provideRouteAlternatives: true,
    }).then(response => {
      directionRenderer.setDirections(response);
    });
  }, [directionService, directionRenderer]);


  return null;
}

export default MapRouteComponent;