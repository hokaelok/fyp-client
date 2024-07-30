import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { formatDateTime } from '@/lib/data-formatter';

import ImageUpload from '@/components/ui/image-upload';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  image: yup.string().required('Image is required'),
  name: yup.string().required('Event Name is required'),
  description: yup.string().required('Description is required'),
  startTime: yup.string().required('Start Time is required'),
  endTime: yup.string().required('End Time is required')
    .test(
      'is-greater',
      'End Time must be later than Start Time',
      function (value) {
        const { startTime } = this.parent;
        return !startTime || !value || new Date(value) > new Date(startTime);
      }
    ),
  street: yup.string().required('Street is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip code is required').matches(/^\d{5}$/, 'Invalid zip code format'),
});

const EventForm = ({ event, submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      id: event?.id || null,
      image: event?.image || '',
      name: event?.name || '',
      description: event?.description || '',
      startTime: formatDateTime(event?.startTime) || '',
      endTime: formatDateTime(event?.endTime) || '',
      street: event?.street || '',
      city: event?.city || '',
      state: event?.state || '',
      zip: event?.zip || '',
    },
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-2 mb-5">
        <div className="w-full h-40 rounded-lg overflow-hidden">
          <ImageUpload
            previewUrl={getValues('image') === '' ? 'https://placehold.co/100x100' : getValues('image')}
            setValue={setValue}
            setValueKey="image"
          />
        </div>
        {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="name">
          Event Name
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Reward Name"
          type="text"
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="description">
          Description
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Textarea
          id="description"
          {...register('description')}
          placeholder="Description"
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="startTime">
          Start Time
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="startTime"
          {...register('startTime')}
          type="datetime-local"
        />
        {errors.startTime && <p className="text-red-500 text-xs">{errors.startTime.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="endTime">
          End Time
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="endTime"
          {...register('endTime')}
          type="datetime-local"
        />
        {errors.endTime && <p className="text-red-500 text-xs">{errors.endTime.message}</p>}
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
        type="submit"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
        {event ? 'Update Event' : 'Add Event'}
      </Button>
    </form>
  );
};

export default EventForm;