import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import googleMapsAPI from '@/api/common/googleMapsAPI';
import { getCompany, updateCompany } from '@/redux/slice/collector/companySlice';
import { clearPickupList, getPickups } from '@/redux/slice/collector/pickupSlice';

import Hero from '@/components/ui/hero';
import CollectorPickupDataTable from '@/components/collector/pickup/dataTable/CollectorPickupDataTable';
import CollectorPickupColumns from '@/components/collector/pickup/dataTable/CollectorPickupColumns';
import CompanyProfileForm from '@/components/common/company/form/CompanyProfileForm';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const CollectorPickupList = () => {
  const dispatch = useDispatch();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const company = useSelector((state) => state.company.company);
  const headquarter = useSelector((state) => state.company.headquarter);
  const pickups = useSelector((state) => state.pickup.pickups);

  useEffect(() => {
    const fetchCompany = async () => {
      setIsFetchingData(true);
      if (!headquarter.email) {
        await dispatch(getCompany());
      } else {
        await dispatch(getPickups({ id: company.id, type: 'collector' }));
      }
      setIsFetchingData(false);
    };
    fetchCompany();

    return () => {
      dispatch(clearPickupList());
    };
  }, [dispatch, headquarter.email]);

  if (!company.logo || !headquarter.address) {
    return <FirstTimeSetup />;
  }

  return (
    <>
      <Hero
        title="Business Pickup Requests"
        subtitle="Businesses are waiting for you to pick up their e-waste!"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Business Pickup Request List
        </h3>

        <CollectorPickupDataTable
          columns={CollectorPickupColumns}
          data={pickups}
          searchColumn=""
          isFetchingData={isFetchingData}
        />
      </section>
    </>
  );
};

const FirstTimeSetup = () => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const headquarter = useSelector((state) => state.company.headquarter);

  const submitHandler = async (data) => {
    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street} ${data.city} ${data.state} ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }
    await dispatch(updateCompany(data));
    await dispatch(getCompany());
  };

  return (
    <>
      <Dialog open={true}>
        <DialogContent className="overflow-y-scroll max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className='mb-2'>
              Setup Company Profile
            </DialogTitle>
            <DialogDescription>
              Please complete your company profile to continue
            </DialogDescription>
          </DialogHeader>

          {company.name ? (
            <CompanyProfileForm
              company={company}
              headquarter={headquarter}
              submitHandler={submitHandler}
              disableReset
            />
          ) : (
            <Skeleton className="h-52 bg-gray-200 rounded w-full mx-auto" />
          )}

        </DialogContent>
      </Dialog>
    </>
  );
};

export default CollectorPickupList;
