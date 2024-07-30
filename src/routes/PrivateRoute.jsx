import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles = [], organizationCheck }) => {
  const user = useSelector(state => state.user);
  // const { user_info: { user_role, organization_id } } = user;
  // console.log('private route', user_role);
  // console.log('private routeddd', organization_id);

  // When user state is empty
  if (!user) {
    return <Navigate to='/login' />;
  }

  // For healthcare provider
  // if (!allowedRoles.includes(user_role) || (organizationCheck && organizationCheck === organization_id)) {
  //   console.log('allowedRoles', allowedRoles);
  //   console.log('user_role', user_role);
  //   console.log('organizationCheck', organizationCheck);
  //   console.log('organization_id', organization_id);
  //   return <Navigate to="/" />;
  // }

  // console.log('i am here', user);
  return <Outlet />;
};

export default PrivateRoute;