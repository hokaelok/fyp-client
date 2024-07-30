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
  name: yup.string().required('Reward Name is required'),
  description: yup.string().required('Description is required'),
  points: yup.number().required('Points required is mandatory').min(1, 'Points must be at least 1'),
  startTime: yup.string().required('Claimable Start Time is required'),
  endTime: yup.string().required('Claimable End Time is required')
    .test(
      'is-greater',
      'End Time must be later than Start Time',
      function (value) {
        const { startTime } = this.parent;
        return !startTime || !value || new Date(value) > new Date(startTime);
      }
    ),
  expiryTime: yup.string().required('Expiry Time is required')
    .test(
      'is-greater',
      'Expiry Time must be later than End Time',
      function (value) {
        const { endTime } = this.parent;
        return !endTime || !value || new Date(value) > new Date(endTime);
      }
    ),
});

const RewardForm = ({ reward, submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      image: reward?.image || '',
      name: reward?.name || '',
      description: reward?.description || '',
      points: reward?.points || '',
      startTime: formatDateTime(reward?.startTime) || '',
      endTime: formatDateTime(reward?.endTime) || '',
      expiryTime: formatDateTime(reward?.expiryTime) || '',
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
          Reward Name
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
          rows="3"
        />
        {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="points">
          Points Required
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="points"
          {...register('points')}
          placeholder="Points Required"
          type="number"
          min="0"
        />
        {errors.points && <p className="text-red-500 text-xs">{errors.points.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="startTime">
          Claimable Start Time
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
          Claimable End Time
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
        <Label htmlFor="expiryTime">
          Expiration Time
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="expiryTime"
          {...register('expiryTime')}
          type="datetime-local"
        />
        {errors.expiryTime && <p className="text-red-500 text-xs">{errors.expiryTime.message}</p>}
      </div>

      <Button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
        {reward ? 'Update Reward' : 'Add Reward'}
      </Button>
    </form>
  );
};

export default RewardForm;
