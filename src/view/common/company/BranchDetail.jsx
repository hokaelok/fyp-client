import React, { useEffect, useState } from 'react';

import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getBranch, clearSelectedBranch, updateBranch } from '@/redux/slice/business/companySlice';

import EditBranchForm from '@/components/common/branch/form/EditBranchForm';
import Hero from '@/components/ui/hero';
import AddressPinComponent from '@/components/common/AddressPinComponent';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Card,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
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
import { to12HourFormat } from '@/lib/data-formatter';

const BranchDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { branchId } = useParams();
  const branch = useSelector((state) => state.company.selectedBranch);

  const [isFetching, setIsFetching] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBranch = async () => {
      await dispatch(getBranch(branchId));
      setIsFetching(false);
    };
    fetchBranch();

    return () => {
      dispatch(clearSelectedBranch());
    };
  }, [dispatch, branchId]);


  const submitHandler = async (data) => {
    await dispatch(updateBranch(data));
    await dispatch(getBranch(branchId));
    setDialogOpen(false);
  };

  return (
    <>
      <Hero
        title="Branch Detail"
        subtitle="View your branch details"
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
                Edit Branch
              </Button>
            </DialogTrigger>
            <DialogContent className="overflow-y-scroll max-h-[90vh]">
              <DialogHeader>
                <DialogTitle className='mb-2'>
                  Edit Branch Details
                </DialogTitle>
                <DialogDescription>
                  Update your branch details
                </DialogDescription>
              </DialogHeader>

              <EditBranchForm
                branch={branch}
                submitHandler={submitHandler}
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
          <CardHeader>
            <h1 className="text-3xl font-bold text-center mb-4">
              {isFetching ? <Skeleton className='h-6 bg-gray-200 rounded w-full' /> : branch?.name}
            </h1>
          </CardHeader>
          <CardContent>
            <div className="h-60 rounded-lg overflow-hidden mb-4">
              {isFetching ? (

                <Skeleton className='h-60 bg-gray-200 rounded w-full' />
              ) : (
                <AddressPinComponent addressCordinate={{
                  lat: parseFloat(branch?.address.latitude),
                  lng: parseFloat(branch?.address.longitude),
                }}
                  home
                />
              )}
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center">
                <span className="font-semibold mr-2">Email:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : branch?.email}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Phone:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : branch?.phone}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Business Start Time:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : to12HourFormat(branch?.startHour)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Business End Time:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : to12HourFormat(branch?.endHour)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Street:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : branch?.address.street}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">City:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : branch?.address.city}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">State:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : branch?.address.state}
                </span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Zip:</span>
                <span>
                  {isFetching ? <Skeleton className='h-4 bg-gray-200 rounded w-40' /> : branch?.address.zip}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default BranchDetail;
