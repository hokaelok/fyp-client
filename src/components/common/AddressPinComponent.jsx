import React from 'react';

import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
} from '@vis.gl/react-google-maps';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_ID = import.meta.env.VITE_GOOGLE_MAPS_ID;

const iconSvg = {
  home: `
  <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="17" height="17" viewBox="0,0,256,256">
    <g fill="#ffffff" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><g transform="scale(4,4)"><path d="M32,3l-31,25l0.49219,0.6543c1.367,1.823 3.97728,2.13741 5.73828,0.69141l24.76953,-20.3457l24.76953,20.3457c1.761,1.446 4.37128,1.13159 5.73828,-0.69141l0.49219,-0.6543l-9,-7.25781v-12.74219h-9v5.48438zM32,13l-24,19v24h48v-21zM26,34h12v18h-12z"></path></g></g>
  </svg>
  `,
};

const AddressPinComponent = ({ addressCordinate, home = false }) => {
  const pin = () => {
    const glyphIcon = document.createElement('div');
    glyphIcon.innerHTML = iconSvg.home;

    return home ? (
      <Pin glyph={glyphIcon} />
    ) : (
      <Pin />
    );
  };

  return (
    <>
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
        <Map
          zoom={16}
          center={addressCordinate}
          mapId={GOOGLE_MAPS_ID}
          zoomControl={false}
          fullscreenControl={false}
          mapTypeControl={false}
          streetViewControl={false}
        >
          <AdvancedMarker
            position={addressCordinate}
          >
            {pin()}
          </AdvancedMarker>
        </Map>
      </APIProvider >
    </>
  );
};

export default AddressPinComponent;