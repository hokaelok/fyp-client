import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import ReactFlagsSelect from "react-flags-select";

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';
import { useEffect } from 'react';

const schema = yup.object().shape({
  name: yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Name cannot contain special characters'),
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  country: yup.string()
    .required('Country is required'),
});

const UserProfileForm = ({ user, submitHandler, formSubmitting }) => {
  const {
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    reset
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: user.name,
      email: user.email,
      country: user.country,
    },
  });

  useEffect(() => {
    reset({
      name: user.name,
      email: user.email,
      country: user.country,
    });
  }, [user, reset]);

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor="name">
            Name
            <span className="ml-2 text-red-500">*</span>
          </Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input id="name" {...field} placeholder="john doe" type="text" />
            )}
          />
          {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
        </div>

        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor="email">
            Email
          </Label>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                id="email"
                placeholder="mail@example.com"
                type="email"
                {...field}
                disabled
              />
            )}
          />
          {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
        </div>

        <div className='flex flex-col gap-2 mb-4'>
          <Label htmlFor="country">
            Country
            <span className="ml-2 text-red-500">*</span>
          </Label>
          <Controller
            name="country"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactFlagsSelect
                onSelect={onChange}
                selected={value}
                searchable
                selectedSize={15}
              />
            )}
          />
          {errors.country && <p className="text-red-500 text-xs">{errors.country.message}</p>}
        </div>

        <div className='flex gap-3'>
          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="reset"
            onClick={() => reset()}
          >
            Reset
          </Button>

          <Button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
            disabled={isSubmitting || formSubmitting}
          >
            {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
            Save
          </Button>
        </div>
      </form>
    </>
  );
};

export default UserProfileForm;