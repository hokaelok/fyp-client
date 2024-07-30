import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Label } from '@radix-ui/react-label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { Loader2 } from 'lucide-react';

const schema = yup.object().shape({
  password: yup.string()
    .required('Password is required'),
  newPassword: yup.string()
    .required('New password is required')
    .min(3, 'Password must be at least 3 characters'),
  confirmNewPassword: yup.string()
    .required('Confirm password is required')
    .oneOf([yup.ref('newPassword'), null], 'Passwords must match')
});

const UserPasswordForm = ({ submitHandler, formSubmitting }) => {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className='flex flex-col gap-2 mb-4'>
            <Label htmlFor="password" className='font-semibold'>Password</Label>
            <Input id="password"
              {...register("password")}
              placeholder="Password"
              type="password"
            />
            {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
          </div>

          <div className='flex flex-col gap-2 mb-4'>
            <Label htmlFor="newPassword" className='font-semibold'>New Password</Label>
            <Input id="newPassword"
              {...register("newPassword")}
              placeholder="New Password"
              type="password"
            />
            {errors.newPassword && <p className="text-red-500 text-xs">{errors.newPassword.message}</p>}
          </div>

          <div className='flex flex-col gap-2 mb-4'>
            <Label htmlFor="confirmNewPassword" className='font-semibold'>Confirm Password</Label>
            <Input id="confirmNewPassword"
              {...register("confirmNewPassword")}
              placeholder="Confirm Password"
              type="password"
            />
            {errors.confirmNewPassword && <p className="text-red-500 text-xs">{errors.confirmNewPassword.message}</p>}
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            disabled={isSubmitting || formSubmitting}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5" /> : 'Change Password'}
          </Button>
        </form>
      </div >
    </>
  );
};

export default UserPasswordForm;