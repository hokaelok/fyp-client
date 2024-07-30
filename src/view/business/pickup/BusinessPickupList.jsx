import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import googleMapsAPI from "@/api/common/googleMapsAPI";
import { getCompany, updateCompany } from "@/redux/slice/business/companySlice";
import { clearPickupList, getPickups } from "@/redux/slice/business/pickupSlice";

import Hero from '@/components/ui/hero';
import BusinessPickupDataTable from "@/components/business/pickup/dataTable/BusinessPickupDataTable";
import BusinessPickupColumns from "@/components/business/pickup/dataTable/BusinessPickupColumns";
import CompanyProfileForm from '@/components/common/company/form/CompanyProfileForm';
import { Skeleton } from "@/components/ui/skeleton";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const BusinessPickupList = () => {
  const dispatch = useDispatch();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const company = useSelector((state) => state.company.company);
  const headquarter = useSelector((state) => state.company.headquarter);
  const pickupList = useSelector((state) => state.pickup.pickupList);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetchingData(true);
      if (!headquarter.email) {
        await dispatch(getCompany());
      } else {
        await dispatch(getPickups({ id: company.id, type: "business" }));
      }
      setIsFetchingData(false);
    };
    fetchData();

    return () => {
      dispatch(clearPickupList());
    };
  }, [dispatch, headquarter.email]);

  if (!company.logo && !headquarter.address) {
    return <FirstTimeSetup />;
  }

  return (
    <>
      <Hero
        title="Customers Pickup Requests"
        subtitle="Customers are waiting for you to pick up their e-waste!"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Pickup Request List
        </h3>

        <BusinessPickupDataTable
          columns={BusinessPickupColumns}
          data={pickupList}
          searchColumn={'contact_number'}
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

export default BusinessPickupList;