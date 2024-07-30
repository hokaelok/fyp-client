import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;

const blueDotIconUrl = 'https://www.gstatic.com/local/maps/ic_my_location_24dp_2x.png';

const selfIcon = () => {
  const img = document.createElement('img');
  img.src = blueDotIconUrl;
  img.alt = 'Current Location';
  img.style.width = '16px';
  img.style.height = '16px';
  img.style.transform = 'translateY(20px)';
  return img;
};

const MapComponent = ({ defaultLocation, points, filter = 'all', usage = 'consumer' }) => {
  const navigate = useNavigate();

  const [openInfoWindowIndex, setOpenInfoWindowIndex] = useState(null);

  const filteredPoints = usage === 'consumer'
    ? points.filter(point => filter === 'all' || point.type === filter)
    : points;

  const MarkerWithInfoWindow = ({ point, index }) => {
    const { name, address, type, description, company, image } = point;

    const [markerRef, marker] = useAdvancedMarkerRef();

    const handleMarkerClick = useCallback(() => {
      setOpenInfoWindowIndex((prevIndex) => (prevIndex === index ? null : index));
    }, [index]);

    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          onClick={handleMarkerClick}
          position={{
            lat: parseFloat(address.latitude),
            lng: parseFloat(address.longitude),
          }}
        >
          <Pin />
        </AdvancedMarker>
        {openInfoWindowIndex === index && (
          <InfoWindow anchor={marker}>
            <div className='max-w-96'>
              {(type === 'event' && image) ?
                <img src={image} className='w-full h-32 object-cover mb-2' /> :
                <img src={company.logo} className='w-full h-32 object-cover mb-2' />
              }
              <div className='mb-2 text-xl underline font-semibold text-gray-800'>
                {name}
              </div>
              {company && (
                <p className='mb-2'>
                  <span className='font-semibold'>Company:</span> {company.name}
                </p>
              )}
              {type && (
                <div className='mb-2 capitalize'>
                  <span className='font-semibold'>Type:</span> {type}
                </div>
              )}
              {description && (
                <p className='mb-2'>
                  <span className='font-semibold'>Description:</span> {description}
                </p>
              )}
              <p className='mb-2'>
                <span className='font-semibold'>Address:</span> {address.street}, {address.city}, {address.state} {address.zip}
              </p>
              {point.phone && (
                <p className='mb-2'>
                  <span className='font-semibold'>Phone:</span> {point.phone}
                </p>
              )}
              {point.email && (
                <p className='mb-2'>
                  <span className='font-semibold'>Email:</span> {point.email}
                </p>
              )}
              {company.website && (
                <p className='mb-2'>
                  <span className='font-semibold'>Website:</span> <a href={company.website} target="_blank" rel="noopener noreferrer">{company.website}</a>
                </p>
              )}

              <button
                onClick={() => navigate(`${location.pathname}/${type ? `${type}/` : ''}${point.id}`)}
                className='mt-2 p-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600'
              >
                View Details
              </button>
            </div>
          </InfoWindow>
        )}
      </>
    );
  };

  return (
    <div className='h-screen border-2 border-gray-500'>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          defaultZoom={13}
          defaultCenter={defaultLocation}
          mapId={GOOGLE_MAPS_ID}
        >
          <AdvancedMarker position={defaultLocation}>
            <Pin
              background='transparent'
              borderColor='transparent'
              glyph={selfIcon()}
            />
          </AdvancedMarker>
          {filteredPoints.length > 0 && filteredPoints.map((point, index) => (
            <MarkerWithInfoWindow key={index} point={point} index={index} />
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default MapComponent;
