import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ReactFlagsSelect from 'react-flags-select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  email: yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  name: yup.string()
    .required('Name is required')
    .matches(/^[a-zA-Z\s]*$/, 'Name cannot contain special characters'),
  country: yup.string()
    .required('Country is required'),
  companyName: yup.string()
    .required('Company Name is required'),
  password: yup.string()
    .required('Password is required')
    .min(3, 'Password must be at least 8 characters'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match')
});

const CollectorRegistrationForm = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control
  } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor="email">Email</Label>
        <Input id="email"
          {...register("email")}
          placeholder="mail@example.com"
          type="email"
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor="name">Name</Label>
        <Input id="name"
          {...register("name")}
          placeholder="john doe"
          type="text"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor="country">Country</Label>
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

      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor="companyName">Company Name</Label>
        <Input id="companyName"
          {...register("companyName")}
          placeholder="Company Ltd."
          type="text"
        />
        {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName.message}</p>}
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor="password">Password</Label>
        <Input id="password"
          {...register("password")}
          placeholder="********"
          type="password"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>

      <div className='flex flex-col gap-2 mb-4'>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input id="confirmPassword"
          {...register("confirmPassword")}
          placeholder="********"
          type="password"
        />
        {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword.message}</p>}
      </div>

      <Button
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
        Register
      </Button>
    </form>
  );
};

export default CollectorRegistrationForm;
