import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import googleMapsAPI from '@/api/common/googleMapsAPI';
import {
  clearEvents,
  createEvent,
  getEvents
} from '@/redux/slice/eventSlice';

import Hero from '@/components/ui/hero';
import EventDataTable from '@/components/common/events/dataTable/EventDataTable';
import EventColumns from '@/components/common/events/dataTable/EventColumns';

const EventList = () => {
  const dispatch = useDispatch();

  const companyId = useSelector((state) => state.company.company.id);
  const events = useSelector((state) => state.event.events);

  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsFetchingData(true);
      await dispatch(getEvents(companyId));
      setIsFetchingData(false);
    };

    fetchEvents();

    return () => {
      setIsFetchingData(false);
      clearEvents();
    };
  }, [dispatch, companyId]);

  const addEventHandler = async (data) => {
    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street} ${data.city} ${data.state} ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }
    await dispatch(createEvent({
      ...data,
      companyId,
    }));
    await dispatch(getEvents(companyId));
  };

  return (
    <>
      <Hero
        title="Events"
        subtitle="Host & manage your exciting events here!"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Event List
        </h3>

        <EventDataTable
          columns={EventColumns}
          data={events}
          searchColumn="name"
          addEventHandler={addEventHandler}
          isFetchingData={isFetchingData}
        />
      </section>
    </>
  );
};

export default EventList;