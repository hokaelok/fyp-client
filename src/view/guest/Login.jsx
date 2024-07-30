import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/slice/authSlice';
import { getUser } from '@/redux/slice/userSlice';

import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { injectReducers } from '@/redux/store';

import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { Loader2 } from 'lucide-react';

// Consumer Slice
import consumerHotspotReducer from '@/redux/slice/consumer/hotspotSlice';
import consumerPickupReducer from '@/redux/slice/consumer/pickupSlice';
import consumerRewardReducer from '@/redux/slice/consumer/rewardSlice';

// Business Slice
import businessCompanyReducer from '@/redux/slice/business/companySlice';
import businessPickupReducer from '@/redux/slice/business/pickupSlice';
import businessCollectionReducer from '@/redux/slice/business/collectionSlice';
import businessHotspotReducer from '@/redux/slice/business/hotspotSlice';
import businessRewardReducer from '@/redux/slice/business/rewardSlice';
import businessEventReducer from '@/redux/slice/eventSlice';

// Collector Slice
import collectorCompanyReducer from '@/redux/slice/collector/companySlice';
import collectorPickupReducer from '@/redux/slice/collector/pickupSlice';
import collectorEventReducer from '@/redux/slice/eventSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, userType } = useSelector(state => state.user);
  const { isAuthenticated } = useSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(yup.object().shape({
      email: yup.string()
        .email('Invalid email format')
        .required('Email is required'),
      password: yup.string()
        .required('Password is required'),
    }))
  });

  const submithandler = async (data) => {
    const loginResponse = await dispatch(loginUser(data));

    if (loginUser.fulfilled.match(loginResponse)) {
      await dispatch(getUser());
    }
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      switch (userType) {
        case 'consumer':
          injectReducers({
            hotspot: consumerHotspotReducer,
            pickup: consumerPickupReducer,
            reward: consumerRewardReducer,
          });
          navigate('/consumer/');
          break;
        case 'business':
          injectReducers({
            company: businessCompanyReducer,
            pickup: businessPickupReducer,
            collection: businessCollectionReducer,
            hotspot: businessHotspotReducer,
            reward: businessRewardReducer,
            event: businessEventReducer,
          });
          navigate('/business/');
          break;
        case 'collector':
          injectReducers({
            company: collectorCompanyReducer,
            pickup: collectorPickupReducer,
            event: collectorEventReducer,
          });
          navigate('/collector/');
          break;
        default:
          break;
      }
    }

  }, [user, userType, isAuthenticated, navigate, dispatch]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center h-full">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <div className="flex justify-between px-2 pt-2">
          <Link to="/">
            <Button variant="link">
              Back to Home
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="link">
              Register
            </Button>
          </Link>
        </div>

        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(submithandler)}>
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
              <Label htmlFor="password">Password</Label>
              <Input id="password"
                {...register("password")}
                placeholder="********"
                type="password"
              />
              {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
            </div>

            <Button
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
              Login
            </Button>
          </form>

        </CardContent>
      </Card>
    </div>
  );
};

export default Login;