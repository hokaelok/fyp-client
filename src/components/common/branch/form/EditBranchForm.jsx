import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  branchName: yup.string()
    .required('Branch Name is required'),
  contactNumber: yup.string()
    .required('Contact Number is required'),
  email: yup.string()
    .required('Email is required')
    .email('Invalid email format'),
  businessStartHour: yup.string()
    .required('Business start hour is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  businessEndHour: yup.string()
    .required('Business end hour is required')
    .matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  street: yup.string()
    .required('Street is required'),
  city: yup.string()
    .required('City is required'),
  state: yup.string()
    .required('State is required'),
  zip: yup.string()
    .required('Zip code is required')
    .matches(/^\d{5}$/, 'Invalid zip code format'),
});

const EditBranchForm = ({ branch, submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      branchId: branch?.id || '',
      branchName: branch?.name || '',
      contactNumber: branch?.phone || '',
      email: branch?.email || '',
      businessStartHour: branch?.startHour || '09:00',
      businessEndHour: branch?.endHour || '17:00',
      addressId: branch?.address.id || '',
      street: branch?.address.street || '',
      city: branch?.address.city || '',
      state: branch?.address.state || '',
      zip: branch?.address.zip || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="branchName">
          Branch Name
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="branchName"
          {...register('branchName')}
          placeholder="Branch Name"
          type="text"
        />
        {errors.branchName && <p className="text-red-500 text-xs">{errors.branchName.message}</p>}
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
        <Label htmlFor="email">
          Email
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="email"
          {...register('email')}
          placeholder="Email"
          type="email"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="businessStartHour">
          Business Start Hour
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="businessStartHour"
          {...register('businessStartHour')}
          placeholder="Business Start Hour"
          type="time"
        />
        {errors.businessStartHour && <p className="text-red-500 text-xs">{errors.businessStartHour.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="businessEndHour">
          Business End Hour
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="businessEndHour"
          {...register('businessEndHour')}
          placeholder="Business End Hour"
          type="time"
        />
        {errors.businessEndHour && <p className="text-red-500 text-xs">{errors.businessEndHour.message}</p>}
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
        Save
      </Button>
    </form>
  );
};

export default EditBranchForm;
