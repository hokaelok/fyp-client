import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearPickupList, getPickups } from '@/redux/slice/consumer/pickupSlice';

import Hero from '@/components/ui/hero';
import ConsumerPickupDataTable from '@/components/consumer/pickup/dataTable/ConsumerPickupDataTable';
import ConsumerPickupColumns from '@/components/consumer/pickup/dataTable/ConsumerPickupColumns';

const ConsumerRequestList = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);
  const pickupList = useSelector((state) => state.pickup.pickupList);

  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const fetchPickupList = async () => {
      setIsFetchingData(true);
      await dispatch(getPickups({ id: user.id, type: 'consumer' }));
      setIsFetchingData(false);
    };
    fetchPickupList();

    return () => {
      dispatch(clearPickupList());
    };
  }, [dispatch, user]);

  return (
    <>
      <Hero
        title="Pickup Request List"
        subtitle="View your pending and completed pickup requests"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className="px-4 py-5">
        <ConsumerPickupDataTable
          columns={ConsumerPickupColumns}
          data={pickupList}
          isFetchingData={isFetchingData}
        />
      </section>
    </>
  );
};

export default ConsumerRequestList;