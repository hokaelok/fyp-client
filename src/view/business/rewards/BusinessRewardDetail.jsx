import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedReward, getReward, updateReward } from '@/redux/slice/business/rewardSlice';
import { toShortDateTimeFormat } from '@/lib/data-formatter';

import RewardForm from '@/components/business/rewards/form/RewardForm';
import Hero from '@/components/ui/hero';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent } from '@/components/ui/card';
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

const BusinessRewardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rewardId } = useParams();
  const reward = useSelector((state) => state.reward.selectedReward);

  const [isFetching, setIsFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReward = async () => {
      await dispatch(getReward(rewardId));
      setIsFetching(false);
    };
    fetchReward();

    return () => {
      dispatch(clearSelectedReward());
    };
  }, [dispatch, rewardId]);

  const updateHandler = async (data) => {
    await dispatch(updateReward({
      id: rewardId,
      ...data
    }));
    await dispatch(getReward(rewardId));
    setDialogOpen(false);
  };

  return (
    <>
      <Hero
        title="Reward Detail"
        subtitle="View your reward details"
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
                Edit Reward
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className='mb-2'>
                  Edit Reward Details
                </DialogTitle>
                <DialogDescription>
                  Update your reward details
                </DialogDescription>
              </DialogHeader>

              <RewardForm
                reward={reward}
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
        </div>

        <Card className="w-full p-6 bg-white shadow-lg rounded-lg">
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex justify-center w-full">
                {isFetching ? <Skeleton className='h-24 bg-gray-200 rounded w-24' /> : <img src={reward?.image} alt="Reward" className="max-h-40 w-full object-cover rounded" />}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Reward Name:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : reward?.name}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Description:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : reward?.description}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Points:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : reward?.points}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Claimable Start Date:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(reward?.startTime)}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Claimable End Date:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(reward?.endTime)}
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Expiry Date:</span>
                {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : toShortDateTimeFormat(reward?.expiryTime)}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default BusinessRewardDetail;
