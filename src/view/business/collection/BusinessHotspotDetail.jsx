import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { to12HourFormat } from '@/lib/data-formatter';
import { clearSelectedHotspot, getHotspot } from '@/redux/slice/business/hotspotSlice';
import { requestCollection } from '@/redux/slice/business/collectionSlice';
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
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog';
import RequestCollectionForm from '@/components/business/collection/form/RequestCollectionForm';
import AddressPinComponent from '@/components/common/AddressPinComponent';

const BusinessHotspotDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { hotspotId } = useParams();

  const hotspot = useSelector((state) => state.hotspot.selectedHotspot);
  const [isFetching, setIsFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchHotspot = async () => {
      await dispatch(getHotspot(hotspotId));
      setIsFetching(false);
    };
    fetchHotspot();

    return () => {
      dispatch(clearSelectedHotspot());
    };
  }, [dispatch, hotspotId]);

  const submitHandler = async (data) => {
    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street}, ${data.city}, ${data.state}, ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }
    data.collectorBranchId = parseInt(hotspotId);
    await dispatch(requestCollection(data));
    setDialogOpen(false);
  };

  return (
    <>
      <Hero
        title="Collector Details"
        subtitle="Collector details & information"
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
              <Button>
                Request Collection
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className='mb-2'>
                  Pickup Request Form
                </DialogTitle>
                <DialogDescription>
                  Fill in the form below to request for a collection.
                </DialogDescription>
              </DialogHeader>

              <RequestCollectionForm
                collector={hotspot}
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
              {isFetching ? <Skeleton className='h-6 bg-gray-200 rounded w-full' /> : hotspot?.name}
            </h1>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center w-full">
                {isFetching ?
                  <Skeleton className='h-40 bg-gray-200 rounded w-full' /> :
                  <img src={hotspot.company.logo} alt="Company Logo" className='w-full h-40 object-cover mb-2' />
                }
              </div>
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
              <div className="h-60 rounded-lg overflow-hidden mb-4">
                {isFetching ?
                  <Skeleton className='h-60 bg-gray-200 rounded w-full' /> :
                  <AddressPinComponent addressCordinate={{
                    lat: parseFloat(hotspot?.address.latitude),
                    lng: parseFloat(hotspot?.address.longitude),
                  }}
                  />
                }
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
      </section >
    </>
  );
};

export default BusinessHotspotDetail;