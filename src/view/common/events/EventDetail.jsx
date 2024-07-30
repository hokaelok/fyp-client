import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedEvent, getEvent, updateEvent } from '@/redux/slice/eventSlice';
import { toShortDateTimeFormat } from '@/lib/data-formatter';
import googleMapsAPI from '@/api/common/googleMapsAPI';

import EventForm from '@/components/common/events/form/EventForm';
import Hero from '@/components/ui/hero';
import AddressPinComponent from '@/components/common/AddressPinComponent';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';


const EventDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { eventId } = useParams();
  const event = useSelector((state) => state.event.selectedEvent);
  const company = useSelector((state) => state.company.company);

  const [isFetching, setIsFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      await dispatch(getEvent(eventId));
      setIsFetching(false);
    };
    fetchEvent();

    return () => {
      dispatch(clearSelectedEvent());
    };
  }, [dispatch, eventId]);

  const submitHandler = async (data) => {
    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street} ${data.city} ${data.state} ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }

    await dispatch(updateEvent({
      companyId: company.id,
      ...data,
    }));
    await dispatch(getEvent(eventId));
    setDialogOpen(false);
  };

  return (
    <>
      <Hero
        title="Event Details"
        subtitle="View & manage your event details here."
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <div className="flex justify-between mb-4">
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Edit Event
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className='mb-2'>
                  Edit Event Details
                </DialogTitle>
                <DialogDescription>
                  Update your event details
                </DialogDescription>
              </DialogHeader>

              <EventForm
                event={event}
                submitHandler={submitHandler}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                    Cancel
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center mb-4">
              {isFetching ? <Skeleton className='h-6 bg-gray-200 rounded w-full' /> : event?.name}
            </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center w-full">
                {isFetching ?
                  <Skeleton className='h-24 bg-gray-200 rounded w-24' /> :
                  <img src={event?.image} alt="Reward" className="max-h-40 w-full object-cover rounded" />
                }
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Description:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : event?.description}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Start Time:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(event?.startTime)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">End Time:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(event?.endTime)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Street:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : event?.street}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">City:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : event?.city}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">State:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : event?.state}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Zip:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : event?.zip}
                </span>
              </div>

              <div className="h-60 rounded-lg overflow-hidden mb-4">
                {isFetching ? (
                  <Skeleton className='h-60 bg-gray-200 rounded w-full' />
                ) : (
                  <AddressPinComponent addressCordinate={{
                    lat: parseFloat(event?.latitude),
                    lng: parseFloat(event?.longitude),
                  }} />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default EventDetail;
