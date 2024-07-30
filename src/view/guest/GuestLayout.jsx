import React from 'react';
import { Outlet } from 'react-router-dom';

import Navbar from '../../components/guest/Navbar';

const GuestLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default GuestLayout;