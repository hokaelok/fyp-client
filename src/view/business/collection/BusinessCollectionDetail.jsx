import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedCollection, getCollection } from '@/redux/slice/business/collectionSlice';
import { to12HourFormat, toShortDateFormat, toShortDateTimeFormat } from '@/lib/data-formatter';

import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const BusinessCollectionDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { collectionId } = useParams();
  const collection = useSelector(state => state.collection.selectedCollection);

  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchCollection = async () => {
      await dispatch(getCollection(collectionId));
      setIsFetching(false);
    };
    fetchCollection();

    return () => {
      dispatch(clearSelectedCollection());
    };
  }, [dispatch, collectionId]);

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
                      {collection?.waste_payload.map((item) => (
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
                  toShortDateFormat(collection?.requested_at)
                )}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Request Pickup Date:</span>
                {isFetching ? (
                  <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                ) : (
                  toShortDateTimeFormat(collection?.request_pickup_time)
                )}
              </div>
              {!isFetching && (
                <>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Status:</span>
                    {renderStatus(collection?.status)}
                  </div>
                  {collection?.status !== 'pending' && (
                    <>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Status Update Date:</span>
                        {toShortDateTimeFormat(collection?.accepted_rejected_at)}
                      </div>
                      <div className="flex items-center">
                        <span className="font-semibold mr-2">Remark:</span>
                        {collection?.remark ?? 'N/A'}
                      </div>
                    </>
                  )}
                </>
              )}
              {!collection?.status === 'pending' && (
                <div className="flex items-center">
                  <span className="font-semibold mr-2">Status Update Date:</span>
                  {isFetching ? (
                    <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                  ) : (
                    toShortDateTimeFormat(collection?.accepted_rejected_at)
                  )}
                </div>
              )}
              {collection?.status === 'accepted' && (
                <>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Completed Status:</span>
                    {isFetching ? (
                      <Skeleton className='h-4 bg-gray-200 rounded w-40' />
                    ) : (
                      collection?.completed_at ? (
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
                      collection?.completed_at ? (
                        toShortDateTimeFormat(collection?.completed_at)
                      ) : (
                        'N/A'
                      )
                    )}
                  </div>
                </>
              )}
            </div>

            <Separator className="my-4" />

            <h2 className="text-lg font-semibold mb-2 underline">Pick Up Branch Details</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Branch Name:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.requestor_branch.name}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Street:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.requestor_branch.address.street}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">City:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.requestor_branch.address.city}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">State:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.requestor_branch.address.state}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">ZIP Code:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.requestor_branch.address.zip}
              </div>
            </div>

            <Separator className="my-4" />

            <h2 className="text-lg font-semibold mb-2 underline">Collector Info</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector Name:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.name}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector Email:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.email}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector Phone:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.phone}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector Business Open Hour:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : to12HourFormat(collection?.collector_branch?.operational_time.open_time)}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector Business Close Hour:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : to12HourFormat(collection?.collector_branch?.operational_time.close_time)}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector Street:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.address?.street}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector City:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.address?.city}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector State:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.address?.state}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Collector ZIP Code:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : collection?.collector_branch?.address?.zip}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default BusinessCollectionDetail;