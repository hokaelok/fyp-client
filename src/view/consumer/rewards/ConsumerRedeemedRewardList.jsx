import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearRedeemedRewards,
  getRedeemedRewards,
} from '@/redux/slice/consumer/rewardSlice';
import { toShortDateTimeFormat } from '@/lib/data-formatter';

import Hero from "@/components/ui/hero";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const ConsumerRedeemedRewardList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const redeemedRewards = useSelector((state) => state.reward.redeemedRewards);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      await dispatch(getRedeemedRewards());
      setLoading(false);
    };
    fetchRewards();

    return () => {
      dispatch(clearRedeemedRewards());
    };
  }, [dispatch]);

  const renderRewards = (rewards, status) => {
    if (loading) {
      return (
        <>
          <Skeleton className="h-40 mb-4" />
          <Skeleton className="h-40 mb-4" />
          <Skeleton className="h-40 mb-4" />
        </>
      );
    }

    if (rewards.length === 0) {
      return (
        <>
          <div className="h-40 flex justify-center items-center text-2xl font-semibold text-gray-500 capitalize">
            No {status} Rewards
          </div>
          <div className="h-40 flex justify-center items-center text-2xl font-semibold text-gray-500 capitalize">
            No {status} Rewards
          </div>
        </>
      );
    }

    return rewards.map((reward) => (
      <Card key={reward.id}
        className="flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200"
      >
        <CardHeader className="p-0">
          <img
            src={reward.reward.image}
            className="h-32 w-full object-cover rounded-t-lg"
            alt={reward.reward.name}
          />
        </CardHeader>
        <CardContent className="p-4 flex flex-col flex-grow">
          <CardTitle className="text-xl font-semibold mb-2">
            {reward.reward.name}
          </CardTitle>
          {status === 'active' && (
            <p className="text-gray-500 mb-4">
              Valid until {toShortDateTimeFormat(reward.reward.expiry_time)}
            </p>
          )}
          {status === 'used' && (
            <p className="text-gray-500 mb-4">
              Used on {toShortDateTimeFormat(reward.used_at)}
            </p>
          )}
          {status === 'expired' && (
            <p className="text-gray-500 mb-4">
              Expired on {toShortDateTimeFormat(reward.reward.expiry_time)}
            </p>
          )}
          <Button
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={() => navigate(`/consumer/rewards/redeemed/${reward.reward.id}`)}
          >
            View
          </Button>
        </CardContent>
      </Card>
    ));
  };

  return (
    <>
      <Hero
        title="Redeemed Rewards"
        subtitle="View your redeemed rewards here"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <div className="flex justify-between mb-4">
          <Button onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>

        <Tabs defaultValue="active" className='mb-5'>
          <div className='w-full flex justify-center mb-5'>
            <TabsList className="w-full flex justify-around">
              <TabsTrigger value="active"
                className="flex-1 text-center text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white py-2 rounded-t-lg"
              >
                Active
              </TabsTrigger>
              <TabsTrigger value="used"
                className="flex-1 text-center text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white py-2 rounded-t-lg"
              >
                Used
              </TabsTrigger>
              <TabsTrigger value="expired"
                className="flex-1 text-center text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white py-2 rounded-t-lg"
              >
                Expired
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="active">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderRewards(redeemedRewards.active, 'active')}
            </div>
          </TabsContent>

          <TabsContent value="used">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderRewards(redeemedRewards.used, 'used')}
            </div>
          </TabsContent>

          <TabsContent value="expired">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {renderRewards(redeemedRewards.expired, 'expired')}
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </>
  );
};

export default ConsumerRedeemedRewardList;
