import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearTransactionHistory, getTransactionHistory } from "@/redux/slice/consumer/rewardSlice";

import Hero from "@/components/ui/hero";
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const ConsumerPointsHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const history = useSelector((state) => state.reward.transactionHistory);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      await dispatch(getTransactionHistory());
      setLoading(false);
    };
    fetchHistory();

    return () => {
      dispatch(clearTransactionHistory());
    };
  }, [dispatch]);

  const renderSkeletons = () => {
    return (
      <>
        <Skeleton className="h-16 mb-4" />
        <Skeleton className="h-16 mb-4" />
        <Skeleton className="h-16 mb-4" />
      </>
    );
  };

  const renderHistory = () => {
    if (history.length === 0) {
      return (
        <div className="h-16 flex justify-center items-center text-2xl font-semibold text-gray-500">
          No transaction history available.
        </div>
      );
    }

    return history.map((item, index) => {
      const isEarn = item.transaction_type === 'earn';
      const bgColor = isEarn ? 'bg-green-100' : 'bg-red-100';
      const iconColor = isEarn ? 'text-green-500' : 'text-red-500';
      const textColor = isEarn ? 'text-green-700' : 'text-red-700';
      const points = isEarn ? `+${item.point}` : `-${item.point}`;

      const additionalInfo = isEarn
        ? item.consumerPickup?.branch?.name
        : item.reward?.name;

      return (
        <div key={index} className={`flex justify-between items-center p-4 mb-4 rounded-lg shadow-md ${bgColor}`}>
          <div className="flex items-center">
            <span className='mr-4'>
              {isEarn ?
                <PlusCircle className={iconColor} /> :
                <MinusCircle className={iconColor} />
              }
            </span>
            <div className='flex flex-col'>
              <span className={`text-lg font-semibold ${textColor}`}>
                {points} points
              </span>
              <span className='text-sm text-gray-500'>{new Date(item.created_at).toLocaleString()}</span>
            </div>
          </div>
          <span className='text-gray-700 font-semibold'>
            {additionalInfo || 'N/A'}
          </span>
        </div>
      );
    });
  };

  return (
    <>
      <Hero
        title="Points History"
        subtitle="View your points history"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <div className="flex justify-between mb-4">
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        {loading ? renderSkeletons() : renderHistory()}
      </section>
    </>
  );
};

export default ConsumerPointsHistory;
