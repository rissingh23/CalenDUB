import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/firebase.ts";
import googleLogo from 'assets/google-logo.png';
import uwLogo from 'assets/uw-logo.webp';
import './GoogleLoginButton.css';

const GoogleLoginButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const token = await user.getIdToken();

      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success - user logged in:', data);
        navigate('/explore');
      })
      .catch((error) => {
        console.error(error);
      });

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <button className='google-uw-button' onClick={handleLogin}>
      <img src={googleLogo} alt="Google" className='google-icon' />
      <div className='google-uw-button-text'>Continue with Google/UW Net ID</div>
      <img src={uwLogo} alt="UW" className='uw-icon' />
    </button>
  );
};

export default GoogleLoginButton;
