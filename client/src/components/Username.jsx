import React from 'react'
import avatar from '../assets/images/profile.png'
import styles from '../assets/css/Username.module.css';
import { Link } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import {userNameValidate} from '../helpers/validate'

export default function Username() {
  const { values, handleSubmit ,handleChange,handleBlur } = useFormik({
    initialValues: {
      userName: ""
    },
    validate:userNameValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);

    }
  })
  return (
    <div className="container mx-auto">

      <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen'>
        <div className={styles.glass}>

          <div className="title flex flex-col items-center">
            <h4 className='text-4xl font-bold py-2'>Hello !</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1' onSubmit={handleSubmit}>
            <div className='profile flex justify-center py-4'>
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input value={values.userName} onChange={handleChange} name='userName'

                onBlur={handleBlur} className={styles.textbox} type="text" placeholder='Username' />
              <button className={styles.btn} type='submit'>Let's Go</button>
            </div>

            <div className="text-center py-4">
              <span className='text-gray-500'>Not a Member <Link className='text-red-500' to="/register">Register Now</Link></span>
            </div>

          </form>

        </div>
      </div>
    </div>
  )
}
