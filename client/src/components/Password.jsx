import React, { useEffect, useState } from 'react'
import avatar from '../assets/images/profile.png'
import styles from '../assets/css/Username.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import {passwordValidate} from '../helpers/validate'
import { useAuthStore } from '../store/store';
import { getUser, verifyPassword } from '../helpers/helper';
import axios from 'axios';

export default function Password() {
  const { username} = useAuthStore (state => state.auth)
  const [userData,setUserData] = useState('')
  const navigate = useNavigate()
  const { values, handleSubmit ,handleChange,handleBlur } = useFormik({
    initialValues: {
      password: ""
    },
    validate:passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const formdata = new FormData();

      formdata.append("userName", username);
      formdata.append("password", values.password);
      
      await axios
        .post("http://localhost:8080/api/login", formdata, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
         console.log(res);
          if (res.status === 200) {
            localStorage.setItem("token", res.data.token);
            console.log("token generate = " + localStorage.getItem("token"));
            toast.success(res.data.msg)
            navigate('/profile')
          }
        
        })
        .catch((err) => {
          if (err.response.data.error) {
            toast.error(err.response.data.error)
          }
          if (err.response.data.message) {
            alert(err.response.data.message);
          }
        });
   
    }
  })

  useEffect(() => {
  getUser(username).then((result)=>{
    if(result?.error)
    {
      toast.error(result.error)
    }
    if(result?.data)
    {
      console.log(result.data)
      setUserData(result.data)
    }
  }).catch((err)=>console.log(err));
  }, [])
  
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold'>Hello {userData?.userName}</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={userData.profile?userData.profile: avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input value={values.password} onChange={handleChange} name='password'
                onBlur={handleBlur} className={styles.textbox} type="text" placeholder='Password' />
              <button className={styles.btn} type='submit'>Sign In</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Forgot Password ? <Link className='text-red-500' to={`/password/recover-password/${username}`}>Recover Now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
  }
