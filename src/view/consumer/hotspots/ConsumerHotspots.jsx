import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearHotspots, getHotspots } from '@/redux/slice/consumer/hotspotSlice';
import { toast } from 'sonner';

import Hero from '@/components/ui/hero';
import MapComponent from '@/components/common/MapComponent';
import { Skeleton } from '@/components/ui/skeleton';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ConsumerHotspots = () => {
  const dispatch = useDispatch();

  const { hotspots, isFetching } = useSelector((state) => state.hotspot);

  const [clientLocation, setClientLocation] = useState(null);
  const [filter, setFilter] = useState('all');

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
        title="Locate E-Waste Collection Points"
        subtitle="Find the nearest e-waste collection points or events around you for proper disposal"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Hotspots
        </h3>
        {isFetching ? (
          <Skeleton />
        ) : (
          <>
            <div className="mb-4">
              <Label htmlFor="filter">
                Hotspot Type:
              </Label>
              <Select
                value={filter}
                onValueChange={(value) => setFilter(value)}
              >
                <SelectTrigger className="h-10 w-[150px]">
                  <SelectValue placeholder="Select Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="hotspot">Hotspots</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <MapComponent
              defaultLocation={clientLocation}
              points={hotspots}
              filter={filter}
            />
          </>
        )}
      </section>
    </>
  );
};

export default ConsumerHotspots;
