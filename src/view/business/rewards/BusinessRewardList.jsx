import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  clearRewards,
  createReward,
  getRewards
} from "@/redux/slice/business/rewardSlice";

import Hero from "@/components/ui/hero";
import BusinessRewardDataTable from "@/components/business/rewards/dataTable/BusinessRewardDataTable";
import BusinessRewardColumns from "@/components/business/rewards/dataTable/BusinessRewardColumns";

const BusinessRewardList = () => {
  const dispatch = useDispatch();

  const companyId = useSelector((state) => state.company.company.id);
  const rewards = useSelector((state) => state.reward.rewards);

  const [isFetchingData, setIsFetchingData] = useState(false);

  useEffect(() => {
    const fetchRewards = async () => {
      setIsFetchingData(true);
      await dispatch(getRewards(companyId));
      setIsFetchingData(false);
    };

    fetchRewards();

    return () => {
      setIsFetchingData(false);
      clearRewards();
    };
  }, [dispatch, companyId]);

  const addRewardHandler = async (data) => {
    await dispatch(createReward({
      ...data,
      companyId,
    }));
    await dispatch(getRewards(companyId));
  };

  return (
    <>
      <Hero
        title="Customers Rewards"
        subtitle="Reward your customers with these amazing rewards!"
        backgroundColor="bg-blue-500"
        textColor="text-white"
      />

      <section className='px-4 py-5'>
        <h3 className='text-2xl font-bold p-1'>
          Reward List
        </h3>

        <BusinessRewardDataTable
          columns={BusinessRewardColumns}
          data={rewards}
          searchColumn="name"
          addRewardHandler={addRewardHandler}
          isFetchingData={isFetchingData}
        />
      </section>
    </>
  );
};

export default BusinessRewardList;