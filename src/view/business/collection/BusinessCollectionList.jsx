import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Hero from '@/components/ui/hero';
import BusinessCollectionDataTable from "@/components/business/collection/dataTable/BusinessCollectionDataTable";
import BusinessCollectionColumns from "@/components/business/collection/dataTable/BusinessCollectionColumns";
import { clearCollectionList, getCollectionList } from "@/redux/slice/business/collectionSlice";

const BusinessCollectionList = () => {
  const dispatch = useDispatch();

  const company = useSelector((state) => state.company.company);
  const collections = useSelector((state) => state.collection.collections);

  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const fetchPickupList = async () => {
      setIsFetchingData(true);
      await dispatch(getCollectionList({ id: company.id, type: "business" }));
      setIsFetchingData(false);
    };
    fetchPickupList();

    return () => {
      dispatch(clearCollectionList());
    };
  }, [dispatch, company]);

  return (
    <>
      <Hero
        title="Request Collector Pickup"
        subtitle="Time to request a collector to pick up e-waste you had collected!"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Collector Request List
        </h3>

        <BusinessCollectionDataTable
          columns={BusinessCollectionColumns}
          data={collections}
          searchColumn='requestor_branch.name'
          isFetchingData={isFetchingData}
        />
      </section>
    </>
  );
};

export default BusinessCollectionList;