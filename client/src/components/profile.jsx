import React, { useState } from 'react'
import avatar from '../assets/images/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { profileValidation } from '../helpers/validate';
import convertToBase64 from '../helpers/convert';
//import useFetch from '../hooks/fetch.hook';
import { updateUser } from '../helpers/helper'
import { useNavigate } from 'react-router-dom'

import styles from '../assets/css/Username.module.css';
import extend from '../assets/css/Profile.module.css'

export default function Profile() {

  const [file, setFile] = useState();
 // const [{ isLoading, apiData, serverError }] = useFetch();
  const navigate = useNavigate()
 
  const {values, handleSubmit, handleChange, handleBlur} = useFormik({
    initialValues : {
      firstName :  '',
      lastName:'',
      email:'',
      mobile:'',
      address :''
    },
    enableReinitialize: true,
    validate : profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async (values) => {
      values = await Object.assign(values, { profile : ''})
        console.log("Profile values",values);
      //   let updatePromise = updateUser(values);

    //   toast.promise(updatePromise, {
    //     loading: 'Updating...',
    //     success : <b>Update Successfully...!</b>,
    //     error: <b>Could not Update!</b>
    //   });

    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  // logout handler function
  function userLogout(){
    localStorage.removeItem('token');
    navigate('/')
  }

//   if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
//   if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={`${styles.glass}`} style={{ width: "35%", paddingTop: '3em'}}>

          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold'>Profile</h4>
            <span className='py-3 text-xl w-2/3 text-center text-gray-500'>
                You can update the details.
            </span>
          </div>

          <form className='py-1' onSubmit={handleSubmit}>
              <div className='profile flex justify-center py-3'>
                  <label htmlFor="profile">
                    <img src={(file)?file:avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                  </label>
                  
                  <input onChange={onUpload} type="file" id='profile' name='profile' />
              </div>

              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input value={values.firstName} onChange={handleChange} name='firstName'
                onBlur={handleBlur} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='FirstName' />
                  <input value={values.lastName} onChange={handleChange} name='lastName'
                onBlur={handleBlur} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='LastName' />
                </div>

                <div className="name flex w-3/4 gap-10">
                  <input value={values.email} onChange={handleChange} name='email'
                onBlur={handleBlur} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Mobile No.' />
                  <input value={values.mobile} onChange={handleChange} name='mobile'
                onBlur={handleBlur} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Email*' />
                </div>

               
                  <input value={values.address} onChange={handleChange} name='address'
                onBlur={handleBlur} className={`${styles.textbox} ${extend.textbox}`} type="text" placeholder='Address' />
                  <button className={styles.btn} type='submit'>Update</button>
               
                  
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>come back later? <button onClick={userLogout} className='text-red-500' to="/">Logout</button></span>
              </div>

          </form>

        </div>
      </div>
    </div>
  )
}
