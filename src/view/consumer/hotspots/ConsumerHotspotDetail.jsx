import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { to12HourFormat, toShortDateTimeFormat } from '@/lib/data-formatter';
import { clearSelectedHotspot, getHotspot } from '@/redux/slice/consumer/hotspotSlice';
import { requestPickup } from '@/redux/slice/consumer/pickupSlice';
import googleMapsAPI from '@/api/common/googleMapsAPI';

import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent
} from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import MapRouteComponent from '@/components/common/MapRouteComponent';
import RequestPickupForm from '@/components/consumer/hotspot/form/RequestPickupForm';

const ConsumerHotspotDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { hotspotType, hotspotId } = useParams();

  const hotspot = useSelector((state) => state.hotspot.selectedHotspot);
  const [isFetching, setIsFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [warningDialogOpen, setWarningDialogOpen] = useState(false);
  const [clientLocation, setClientLocation] = useState(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const fetchHotspot = async () => {
      await dispatch(getHotspot({ hotspotType, hotspotId }));
      setIsFetching(false);
    };
    fetchHotspot();

    return () => {
      dispatch(clearSelectedHotspot());
    };
  }, [dispatch, hotspotId, hotspotType]);

  useEffect(() => {
    if (hotspot?.address && clientLocation) {
      const origin = `${clientLocation.lat},${clientLocation.lng}`;
      const destination = `${hotspot.address.latitude},${hotspot.address.longitude}`;
      const fetchDistance = async () => {
        try {
          const distanceMetres = await googleMapsAPI.distanceMatrix(origin, destination);
          setDistance(distanceMetres / 1000);
        } catch (error) {
          console.error(error);
        }
      };
      fetchDistance();
    }
  }, [hotspot?.address, clientLocation]);

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

  const requestPickupHandler = () => {
    if (distance > 20) {
      setWarningDialogOpen(true);
    } else {
      setDialogOpen(true);
    }
  };

  const confirmRequestPickup = () => {
    setDialogOpen(true);
    setWarningDialogOpen(false);
  };

  const submitHandler = async (data) => {
    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street} ${data.city} ${data.state} ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }
    data.branchId = hotspotId;
    await dispatch(requestPickup(data));
    setDialogOpen(false);
  };

  return (
    <>
      <Hero
        title="Hotspot Details"
        subtitle="Hotspot details & information"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <div className="flex justify-between mb-4">
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>

          {!isFetching && (
            hotspotType === 'hotspot' && (
              <>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <Button
                    onClick={requestPickupHandler}
                    disabled={hotspot?.branch_type === 'collector'}
                  >
                    {hotspot?.branch_type === 'collector' ? 'Pickup Unavailable' : 'Request Pickup'}
                  </Button>
                  <DialogContent className="overflow-y-scroll max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle className='mb-2'>
                        Pickup Request Form
                      </DialogTitle>
                      <DialogDescription>
                        Fill in the form below to request a pickup for your electronic waste.
                      </DialogDescription>
                    </DialogHeader>

                    <RequestPickupForm
                      hotspot={hotspot}
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
                <Dialog open={warningDialogOpen} onOpenChange={setWarningDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Distance Warning</DialogTitle>
                      <DialogDescription>
                        The hotspot is more than 20 km away. Are you sure you want to proceed with the pickup request?
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={confirmRequestPickup}
                      >
                        Yes, Proceed
                      </Button>
                      <DialogClose asChild>
                        <Button className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                          Cancel
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )
          )}
        </div>

        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <h1 className="text-3xl font-bold text-center mb-4">
              {isFetching ? <Skeleton className='h-6 bg-gray-200 rounded w-full' /> : hotspot?.name}
            </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center w-full">
                {isFetching ? (
                  <Skeleton className='h-40 bg-gray-200 rounded w-full' />
                ) : (
                  <>
                    {hotspotType === 'hotspot' && hotspot?.company?.logo && (
                      <img src={hotspot.company.logo} alt="Company Logo" className='w-full h-40 object-cover mb-2' />
                    )}
                    {hotspotType === 'event' && hotspot?.image && (
                      <img src={hotspot.image} alt="Event Image" className='w-full h-40 object-cover mb-2' />
                    )}
                  </>
                )}
              </div>
              {hotspotType === 'event' && (
                <>
                  <div className="items-center">
                    <span className="font-semibold mr-2">Description:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.description}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Start Time:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(hotspot?.start_time)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">End Time:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(hotspot?.end_time)}</span>
                  </div>
                </>
              )}
              {hotspotType === 'hotspot' && (
                <>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Email:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.email}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Phone:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Business Start Time:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : to12HourFormat(hotspot?.operational_time.open_time)}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Business End Time:</span>
                    <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : to12HourFormat(hotspot?.operational_time.close_time)}</span>
                  </div>
                </>
              )}
              <div className="h-98 my-4">
                {isFetching ? (
                  <Skeleton className='h-60 bg-gray-200 rounded w-full' />
                ) : (
                  <MapRouteComponent
                    clientCordinate={clientLocation}
                    hotspotCordinate={{
                      lat: hotspot?.address?.latitude,
                      lng: hotspot?.address?.longitude,
                    }}
                  />
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Street:</span>
                <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.address?.street}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">City:</span>
                <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.address?.city}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">State:</span>
                <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.address?.state}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Zip:</span>
                <span>{isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : hotspot?.address?.zip}</span>
              </div>
              <div className="flex items-center">
                Visit <span className="font-semibold px-2 underline">{hotspot?.company?.website}</span> for more information.
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default ConsumerHotspotDetail;
