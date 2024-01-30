import React, { useState } from 'react';
import useForm from "react-hook-form"
import { useNavigate,Link } from 'react-router-dom';
import Input from '../components/Input';
import { useDispatch } from 'react-redux';
import Button from './Button';
import authService from '../appwrite/auth';
import { login as authLogin } from '../store/authSlice';
import Logo from '../components/logo';


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data)=>{
        setError("")
        try {
            const session = await authService.login(data) 
            if(session){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(authLogin({userData}))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div className='w-full flex items-center justify-center'>
        <div className={`w-full max-w-lg mx-auto border border-black/10 bg-gray-200 p-10 rounded-xl`}>
            <div className='mb-2 flex justify-center'>
                <span className='inline-block w-full max-w-[100px]'>
                    <Logo width="100%" />
                </span>
            </div>
            <h2 className='text-center font-bold text-2xl leading-tight'>
                Sign in to your account 
            </h2>
            <p className='mt-2 text-center'>
                Don&apos;t have any account?&nbsp; 
                <Link to="/signup" className='font-medium text-primary transition-all duration-200 hover:underline'>
                    Sign up
                </Link>
            </p>
            {error && 
            <p className='bg-red-500 mt-8 text-center'>
                {error}
            </p>}
            <form onSubmit={handleSubmit(login)} className='mt-8'>
                <div className='space-y-5'>
                    <Input label="Email " placeholder="Email" type="email" 
                    {...register("email", {required:true})}
                     />
                     <Input label="Password " placeholder="Password" type="password" 
                    {...register("password", {required:true})}
                     />
                     <Button className='w-full' type='submit'> Submit {" "}</Button>
                </div>
            </form>
        </div>
    </div>
  );
}

export default Login;
