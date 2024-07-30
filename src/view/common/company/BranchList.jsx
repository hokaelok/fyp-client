import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import googleMapsAPI from "@/api/common/googleMapsAPI";
import {
  createBranch,
  getBranches,
  clearBranches
} from "@/redux/slice/business/companySlice";
import BranchDataTable from "@/components/common/branch/dataTable/BranchDataTable";
import BranchColumns from "@/components/common/branch/dataTable/BranchColumns";

const BranchList = () => {
  const dispatch = useDispatch();
  const [isFetchingData, setIsFetchingData] = useState(false);

  const userType = useSelector((state) => state.user.userType);
  const company = useSelector((state) => state.company.company);
  const branchData = useSelector((state) => state.company.branches);

  useEffect(() => {
    const fetchBranches = async () => {
      setIsFetchingData(true);
      await dispatch(getBranches(company.id));
      setIsFetchingData(false);
    };
    fetchBranches();

    return () => {
      dispatch(clearBranches());
    };
  }, [dispatch, company.id]);

  const addBranchHandler = async (data) => {
    const googleMapsRequest = await googleMapsAPI.geoCode(`${data.street} ${data.city} ${data.state} ${data.zip}`);
    if (googleMapsRequest.status === 'OK') {
      const location = googleMapsRequest.results[0].geometry.location;
      data.latitude = location.lat;
      data.longitude = location.lng;
    }

    await dispatch(createBranch({
      ...data,
      branchType: userType,
      companyId: company.id,
    }));
    dispatch(getBranches(company.id));
  };

  return (
    <BranchDataTable
      columns={BranchColumns}
      data={branchData}
      searchColumn="name"
      addBranchHandler={addBranchHandler}
      isFetchingData={isFetchingData}
    />
  );
};

export default BranchList;
