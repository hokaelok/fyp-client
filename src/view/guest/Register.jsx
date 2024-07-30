import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { registerUser } from '@/redux/slice/authSlice';

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CardTitle, CardHeader, CardContent, Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

import ConsumerRegistrationForm from '@/components/guest/form/ConsumerRegistrationForm';
import BusinessRegistrationForm from '@/components/guest/form/BusinessRegistrationForm';
import CollectorRegistrationForm from '@/components/guest/form/CollectorRegistrationForm';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userType, setUserType] = useState('consumer');

  const submitHandler = async (data) => {
    const result = await dispatch(registerUser({
      ...data,
      userType
    }));
    if (registerUser.fulfilled.match(result)) navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center h-full">
      <Card className="w-full max-w-md mx-4 shadow-lg">
        <div className="flex justify-between px-2 pt-2">
          <Link to="/">
            <Button variant="link">
              Back to Home
            </Button>
          </Link>
          <Link to="/login">
            <Button variant="link">
              Login
            </Button>
          </Link>
        </div>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="consumer" onValueChange={setUserType} className='mb-5'>
            <div className='w-full flex justify-center mb-5'>
              <TabsList>
                <TabsTrigger value="consumer" className="text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-t-lg">Consumer</TabsTrigger>
                <TabsTrigger value="business" className="text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-t-lg">Business</TabsTrigger>
                <TabsTrigger value="collector" className="text-md data-[state=active]:bg-blue-500 data-[state=active]:text-white px-4 py-2 rounded-t-lg">Collector</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="consumer">
              <ConsumerRegistrationForm submitHandler={submitHandler} />
            </TabsContent>

            <TabsContent value="business">
              <BusinessRegistrationForm submitHandler={submitHandler} />
            </TabsContent>

            <TabsContent value="collector">
              <CollectorRegistrationForm submitHandler={submitHandler} />
            </TabsContent>
          </Tabs>
        </CardContent>

      </Card>
    </div >
  );
};

export default Register;