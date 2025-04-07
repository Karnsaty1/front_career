import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const LogIn = () => {
  const navigate = useNavigate();
  const uniqueId = uuidv4();
  const [cred, setCred] = useState({ email: '', password: '' });
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [error, setError] = useState('');
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleBrandClick = () => {
    navigate(`/home/${uniqueId}`);
  };

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoader(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/user/auth/logIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(cred),
      });

      if (response.ok) {
        setShowOtp(true);
        setError('');
      } else {
        const errorMessage = await response.text();
        setError(errorMessage);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/user/auth/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: cred.email, otp: otp.join(''), signUp: false }),
      });

      if (response.ok) {
        navigate(`/card/${uniqueId}`);
      } else {
        const errorMessage = await response.text();
        const data=await response.json();
        if(data.msg==='User not Found !!! Try Signing Up'){
          alert(data.msg);
        }
        setError(errorMessage);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  const onChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return; 

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
  };

  return (
    <div style={styles.loginContainer}>
      <h1 onClick={handleBrandClick} style={styles.signupTitle}>CareerConnect</h1>
      <h3 onClick={handleBrandClick} style={styles.signupTitle}>LogIn</h3>
      {error && <p style={styles.errorMessage}>{error}</p>}

      {loader ? (
        <Loading />
      ) : (
        <>
          {showOtp ? (
            <form onSubmit={onOtpSubmit} style={styles.form}>
              <label htmlFor="otp" style={styles.formLabel}>Enter OTP</label>
              <div style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => onChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    style={styles.otpInput}
                    placeholder=""
                  />
                ))}
              </div>
              <button type="submit" style={styles.submitButton}>Verify OTP</button>
            </form>
          ) : (
            <form onSubmit={onSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>Email address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={cred.email}
                  onChange={(e) => setCred({ ...cred, email: e.target.value })}
                  placeholder="Enter email"
                  style={styles.formInput}
                  aria-label="Email Address"
                />
              </div>
              <div style={styles.passwordContainer}>
                <label htmlFor="password" style={styles.formLabel}>Password</label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={cred.password}
                  onChange={(e) => setCred({ ...cred, password: e.target.value })}
                  placeholder="Password"
                  style={styles.formInput}
                  aria-label="Password"
                />
                <span onClick={toggleVisibility} style={styles.passwordToggle}>
                  <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                </span>
              </div>
              <button type="submit" style={styles.submitButton}>Submit</button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  loginContainer: {
    width: '100%',
    maxWidth: '400px',
    padding: '30px',
    backgroundColor: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    textAlign: 'center',
    fontFamily: '"Arial", sans-serif',
    position: 'absolute', 
    top: '50%',           
    left: '50%',          
    transform: 'translate(-50%, -50%)', 
  },
  signupTitle: {
    fontSize: '30px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: '20px',
    width: '100%',
  },
  formLabel: {
    fontSize: '14px',
    color: '#666',
    marginBottom: '8px',
  },
  formInput: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
    transition: 'all 0.3s ease',
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
  passwordToggle: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
    marginTop: '15px',
  },
  otpContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: '15px',
  },
  otpInput: {
    width: '40px',
    height: '40px',
    textAlign: 'center',
    fontSize: '18px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    outline: 'none',
  },
  submitButton: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
};

export default LogIn;
