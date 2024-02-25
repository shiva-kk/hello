import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [otpValidated, setOtpValidated] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Generate OTP
        const otp_val = Math.floor(Math.random() * 10000);

        // Send OTP via Email
        try {

            var templateParams = {
                mailto: email,
                otp: otp_val
              };
              
              await emailjs.send('service_tidswqi', 'template_t554zzo', templateParams, 'qNyDG0R4HIlMl0zOV').then(
                (response) => {
                  console.log('SUCCESS!', response.status, response.text);
                },
                (error) => {
                  console.log('FAILED...', error);
                },
              );
            
            setOtp(otp_val);
            setOtpSent(true);
        } catch (error) {
            console.error('Error sending OTP:', error);
            alert('Error sending OTP. Please try again.');
        }
    };

    const handleOtpVerification = () => {
        if (otp === parseInt(otp)) {
            setOtpValidated(true);
            navigate('/resetpassword',{ state: { email } });
        } else {
            alert('Invalid OTP');
        }
    };

    const handleChange = (e) => {
        setEmail(e.target.value);
    };

    return (

<div style={{ marginLeft: '50px' }}>
    <h2>Forgot Password</h2>
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '300px' }}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={handleChange} placeholder="Enter your email" style={{ marginBottom: '10px' }} />

        <button type="submit" style={{ width: '100%', marginTop: '10px' }}>Submit</button>
    </form>

    {otpSent && !otpValidated && (
        <div style={{ marginTop: '20px' }}>
            <label htmlFor="otp">Enter OTP:</label>
            <input type="number" id="otp" placeholder="Enter OTP" style={{ marginBottom: '10px' }} />
            <button id="otp-btn" onClick={handleOtpVerification} style={{ width: '100%' }}>Verify OTP</button>
        </div>
    )}
</div>


        
    );
};

export default ForgotPassword;
