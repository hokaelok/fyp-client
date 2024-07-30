import React from 'react';

import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const NotFound = () => {
  const navigate = useNavigate();

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Page Not Found</h1>
      <p className="text-lg mb-8">The page you are looking for doesn't exist.</p>
      <Button
        onClick={navigateBack}
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;