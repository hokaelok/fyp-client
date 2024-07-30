import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Label } from '@/components/ui/label';

import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';

const schema = yup.object().shape({
  points: yup.number().required('Points is required').min(1, 'Points must be at least 1'),
});

const CompletePickupRequestForm = ({ submitHandler }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="points">
          Points
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <Input
          id="points"
          {...register('points')}
          type="number"
          min={0}
        />
        {errors.points && <p className="text-red-500 text-xs">{errors.points.message}</p>}
      </div>

      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-full py-2 px-4 rounded"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
        Submit
      </Button>
    </form>
  );
};

export default CompletePickupRequestForm;