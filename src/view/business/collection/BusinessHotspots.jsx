import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearHotspots, getHotspots } from '@/redux/slice/business/hotspotSlice';

import Hero from '@/components/ui/hero';
import MapComponent from '@/components/common/MapComponent';
import { Skeleton } from '@/components/ui/skeleton';

const BusinessHotspots = () => {
  const dispatch = useDispatch();

  const { hotspots, isFetching } = useSelector((state) => state.hotspot);

  const [clientLocation, setClientLocation] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getHotspots());
    };
    fetchData();

    return () => {
      dispatch(clearHotspots());
    };
  }, [dispatch]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setClientLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          toast.error(error.message);
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser!');
    }
  }, []);

  return (
    <>
      <Hero
        title="Locate E-Waste Collector"
        subtitle="Find professional e-waste collector around you for collection"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Collector Hotspots

          {isFetching ? (
            <Skeleton />
          ) : (
            <MapComponent
              defaultLocation={clientLocation}
              points={hotspots}
            />
          )}
        </h3>
      </section>
    </>
  );
};

export default BusinessHotspots;