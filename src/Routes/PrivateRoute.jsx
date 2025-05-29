import React, { use, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {

     const { user } = use(AuthContext);
  const location = useLocation();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsChecking(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (isChecking) {
    return <div>Loading...</div>;
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
    
     
};

export default PrivateRoute;