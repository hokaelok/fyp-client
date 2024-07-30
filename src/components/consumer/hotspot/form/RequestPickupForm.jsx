import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import WastePayloadPopover from '@/components/ui/waste-payload-popover';
import CustomDatePicker from '@/components/ui/date-time-picker';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from "@/components/ui/button";
import { Loader2 } from 'lucide-react';
import { clearBookedSlots, getBookedSlots } from '@/redux/slice/consumer/pickupSlice';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  contactNumber: yup.string().required('Contact Number is required'),
  wastePayload: yup.array().min(1, 'At least one item is required').of(
    yup.object().shape({
      id: yup.number().required(),
      label: yup.string().required(),
      quantity: yup.number().min(1, 'Quantity must be at least 1').required(),
    })
  ),
  requestPickupTime: yup.string().required('Request Pickup Time is required'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required').matches(/^\d{5}$/, 'Invalid zip code format'),
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

const RequestPickupForm = ({ hotspot, submitHandler }) => {
  const dispatch = useDispatch();
  const bookedSlots = useSelector((state) => state.pickup.bookedSlots);

  useEffect(() => {
    dispatch(getBookedSlots({ branchId: hotspot.address.branch_id }));

    return () => {
      dispatch(clearBookedSlots());
    };
  }, [dispatch, hotspot]);

  const [wastePayload, setWastePayload] = useState([]);

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const wastePayloadHandler = (payload) => {
    setWastePayload(payload);
    setValue('wastePayload', payload);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="name">
          Name
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Your Name"
          type="text"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="contactNumber">
          Contact Number
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="contactNumber"
          {...register('contactNumber')}
          placeholder="Contact Number"
          type="text"
        />
        {errors.contactNumber && <p className="text-red-500 text-xs">{errors.contactNumber.message}</p>}
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
          Request Pickup Time
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
              openTime={hotspot?.operational_time?.open_time}
              closeTime={hotspot?.operational_time?.close_time}
            />
          )}
        />
        {errors.requestPickupTime && <p className="text-red-500 text-xs">{errors.requestPickupTime.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="street">
          Street
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="street"
          {...register('street')}
          placeholder="Street"
          type="text"
        />
        {errors.street && <p className="text-red-500 text-xs">{errors.street.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="city">
          City
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="city"
          {...register('city')}
          placeholder="City"
          type="text"
        />
        {errors.city && <p className="text-red-500 text-xs">{errors.city.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="state">
          State
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="state"
          {...register('state')}
          placeholder="State"
          type="text"
        />
        {errors.state && <p className="text-red-500 text-xs">{errors.state.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="zip">
          Zip Code
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="zip"
          {...register('zip')}
          placeholder="Zip Code"
          type="text"
        />
        {errors.zip && <p className="text-red-500 text-xs">{errors.zip.message}</p>}
      </div>

      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
        Request Pickup
      </Button>
    </form>
  );
};

export default RequestPickupForm;
