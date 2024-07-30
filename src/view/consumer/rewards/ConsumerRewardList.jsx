import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearRewards, getPoints, getRewards } from '@/redux/slice/consumer/rewardSlice';

import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Award } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const ConsumerRewardList = () => {
  const dispatch = useDispatch();

  const rewards = useSelector((state) => state.reward.rewards);
  const points = useSelector((state) => state.reward.points);

  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchRewards = async () => {
      setLoading(true);
      await dispatch(getPoints());
      await dispatch(getRewards());
      setLoading(false);
    };
    fetchRewards();

    return () => {
      dispatch(clearRewards());
    };
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <Hero
          title="Earn Rewards for Recycling"
          subtitle="Discover how you can earn rewards by participating in e-waste recycling programs"
          backgroundColor="bg-blue-500"
          textColor="text-white"
        />

        <section className="px-4 py-5 grid grid-cols-3 gap-4">
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
          <Skeleton className="h-40" />
        </section>
      </>
    );
  }

  return (
    <>
      <Hero
        title="Earn Rewards for Recycling"
        subtitle="Discover how you can earn rewards by participating in e-waste recycling programs"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className="px-4 py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold p-1 mb-4">My Points</h3>
            <div className="flex flex-col gap-2 h-72">
              <Card className="h-40 flex items-center justify-center bg-gradient-to-r from-blue-400 to-indigo-600 text-white shadow-lg rounded-lg">
                <CardContent className="text-center pt-4">
                  <div className="flex justify-center items-center gap-3">
                    <h4 className="text-2xl font-semibold mb-2">Points</h4>
                    <Award className="h-8 w-8 mb-2" />
                  </div>
                  <h2 className="text-6xl font-semibold">
                    {points}
                  </h2>
                </CardContent>
              </Card>

              <Link to="/consumer/rewards/redeemed">
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                  Redeemed Rewards
                </Button>
              </Link>
              <Link to="/consumer/rewards/history">
                <Button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">
                  History
                </Button>
              </Link>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 relative">
            <h3 className="text-2xl font-bold p-1 mb-4">
              Upcoming
            </h3>
            <div className="relative w-full h-64">
              {rewards.upcoming.length > 0 ? (
                <Carousel opts={{ align: "start", loop: true }}>
                  <CarouselContent className="flex space-x-4">
                    {rewards.upcoming.map((reward) => (
                      <CarouselItem key={reward.id} className="flex-none w-2/3 lg:w-1/2">
                        <Link to={`/consumer/rewards/${reward.id}`}>
                          <img
                            src={reward.image}
                            alt={reward.name}
                            className="h-64 w-full object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                          />
                        </Link>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    &lt;
                  </CarouselPrevious>
                  <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md">
                    &gt;
                  </CarouselNext>
                </Carousel>
              ) : (
                <div className='h-full flex justify-center items-center text-2xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-600 text-white shadow-lg rounded-lg'>
                  More Rewards Coming Soon!
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-3">
            <h3 className="text-2xl font-bold p-1 mb-4">
              Rewards
            </h3>
            {rewards.active.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {rewards.active.map((reward) => (
                  <Card key={reward.id} className="flex flex-col justify-between cursor-pointer hover:shadow-lg transition-shadow duration-200">
                    <CardHeader className="p-0">
                      <img src={reward.image} alt={reward.name} className="h-32 w-full object-cover rounded-t-lg" />
                    </CardHeader>
                    <CardContent className="p-4 flex flex-col flex-grow">
                      <CardTitle className="text-xl font-semibold mb-2">{reward.name}</CardTitle>
                      <p className="text-gray-500 mb-4">{reward.description}</p>
                      <div className="mt-auto flex justify-between rewards-center">
                        <p className="text-lg font-semibold">{reward.required_points} Points</p>
                        <Link to={`/consumer/rewards/${reward.id}`}>
                          <Button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Redeem
                          </Button>
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className='h-72 flex justify-center items-center text-2xl font-semibold bg-gradient-to-r from-blue-400 to-indigo-600 text-white shadow-lg rounded-lg'>
                More Rewards Coming Soon!
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsumerRewardList;
