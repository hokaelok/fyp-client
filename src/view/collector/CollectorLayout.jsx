import React, { useEffect, useState } from 'react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { toast } from 'sonner';

import Sidebar from '@/components/common/Sidebar';

import {
  Truck,
  FerrisWheel
} from 'lucide-react';

const CollectorLayout = () => {
  const location = useLocation();

  const auth = useSelector((state) => state.auth);
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    if (window.innerWidth < 1023) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  if (!auth?.token) {
    toast.error('Unauthorized access!', {
      description: 'Please login!',
    });

    return <Navigate to="/login" />;
  }

  const navItems = [
    { title: 'Pickup Request', icon: <Truck className="h-5 w-5 text-blue-700" />, url: '/collector/pickups' },
    { title: 'Events', icon: <FerrisWheel className="h-5 w-5 text-blue-700" />, url: '/collector/events' },
  ];

  return (
    <div className='flex min-h-screen'>
      <Sidebar navItems={navItems} isMobile={isMobile} enableCompany />
      <div className='flex-1 transition-transform duration-300'>
        <Outlet />
      </div>
    </div>
  );
};

export default CollectorLayout;