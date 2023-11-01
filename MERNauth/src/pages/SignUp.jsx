import React, { useState } from 'react'
import {Link} from "react-router-dom"
import axios from 'axios'
import toast from 'react-hot-toast';

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) =>{
    setFormData({...formData, [e.target.id]: e.target.value});
    setLoading(false);
  }
  // console.log(formData)

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      setError(null)
        const res = await fetch("/api/auth/signup",{
          method: "POST",
          headers:{
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(formData), 
        });
        const data = await res.json();

        if(data?.success === false){
          setError("Something went wrong")
          // setError(data.message)
          setLoading(false);
        }

        if(data?.exisitingUser) {
          setError(data.message)
          setLoading(false);
          return; 
         }
         if(data?.success){
           toast.success(data.message)  
           setError(null) 
           setLoading(false);
           return;
         }

          
          //====OR===//
          // const data = await axios.post("/api/auth/signup",{...formData})
          // .then(function (response) {
          //   console.log(response);
          // }) 
          // .catch(function (error) { 
          //   console.log(error);  
          // });

      
    } catch (error) {
      setLoading(false);
      setError(null) 
      
    }
  }; 

  return (
    <div>
      <h1 className='text-3xl text-center font-semibold my-7'>
        Sign UP 
      </h1>
    <div className='p-3 max-w-lg mx-auto'>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4' >
        <input type='text' placeholder='Username' id="username" className='bg-slate-100 p-3 rounded-lg' required
        onChange={handleChange}
        />
      
        <input type='email' placeholder='Email' id="email" className='bg-slate-100 p-3 rounded-lg'  required
        onChange={handleChange}
        />
      
        <input type='password' placeholder='Password' id="password" className='bg-slate-100 p-3 rounded-lg'  required
        onChange={handleChange}
        />

        <button disabled ={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? "Loading..." : "Sign UP"}
        </button>
      </form>

      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to ="/sign-in" >
          <span className='text-blue-500'>Sign in </span>
        </Link>
      </div>
      <p className='text-red-700 pt-5'>{error && error}</p>
    
    </div>
    </div>
  )
}

export default SignUp; 