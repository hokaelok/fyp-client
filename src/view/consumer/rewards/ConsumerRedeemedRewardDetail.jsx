import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedRedeemedReward, getRedeemedReward, useReward } from '@/redux/slice/consumer/rewardSlice';
import { toShortDateTimeFormat } from '@/lib/data-formatter';

import { Button } from '@/components/ui/button';
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
import { Skeleton } from '@/components/ui/skeleton';
import { Loader2 } from 'lucide-react';

const ConsumerRedeemedRewardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { redeemedRewardId } = useParams();
  const redeem = useSelector((state) => state.reward.selectedRedeemedReward);

  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReward = async () => {
      setLoading(true);
      await dispatch(getRedeemedReward(redeemedRewardId));
      setLoading(false);
    };
    fetchReward();

    return () => {
      dispatch(clearSelectedRedeemedReward());
    };
  }, [dispatch, redeemedRewardId]);

  if (loading) {
    return (
      <>
        <section className='px-4 py-5 flex flex-col gap-4'>
          <Skeleton className='h-64 w-full' />
          <Skeleton className='h-12 w-80' />
          <Skeleton className='h-36 w-1/2' />
          <Skeleton className='h-64 w-full' />
        </section>
      </>
    );
  }

  if (!redeem) {
    return (
      <>
        <section className='px-4 py-5 flex flex-col gap-4'>
          <p className='text-2xl font-semibold text-center'>
            Reward not found
          </p>
          <Button
            className='bg-gray-300 text-gray-900 hover:bg-gray-400 px-4 py-2 rounded-md'
            onClick={() => navigate(-1)}
          >
            Back
          </Button>
        </section>
      </>
    );
  }

  const useHandler = async () => {
    setRedeeming(true);
    await dispatch(useReward({
      redeemId: redeem.id,
    }));
    await dispatch(getRedeemedReward(redeemedRewardId));
    setRedeeming(false);
    setDialogOpen(false);
  };

  const renderValidityPeriod = () => {
    if (redeem.used_at) {
      return `Used on ${toShortDateTimeFormat(redeem.used_at)}`;
    } else if (new Date(redeem.reward.expiry_time) < new Date()) {
      return `Expired on ${toShortDateTimeFormat(redeem.reward.expiry_time)}`;
    } else {
      return `Valid from ${toShortDateTimeFormat(redeem.reward.start_time)} - ${toShortDateTimeFormat(redeem.reward.end_time)}`;
    }
  };

  return (
    <>
      <section>
        <img
          src={redeem.reward.image}
          alt={redeem.reward.name}
          className='h-64 w-full object-cover'
        />
        <div className='p-6'>
          <div className='flex items-center mb-6'>
            <img
              src={redeem.company.logo}
              alt={redeem.company.name}
              className='h-20 w-28 rounded-lg mr-5'
            />
            <h3 className='text-2xl font-semibold'>
              {redeem.company.name}
            </h3>
          </div>

          <h1 className='text-3xl font-semibold mb-4'>
            {redeem.reward.name}
          </h1>
          <div className="mb-14">
            <p className='text-gray-900 mb-6 font-semibold'>
              {redeem.reward.required_points} Points
            </p>
            {redeem.used_at && (
              <div className='mb-6'>
                <p className='text-gray-900 mb-6 font-semibold'>
                  Usage Code: {redeem.reference_code}
                </p>
              </div>
            )}
            <div className='mb-6'>
              <p className='text-gray-700'>
                {redeem.reward.description}
              </p>
            </div>
            <div className='mb-6'>
              <p className='text-gray-900 font-semibold'>
                {renderValidityPeriod()}
              </p>
            </div>
          </div>

          <div className='flex justify-between items-center'>
            <Button
              className='bg-gray-300 text-gray-900 hover:bg-gray-400 px-4 py-2 rounded-md'
              onClick={() => navigate(-1)}
            >
              Back
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              {!redeem.used_at && (
                <DialogTrigger asChild>
                  <Button className='bg-blue-500 text-white px-6 py-2 rounded-md'>
                    Use Reward
                  </Button>
                </DialogTrigger>
              )}

              <DialogContent>
                <DialogHeader className='mb-5'>
                  <DialogTitle className='mb-2'>
                    Use Reward Confirmation
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to use this reward?
                  </DialogDescription>
                </DialogHeader>

                <DialogFooter className='flex gap-2'>
                  <DialogClose asChild>
                    <Button className='bg-gray-300 text-gray-900 hover:bg-gray-400 px-4 py-2 rounded-md'>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    className='bg-blue-500 text-white px-6 py-2 rounded-md'
                    onClick={useHandler}
                    disabled={redeeming}
                  >
                    {redeeming && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConsumerRedeemedRewardDetail;
