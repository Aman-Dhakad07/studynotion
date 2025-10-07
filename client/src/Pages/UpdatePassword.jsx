import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPassword } from '../services/operations/authAPI';
import { useLocation, useNavigate } from 'react-router-dom';
import { IoMdEyeOff } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import { Link } from 'react-router-dom';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location  = useLocation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        password:"",
        confirmpassword:"",
    })
    const {loading} = useSelector( (state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {password, confirmpassword} = formData;

    const handleOnChange = (e) => {
        setFormData( (prevData) => (
        {
            ...prevData,
            [e.target.name] : e.target.value,
        }
        ))
    }

    const handleOnSubmit = (e) => {
     e.preventDefault();
     const token = location.pathname.split('/').at[-1];
     dispatch(resetPassword(password,confirmpassword, token, navigate));
    }
  return (
    <div className='text-white'>
    {
        loading ? (
            <div>
                Loading ...
            </div>
        )  :  (
            <div>
                <h1>Choose new Password</h1>
                <p>Almost done. Enter your new password and you are all set.</p>

                <form onSubmit={handleOnSubmit}>
                    <label>
                        <p>New Password <sup>*</sup></p>
                        <input 
                            required
                            type={showPassword ? "text"  : "password"}
                            name="password"
                            value={password}
                            onChange={handleOnChange}
                            placeholder='password'
                            className='w-full p-6 bg-richblack-600 text-richblack-5'
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)}>
                         {
                            showPassword ? 
                            <IoMdEyeOff  fontSize={24}/> 
                            : <IoEye fontSize={24}/>
                         }

                        </span>
                    </label>
                     <label>
                      <p>Confirm Password <sup>*</sup></p>
                        <input 
                            required
                            type={showConfirmPassword ? "text"  : "password"}
                            name="confirmpassword"
                            value={confirmpassword}
                            onChange={handleOnChange}
                            placeholder='ConfirmPassword'
                             className='w-full p-6 bg-richblack-600 text-richblack-5'
                        />
                        <span onClick={() => setShowConfirmPassword((prev) => !prev)}>
                         {
                            showConfirmPassword ? 
                            <IoMdEyeOff  fontSize={24}/> 
                            : <IoEye fontSize={24}/>
                         }

                        </span>
                    </label>
                    
                    <button type='submit'>
                        Reset Password
                    </button>
                 <Link to='/login'>
                 <p>Back to Login</p>
                </Link>

                </form>
            </div>

        )
    }
      
    </div>
  )
}

export default UpdatePassword
