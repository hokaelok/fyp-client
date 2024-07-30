import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import googleMapsAPI from '@/api/common/googleMapsAPI';
import { deleteAddress, getUser, updateUser } from '@/redux/slice/userSlice';

import Hero from '@/components/ui/hero';
import UserProfileForm from '@/components/common/profile/form/UserProfileForm';
import UserAddressForm from '@/components/common/profile/form/UserAddressForm';
import UserPasswordForm from '@/components/common/profile/form/UserPasswordForm';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();

  const { user, userType } = useSelector(state => state.user);
  const address = useSelector(state => state.user.address);

  const [formSubmitting, setFormSubmitting] = useState(null);
  const [isAddressDialogOpen, setIsAddressDialogOpen] = useState(false);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [isEditAddress, setIsEditAddress] = useState(false);

  const updateProfileHandler = async (data) => {
    setFormSubmitting('profile');
    await dispatch(updateUser(data));
    await dispatch(getUser());
    setFormSubmitting(null);
  };

  const addressHandler = async (data) => {
    setFormSubmitting('address');

    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street} ${data.city} ${data.state} ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }

    await dispatch(updateUser({
      address: {
        street: data.street,
        city: data.city,
        state: data.state,
        zip: data.zip,
        latitude: data.latitude,
        longitude: data.longitude
      }
    }));
    await dispatch(getUser());
    setFormSubmitting(null);
    setIsAddressDialogOpen(false);
  };

  const deleteAddressHandler = async () => {
    setFormSubmitting('address');
    await dispatch(deleteAddress());
    await dispatch(getUser());
    setFormSubmitting(null);
  };

  const changePasswordHandler = async (data) => {
    setFormSubmitting('password');
    await dispatch(updateUser(data));
    setFormSubmitting(null);
    setIsPasswordDialogOpen(false);
  };

  return (
    <>
      <Hero
        title="Profile"
        subtitle="Manage your account settings"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <Card className='mb-5'>
          <CardHeader>
            <CardTitle>
              Personal Information
            </CardTitle>
            <CardDescription>
              Manage your personal information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserProfileForm
              user={user}
              submitHandler={updateProfileHandler}
              formSubmitting={formSubmitting}
            />
          </CardContent>
        </Card>

        {userType === 'consumer' && (
          <>
            <Separator className='mb-5 bg-gray-400' />

            <Card className='mb-5'>
              <CardHeader className="flex justify-between">
                <CardTitle>
                  Address Location
                </CardTitle>
                <CardDescription>
                  Manage your address location
                </CardDescription>
              </CardHeader>
              <CardContent>
                {address.street ? (
                  <>
                    <div className='mb-5'>
                      <p><strong>Street:</strong> {address.street}</p>
                      <p><strong>City:</strong> {address.city}</p>
                      <p><strong>State:</strong> {address.state}</p>
                      <p><strong>Zip:</strong> {address.zip}</p>
                    </div>
                    {address.street && (
                      <div className="flex gap-3">
                        <Button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => {
                            setIsEditAddress(true);
                            setIsAddressDialogOpen(true);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                          onClick={deleteAddressHandler}
                        >
                          {formSubmitting && <Loader2 className="w-6 h-6 animate-spin mr-5" />}
                          Delete
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <Button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setIsEditAddress(false);
                      setIsAddressDialogOpen(true);
                    }}
                  >
                    Add Address
                  </Button>
                )}
                <Dialog open={isAddressDialogOpen} onOpenChange={setIsAddressDialogOpen}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className='mb-2'>
                        {isEditAddress ? 'Edit Address' : 'Add Address'}
                      </DialogTitle>
                      <DialogDescription>
                        {isEditAddress ? 'Update your address details.' : 'Enter your address to add to your profile.'}
                      </DialogDescription>
                    </DialogHeader>

                    <UserAddressForm
                      submitHandler={addressHandler}
                      formSubmitting={formSubmitting}
                      address={isEditAddress && address}
                    />

                    <DialogFooter>
                      <DialogClose asChild>
                        <Button className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                          Close
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </>
        )}

        <Separator className='mb-5 bg-gray-400' />

        <Card>
          <CardHeader>
            <CardTitle>
              Security Password
            </CardTitle>
            <CardDescription>
              Manage your account password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className='mb-2'>
                    Change Password
                  </DialogTitle>
                  <DialogDescription>
                    Enter your old password & new password to change your password.
                  </DialogDescription>
                </DialogHeader>

                <UserPasswordForm
                  submitHandler={changePasswordHandler}
                  formSubmitting={formSubmitting}
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button className="w-full bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                      Close
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

          </CardContent>
        </Card>
      </section>
    </>
  );
};

export default Profile;
