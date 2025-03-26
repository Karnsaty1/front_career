import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loading from './Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const uniqueId = id || uuidv4();
  const generateLink = (path) => `/${path.slice(1, 6)}/${uniqueId}`;
  const [loader, setLoader] = useState(false);

  const [cred, setCred] = useState({
    email: '',
    password: '',
    userName: '',
  });

  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']); 
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const response = await fetch(`${process.env.REACT_APP_URL}/user/auth/signUp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(cred),
      });
      console.log(response);

      if (!response.ok) {
        const errorMessage = await response.text();
  console.log('Error:', errorMessage);
  throw new Error(`HTTP error! status: ${response.status}`);
      } else {
        setShowOtp(true);
        const data = await response.json();
        console.log(data);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoader(false);
    }
  };

  const toggleVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onOtpSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await fetch(`${process.env.REACT_APP_URL}/user/auth/verifyOTP`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: cred.email, otp: otp.join(''), signUp: true, userName:cred.userName }),
      });

      if (response.ok) {
        navigate(`/card/${uniqueId}`);
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

  const onChange = (e) => {
    setCred({ ...cred, [e.target.name]: e.target.value });
  };

  const handleOtpChange = (e, index) => {
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
    <div style={styles.signupContainer}>
      <h1 style={styles.signupTitle}>CareerConnect</h1>
      <h3 style={styles.signupTitle}>Sign Up</h3>
      <Link to={generateLink('/login/:id')} style={styles.loginLink}>
        <small>Already have an account?</small>
      </Link>

      {error && <p style={styles.errorMessage}>{error}</p>}

      {loader ? (
        <Loading />
      ) : (
        <>
          {!showOtp ? (
            <form style={styles.signupForm} onSubmit={onSubmit}>
              <div style={styles.formGroup}>
                <label htmlFor="email" style={styles.formLabel}>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={cred.email}
                  onChange={onChange}
                  placeholder="Enter email"
                  style={styles.formInput}
                />
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="password" style={styles.formLabel}>
                  Password
                </label>
                <div style={styles.passwordContainer}>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    onChange={onChange}
                    placeholder="Enter password"
                    value={cred.password}
                    style={styles.formInput}
                  />
                  <span style={styles.passwordToggle} onClick={toggleVisibility}>
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                  </span>
                </div>
              </div>
              <div style={styles.formGroup}>
                <label htmlFor="userName" style={styles.formLabel}>
                  User Name
                </label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={cred.userName}
                  onChange={onChange}
                  placeholder="Enter User Name"
                  required={true}
                  style={styles.formInput}
                />
              </div>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </form>
          ) : (
            <form onSubmit={onOtpSubmit} style={styles.otpForm}>
              <label htmlFor="otp" style={styles.formLabel}>Enter OTP</label>
              <div style={styles.otpContainer}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    id={`otp-input-${index}`}
                    value={digit}
                    onChange={(e) => handleOtpChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    maxLength={1}
                    style={styles.otpInput}
                    placeholder=""
                  />
                ))}
              </div>
              <button type="submit" style={styles.submitButton}>
                Verify OTP
              </button>
            </form>
          )}
        </>
      )}
    </div>
  );
};

const styles = {
  signupContainer: {
    width: '100%',
    maxWidth: '510px',
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
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  loginLink: {
    color: '#007bff',
    textDecoration: 'none',
    marginBottom: '20px',
    display: 'block',
    fontSize: '14px',
  },
  errorMessage: {
    color: 'red',
    fontSize: '14px',
    marginBottom: '10px',
  },
  signupForm: {
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
  },
  passwordToggle: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    cursor: 'pointer',
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
  otpForm: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default SignUp;
//hello_world27