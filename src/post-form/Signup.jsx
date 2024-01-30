import React, { useState } from 'react';
import useForm from "react-hook-form"
import { useNavigate,Link } from 'react-router-dom';
import Input from '../components/Input';
import { UseDispatch, useDispatch } from 'react-redux';
import Button from './Button';
import authService from '../appwrite/auth';
import { login } from '../store/authSlice';
import Logo from '../components/logo';

const Signup = () => {
    const navigate = useNavigate();
    const [error,setError] = useState("");
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm({})
    
    const create = async (data)=>{
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData=await authService.getCurrentUser()
                if(userData) dispatch(login({
                    userData
                }))
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='flex items-center justify-center'>
        <div className='w-full 
        max-w-lg mx-auto rounded-xl border-black/10 border bg-gray-100 p-10'>
            <div className='mb-2 flex justify-center'>
                <span className='w-full inline-block max-w-[100px]'> 
                    <Logo />
                </span>
            </div>
            <h2 className='text-center text-2xl font-bold leading-tight'>
                Signup your current account
            </h2>
            <p className='mt-2 text-center text-base text-black/50'>
                Already have an account?&nbsp;
                <Link to="/login" className='font-medium text-primary transition-all duration-200 hover:underline'> 
                    Sign in 
                </Link>
            </p>
            {error && 
                <p className='text-red-600 mt-8 text-center'>
                    {error}
                </p>
            }
            <form onSubmit={handleSubmit(create)} className='mt-8'>
                <Input 
                label="Full name" 
                placeholder="fullname" 
                {...register("name", {required:true})}/>
                <Input 
                label="Email" 
                type="email"
                placeholder="Email Address" 
                {...register("email", {required:true})}/>
                <Input 
                label="Password" 
                placeholder="password"
                type="password" 
                {...register("password", {required:true})}/>
                <Button className='w-full' type='submit'> Create Account</Button>
            </form>
        </div>
    </div>
  );
}

export default Signup;
