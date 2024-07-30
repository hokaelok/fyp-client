import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedPickup, getPickup } from '@/redux/slice/consumer/pickupSlice';
import { toShortDateFormat, toShortDateTimeFormat } from '@/lib/data-formatter';

import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const ConsumerRequestDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { requestId } = useParams();
  const pickup = useSelector((state) => state.pickup.selectedPickup);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchPickup = async () => {
      await dispatch(getPickup(requestId));
      setIsFetching(false);
    };
    fetchPickup();

    return () => {
      dispatch(clearSelectedPickup());
    };
  }, [dispatch, requestId]);

  const renderStatus = (status) => {
    switch (status) {
      case 'pending':
        return <span className='text-yellow-500 capitalize font-semibold'>{status}</span>;
      case 'accepted':
        return <span className='text-green-500 capitalize font-semibold'>{status}</span>;
      case 'rejected':
        return <span className='text-red-500 capitalize font-semibold'>{status}</span>;
      default:
        return <span className='text-gray-500 capitalize font-semibold'>{status}</span>;
    }
  };

  return (
    <>
      <Hero
        title="Pickup Request Detail"
        subtitle="View your pickup request details"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <div className="flex justify-between mb-4">
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
          <CardContent>
            <h2 className="text-lg font-semibold mb-2 underline">Pickup Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex flex-col">
                <span className="font-semibold mb-2">E-Waste Payload:</span>
                {isFetching ? (
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                ) : (
                  <>
                    <div className='max-w-md'>
                      {pickup?.waste_payload.map((item) => (
                        <div key={item.id} className="flex justify-between">
                          <span className="capitalize">{item.label}</span>
                          <span>(Quantity: {item.quantity})</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Request Date:</span>
                {isFetching ? (
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                ) : (
                  toShortDateFormat(pickup?.requested_at)
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Request Pickup Date:</span>
                {isFetching ? (
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                ) : (
                  toShortDateTimeFormat(pickup?.request_pickup_time)
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Status:</span>
                {isFetching ? (
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                ) : (
                  renderStatus(pickup?.status)
                )}
              </div>
              {pickup?.status !== 'pending' && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Remark:</span>
                  {isFetching ? (
                    <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                  ) : (
                    pickup?.remark ?? 'N/A'
                  )}
                </div>
              )}
              {!pickup?.status === 'pending' && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Status Update Date:</span>
                  {isFetching ? (
                    <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                  ) : (
                    toShortDateTimeFormat(pickup?.accepted_rejected_at)
                  )}
                </div>
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
            <div className="grid grid-cols-1 gap-4">
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

            <Separator className="my-4" />

            <h2 className="text-lg font-semibold mb-2 underline">Branch Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch Name:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.name}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch Email:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.email}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch Phone:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.phone}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch City:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.address?.city}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch State:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.address?.state}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch Street:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.address?.street}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch ZIP Code:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.address?.zip}
              </div>
            </div>

            <Separator className="my-4" />

            <h2 className="text-lg font-semibold mb-2 underline">Company Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Company Name:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : pickup?.branch?.company?.name}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Company Website:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : <a href={pickup?.branch?.company?.website} target="_blank" rel="noopener noreferrer">{pickup?.branch?.company?.website}</a>}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default ConsumerRequestDetail;
