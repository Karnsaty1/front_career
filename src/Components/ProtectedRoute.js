// src/Components/ProtectedRoute.js
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ element: Component }) => {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token=Cookies.get('token');
        const response = await fetch('${process.env.REACT_APP_URL}/user/data/verifyToken', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization':`Bearer ${token}`

          },
          credentials: 'include', 
        });

        if (response.ok) {
          const data = await response.json();
          if (data.valid) {
            setIsVerified(true);
          } else {
            navigate('/logIn/:id'); // Redirect to login if verification fails
          }
        } else {
          navigate('/logIn/:id');
        }
      } catch (error) {
        navigate('/logIn/:id');
      }
    };

    verifyToken();
  }, [navigate]);

  return isVerified ? <Component /> : null;
};

export default ProtectedRoute;
