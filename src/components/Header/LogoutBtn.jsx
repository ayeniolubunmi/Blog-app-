import React from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/database';
import { logout } from '../../store/authSlice';

const LogoutBtn = () => {
     const dispatch = useDispatch()
     const logoutHandler = ()=>{
        authService.logout().then(()=>{
            dispatch(logout());
        })
     }
  return (
    <button 
    onClick={logoutHandler} 
    className='hover:bg-blue-100 
    inline-block rounded-full px-6 py-2 duration-200'>
      Logout
    </button>
  );
}

export default LogoutBtn;
