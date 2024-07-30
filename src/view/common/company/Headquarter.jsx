import { useDispatch, useSelector } from 'react-redux';
import { getCompany, updateCompany } from '@/redux/slice/business/companySlice';
import googleMapsAPI from '@/api/common/googleMapsAPI';

import CompanyProfileForm from '@/components/common/company/form/CompanyProfileForm';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';

const Headquarter = () => {
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
      <Card className='mb-5'>
        <CardHeader>
          <CardTitle>
            Company Profile
          </CardTitle>
          <CardDescription>
            Manage your company profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CompanyProfileForm
            company={company}
            headquarter={headquarter}
            submitHandler={submitHandler}
          />
        </CardContent>
      </Card>
    </>
  );
};

export default Headquarter;
