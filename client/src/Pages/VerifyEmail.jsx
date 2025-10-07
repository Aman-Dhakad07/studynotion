import React, { useEffect, useState } from 'react'
import OtpInput from 'react-otp-input';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useSelector } from 'react-redux';

const VerifyEmail = () => {
    const {signupData, loading} = useSelector( (state) => state.auth);
    const [otp, setOtp] = useState("");
   const dispatch = useDispatch();
   const navigate = useNavigate();

   useEffect( ()=> {
    if(!signupData) {
        navigate("/signup")
    }
   },[signupData, navigate]);

   if(!signupData){
    return null;
   }


  

   const handleOnSubmit  = (e) => {
    e.preventDefault();
     const {
     accountType,
     firstName,
     lastName,
     email,
     password,
     confirmPassword,
      } = signupData;

    dispatch(signUp( accountType,firstName,lastName,email, password,confirmPassword,otp , navigate));
   }

  return (
    <div className='text-white flex items-center justify-center mt-[20%]'>
    {
        loading ? (
            <div> Loading ...</div>
        )  : (
            <div>
                <h1>Verify Email</h1>
                <p>A Verification code has been sent to you. Enter the code below</p>
                <form  onSubmit ={handleOnSubmit}>
              <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
             
                    <button type='submit'>
                        Verify Email
                    </button>
                </form>
                <div>
                    <Link to='/login'>
                        <p>Back to login</p>
                    </Link>
                </div>
                <button
                onClick={ () => dispatch(sendOtp(signupData.email, navigate))}>
                    Resend it
                </button>
            </div>
        )
    }
      
    </div>
  )
}

export default VerifyEmail
