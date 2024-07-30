import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { clearBookedSlots, getBookedSlots } from '@/redux/slice/business/collectionSlice';
import { clearBranches, getBranches } from '@/redux/slice/business/companySlice';

import WastePayloadPopover from '@/components/ui/waste-payload-popover';
import CustomDatePicker from '@/components/ui/date-time-picker';
import { Label } from '@/components/ui/label';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = yup.object().shape({
  requestorBranchId: yup.number().required('Branch is required'),
  wastePayload: yup.array().min(1, 'At least one item is required').of(
    yup.object().shape({
      id: yup.number().required(),
      label: yup.string().required(),
      quantity: yup.number().min(1, 'Quantity must be at least 1').required(),
    })
  ),
  requestPickupTime: yup.string().required('Request Collection Time is required'),
});

const items = [
  { id: 1, label: "mobile device", quantity: 0 },
  { id: 2, label: "computer", quantity: 0 },
  { id: 3, label: "screen & tv", quantity: 0 },
  { id: 4, label: "computer accessories", quantity: 0 },
  { id: 5, label: "audio device", quantity: 0 },
  { id: 6, label: "camera", quantity: 0 },
  { id: 7, label: "printer & scanner", quantity: 0 },
  { id: 8, label: "network equipment", quantity: 0 },
  { id: 9, label: "battery", quantity: 0 },
  { id: 10, label: "microwave", quantity: 0 },
  { id: 11, label: "air conditioner", quantity: 0 },
  { id: 12, label: "washing machine", quantity: 0 },
];

const RequestCollectionForm = ({ collector, submitHandler }) => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const branches = useSelector((state) => state.company.branches);
  const bookedSlots = useSelector((state) => state.collection.bookedSlots);

  useEffect(() => {
    const fetchBranches = async () => {
      await dispatch(getBookedSlots({ branchId: collector.id }));
      await dispatch(getBranches(company.id));
    };
    fetchBranches();

    return () => {
      dispatch(clearBookedSlots());
      dispatch(clearBranches());
    };
  }, [dispatch, collector]);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const wastePayloadHandler = (payload) => {
    setValue('wastePayload', payload);
  };

  const handleBranchChange = (branchId) => {
    const selectedBranch = branches.find(branch => branch.id === parseInt(branchId));
    if (selectedBranch) setValue('requestorBranchId', selectedBranch.id);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="requestorBranchId">
          Branch
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Controller
          name="requestorBranchId"
          control={control}
          render={({ field }) => (
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleBranchChange(value);
              }}
              value={field.value || ''}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                {branches.map((branch) => (
                  <SelectItem key={branch.id} value={branch.id}>
                    {branch.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.requestorBranchId && <p className="text-red-500 text-xs">{errors.requestorBranchId.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="wastePayload">
          E-Waste Payload
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Controller
          name="wastePayload"
          control={control}
          render={({ field }) => (
            <WastePayloadPopover
              items={items}
              onChange={wastePayloadHandler}
            />
          )}
        />
        {errors.wastePayload && <p className="text-red-500 text-xs">{errors.wastePayload.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="requestPickupTime">
          Request Collection Time
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Controller
          name="requestPickupTime"
          control={control}
          render={({ field }) => (
            <CustomDatePicker
              value={field.value}
              onChange={field.onChange}
              disabledDateTimes={bookedSlots}
              openTime={collector?.operational_time?.open_time}
              closeTime={collector?.operational_time?.close_time}
            />
          )}
        />
        {errors.requestPickupTime && <p className="text-red-500 text-xs">{errors.requestPickupTime.message}</p>}
      </div>

      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
        Request Collection
      </Button>
    </form>
  );
};

export default RequestCollectionForm;
