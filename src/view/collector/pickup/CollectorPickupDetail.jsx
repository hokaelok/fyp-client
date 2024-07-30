import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedPickup, getPickup, updatePickup } from '@/redux/slice/collector/pickupSlice';
import { toShortDateFormat, toShortDateTimeFormat } from '@/lib/data-formatter';

import ReviewPickupRequestForm from '@/components/business/pickup/form/ReviewPickupRequestForm';
import Hero from '@/components/ui/hero';
import MapRouteComponent from '@/components/common/MapRouteComponent';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
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

const CollectorPickupDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pickupId } = useParams();
  const pickup = useSelector((state) => state.pickup.selectedPickup);

  const [isFetching, setIsFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPickup = async () => {
      await dispatch(getPickup(pickupId));
      setIsFetching(false);
    };
    fetchPickup();

    return () => {
      dispatch(clearSelectedPickup());
    };
  }, [dispatch, pickupId]);

  const updateHandler = async (data) => {
    await dispatch(updatePickup({ pickupId, ...data }));
    await dispatch(getPickup(pickupId));
    setDialogOpen(false);
  };

  const renderPickupStatus = (status) => {
    let statusClass = 'text-gray-500 capitalize font-semibold';
    let statusText = status;

    switch (status) {
      case 'pending':
        statusClass = 'text-yellow-500 capitalize font-semibold';
        break;
      case 'accepted':
        statusClass = 'text-green-500 capitalize font-semibold';
        break;
      case 'rejected':
        statusClass = 'text-red-500 capitalize font-semibold';
        break;
      default:
        statusClass = 'text-gray-500 capitalize font-semibold';
    }

    return <span className={statusClass}>{statusText}</span>;
  };

  const handleCompletePickup = async () => {
    await dispatch(updateHandler({ decision: 'complete' }));
  };

  return (
    <>
      <Hero
        title="Business Pickup Request Detail"
        subtitle="View the details of the business's pickup request."
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <div className="flex justify-between mb-4">
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>

          {pickup?.status === 'pending' && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Review Pickup Request
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='mb-2'>
                    Review Business Pickup Request Form
                  </DialogTitle>
                  <DialogDescription>
                    Please review the business pickup request before submitting.
                  </DialogDescription>
                </DialogHeader>

                <ReviewPickupRequestForm
                  submitHandler={updateHandler}
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
          )}

          {pickup?.status === 'accepted' && !pickup?.completed_at && (
            <Button onClick={handleCompletePickup} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Mark as Complete
            </Button>
          )}
        </div>

        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2 underline">Pickup Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold mb-2">E-Waste Type:</span>
                {isFetching ? (
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                ) : (
                  <div className='max-w-md'>
                    {pickup?.waste_payload.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span className="capitalize">{item.label}</span>
                        <span>(Quantity: {item.quantity})</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Request Date:</span>
                {isFetching ?
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' /> :
                  toShortDateFormat(pickup?.requested_at)
                }
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Request Pickup Date:</span>
                {isFetching ?
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' /> :
                  toShortDateTimeFormat(pickup?.request_pickup_time)
                }
              </div>
              {!isFetching && (
                <>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Status:</span>
                    {renderPickupStatus(pickup?.status)}
                  </div>
                  {pickup?.status !== 'pending' && (
                    <>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Status Update Date:</span>
                        {toShortDateTimeFormat(pickup?.accepted_rejected_at)}
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Remark:</span>
                        {pickup?.remark ?? 'N/A'}
                      </div>
                    </>
                  )}
                </>
              )}
              {pickup?.status === 'accepted' && (
                <>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Completed Status:</span>
                    {isFetching ? (
                      <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                    ) : (
                      pickup?.completed_at ? (
                        <span className='text-green-500 capitalize font-semibold'>Completed</span>
                      ) : (
                        <span className='text-yellow-500 capitalize font-semibold'>Pending</span>
                      )
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Completed at:</span>
                    {isFetching ? (
                      <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                    ) : (
                      pickup?.completed_at ? (
                        toShortDateTimeFormat(pickup?.completed_at)
                      ) : (
                        'N/A'
                      )
                    )}
                  </div>
                </>
              )}
            </div>

            <Separator className="my-4" />

            <h2 className="text-lg font-semibold mb-2 underline">Pick Up Address Details</h2>
            {pickup && (
              <div className='rounded-lg overflow-hidden mb-4'>
                <MapRouteComponent
                  clientCordinate={{ lat: pickup?.collector_branch?.address.latitude, lng: pickup?.collector_branch?.address.longitude }}
                  hotspotCordinate={{ lat: pickup?.latitude, lng: pickup?.longitude }}
                />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Requestor Branch Name:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.requestor_branch?.name}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Requestor Branch Email:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.requestor_branch?.email}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Requestor Branch Phone:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.requestor_branch?.phone}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Street:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.street}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">City:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.city}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">State:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.state}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">ZIP Code:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.zip}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default CollectorPickupDetail;