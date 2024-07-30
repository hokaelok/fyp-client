import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required'),
});

const UserAddressForm = ({ submitHandler, formSubmitting, address }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      street: address.street || '',
      city: address.city || '',
      state: address.state || '',
      zip: address.zip || '',
    },
  });

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)}>
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
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
          disabled={isSubmitting || formSubmitting}
        >
          {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
          Save
        </Button>
      </form>
    </>
  );
};

export default UserAddressForm;
