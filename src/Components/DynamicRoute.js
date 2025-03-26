// DynamicRoute.js
import React, { useEffect } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

const DynamicRoute = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      // Generate a unique ID and navigate
      const uniqueId = uuidv4();
      navigate(`${uniqueId}`, { replace: true });
    }
  }, [id, navigate]);

  return <Outlet />; // Renders the matched component for the route
};

export default DynamicRoute;
