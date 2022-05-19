import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';

import auth from './firebase.init';
import Loadding from './Loadding';

function RequireAuth({ children }) {
  const [user, loading] = useAuthState(auth);
  let location = useLocation();
  if (loading) {
    return <Loadding />
  }

    if (!user) {

      return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
  }

  export default RequireAuth;