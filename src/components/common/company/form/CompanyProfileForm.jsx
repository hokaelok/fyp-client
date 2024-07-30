import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import ImageUpload from '@/components/ui/image-upload';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import AddressPinComponent from '../../AddressPinComponent';

const schema = yup.object().shape({
  logo: yup.string().required('Company Logo is required'),
  name: yup.string().required('Company Name is required'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone number is required'),
  websiteUrl: yup.string().optional().url('Invalid URL format'),
  businessStartHour: yup.string().required('Business start hour is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  businessEndHour: yup.string().required('Business end hour is required').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Invalid time format'),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required').matches(/^\d{5}$/, 'Invalid zip code format'),
});

const CompanyProfileForm = ({ company, headquarter, submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: company.id,
      logo: company.logo,
      name: company.name,
      email: headquarter.email,
      phone: headquarter.phone,
      websiteUrl: company.website,
      businessStartHour: headquarter.startHour || '09:00',
      businessEndHour: headquarter.endHour || '17:00',

      street: headquarter.address ? headquarter.address.street : '',
      city: headquarter.address ? headquarter.address.city : '',
      state: headquarter.address ? headquarter.address.state : '',
      zip: headquarter.address ? headquarter.address.zip : '',
    },
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-2 mb-4">
        <div className="mx-auto w-full h-40 rounded-lg overflow-hidden">
          <ImageUpload
            previewUrl={getValues('logo') ? company.logo : 'https://placehold.co/500x500'}
            setValue={setValue}
            setValueKey="logo"
          />
        </div>
        {errors.logo && <p className="text-red-500 text-xs">{errors.logo.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="name">
          Company Name
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Company Name"
          type="text"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
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
        <Label htmlFor="phone">
          Phone
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="phone"
          {...register('phone')}
          placeholder="Phone"
          type="text"
        />
        {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="websiteUrl">
          Company Website
        </Label>
        <Input
          id="websiteUrl"
          {...register('websiteUrl')}
          placeholder="Company Webiste"
          type="text"
        />
        {errors.websiteUrl && <p className="text-red-500 text-xs">{errors.websiteUrl.message}</p>}
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

      {headquarter.address && (
        <div className='h-60 rounded-lg overflow-hidden mb-4'>
          <AddressPinComponent addressCordinate={{
            lat: parseFloat(headquarter.address.latitude),
            lng: parseFloat(headquarter.address.longitude)
          }}
            home
          />
        </div>
      )}

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

      <div className="flex gap-3">
        <Button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};

export default CompanyProfileForm;
