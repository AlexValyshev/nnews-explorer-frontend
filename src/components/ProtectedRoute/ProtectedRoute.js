import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { TimeDelayPopup } from '../../utils/constant';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const jwt = localStorage.getItem('token');
  React.useEffect(() => {
    if (!jwt && !props.isLoggedIn) {
      setTimeout(props.openPopup, TimeDelayPopup);
    }
  });

  return (
    <Route>
      {
        jwt ? <Component {...props} /> : <Redirect to='/'/>
      }
    </Route>
  );
};

export default ProtectedRoute;
