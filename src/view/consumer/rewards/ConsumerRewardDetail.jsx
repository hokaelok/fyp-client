import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedReward, getReward, redeemReward } from '@/redux/slice/consumer/rewardSlice';
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

const ConsumerRewardDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { rewardId } = useParams();
  const reward = useSelector((state) => state.reward.selectedReward);
  const points = useSelector((state) => state.reward.points);
  const user = useSelector((state) => state.user.user);

  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchReward = async () => {
      setLoading(true);
      await dispatch(getReward(rewardId));
      setLoading(false);
    };
    fetchReward();

    return () => {
      dispatch(clearSelectedReward());
    };
  }, [dispatch, rewardId]);

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

  if (!reward) {
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

  const redeemHandler = async () => {
    setRedeeming(true);
    await dispatch(redeemReward({
      rewardId: reward.id,
      userId: user.id
    }));
    setRedeeming(false);
    setDialogOpen(false);
  };

  const canRedeem = points >= reward.required_points;

  return (
    <>
      <section>
        <img
          src={reward.image}
          alt={reward.name}
          className='h-64 w-full object-cover'
        />
        <div className='p-6'>
          <div className='flex items-center mb-6'>
            <img
              src={reward.company.logo}
              alt={reward.company.name}
              className='h-20 w-28 rounded-lg mr-5'
            />
            <h3 className='text-2xl font-semibold'>
              {reward.company.name}
            </h3>
          </div>

          <h1 className='text-3xl font-semibold mb-4'>
            {reward.name}
          </h1>
          <div className="mb-14">
            <p className='text-gray-900 mb-6 font-semibold'>
              {reward.required_points} Points
            </p>
            <div className='mb-6'>
              <p className='text-gray-700'>
                {reward.description}
              </p>
            </div>
            <div className='mb-6'>
              <p className='text-gray-900 font-semibold'>
                {`Valid from ${toShortDateTimeFormat(reward.start_time)} - ${toShortDateTimeFormat(reward.end_time)}`}
              </p>
            </div>

            <div className='mb-6'>
              <h2 className='font-semibold mb-2'>
                How to redeem Your Reward:
              </h2>
              <div className='flex flex-col gap-3'>
                <div>
                  <span className='font-semibold mb-2 underline'>Step 1: Redeem Your Reward</span>
                  <p>Click on the reward you wish to redeem. A unique reference code will be generated for you.</p>
                </div>
                <div>
                  <span className='font-semibold mb-2 underline'>Step 2: Use Your Reference Code</span>
                  <p>Show the generated reference code to the business to redeem your reward. Ensure you do this before the code expires.</p>
                </div>
                <div>
                  <span className='font-semibold mb-2 underline'>Step 3: Enjoy Your Reward</span>
                  <p>Once your reference code is verified, enjoy your reward and keep an eye out for more exciting offers.</p>
                </div>
              </div>
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
              <DialogTrigger asChild>
                <Button
                  className='bg-blue-500 text-white px-6 py-2 rounded-md'
                  disabled={!canRedeem}
                >
                  {canRedeem ? 'Redeem' : 'Insufficient Points'}
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader className='mb-5'>
                  <DialogTitle className='mb-2'>
                    Redeem Confirmation
                  </DialogTitle>
                  <DialogDescription>
                    Are you sure you want to redeem this reward?
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
                    onClick={redeemHandler}
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

export default ConsumerRewardDetail;
