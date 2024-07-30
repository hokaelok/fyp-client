import axios from "axios";

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

export const geoCode = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const reverseGeoCode = async (lat, lng) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_MAPS_API_KEY}`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const distanceMatrix = async (origin, destination) => {
  return new Promise((resolve, reject) => {
    const service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
      origins: [origin],
      destinations: [destination],
      travelMode: 'DRIVING',
      unitSystem: google.maps.UnitSystem.METRIC,
    }, (response, status) => {
      if (status !== 'OK') {
        reject('Error was: ' + status);
      } else {
        resolve(response.rows[0].elements[0].distance.value);
      }
    });
  });
};

const googleMapsAPI = {
  geoCode,
  reverseGeoCode,
  distanceMatrix,
};

export default googleMapsAPI;