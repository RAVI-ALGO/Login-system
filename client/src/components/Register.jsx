import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/images/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { registerValidation } from '../helpers/validate';
import convertToBase64 from '../helpers/convert';
import { registerUser } from '../helpers/helper'


import styles from '../assets/css/Username.module.css';

export default function Register() {

  const navigate = useNavigate()
  const [file, setFile] = useState()

  const { values, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: '',
      userName: '',
      password: ''
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
     
       values = await Object.assign(values, { profile : file || ''})
      
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/')});
    }
  })

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  }

  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass} style={{ width: "35%",height: "90%", paddingTop: '3em' }}>

          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold'>Register</h4>
            <span className='py-2 text-xl w-2/3 text-center text-gray-500'>
              Happy to join you!
            </span>
          </div>

          <form className='py-1' onSubmit={handleSubmit}>
            <div className='profile flex justify-center py-4 '>
              <label htmlFor="profile">
                <img src={file || avatar} className={styles.profile_img} title='Profile picture' alt="avatar" />
              </label>

              <input onChange={onUpload} type="file" id='profile' name='profile' />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input value={values.email} onChange={handleChange} name='email'
                onBlur={handleBlur} className={styles.textbox} type="text" placeholder='Email*' />
              <input value={values.userName} onChange={handleChange} name='userName'
                onBlur={handleBlur} className={styles.textbox} type="text" placeholder='Username*' />
              <input value={values.password} onChange={handleChange} name='password'
                onBlur={handleBlur} className={styles.textbox} type="text" placeholder='Password*' />
              <button className={styles.btn} type='submit'>Register</button>
            </div>

            <div className="text-center py-2">
              <span className='text-gray-500'>Already Register? <Link className='text-red-500' to="/">Login Now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
