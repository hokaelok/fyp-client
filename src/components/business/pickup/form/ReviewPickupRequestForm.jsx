import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  decision: yup.string().oneOf(['accept', 'reject'], 'Decision is required').required('Decision is required'),
  remark: yup.string(),
});

const ReviewPickupRequestForm = ({ submitHandler }) => {
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
        <Label htmlFor="decision">
          Decision
          <span className="ml-2 text-red-500">*</span>
        </Label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="accept"
              {...register('decision')}
              className="mr-2"
            />
            Accept
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="reject"
              {...register('decision')}
              className="mr-2"
            />
            Reject
          </label>
        </div>
        {errors.decision && <p className="text-red-500 text-xs">{errors.decision.message}</p>}
      </div>

      <div className="flex flex-col gap-2 mb-4">
        <Label htmlFor="remark">
          Remark
        </Label>
        <Textarea
          id="remark"
          {...register('remark')}
          placeholder="Add your remark here..."
        />
        {errors.remark && <p className="text-red-500 text-xs">{errors.remark.message}</p>}
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

export default ReviewPickupRequestForm;
