import React from 'react';
import { useSelector } from 'react-redux';
import Container from '../container/container';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LogoutBtn from './LogoutBtn';
import Logo from '../logo';




const Header = () => {
    const authStatus = useSelector((state)=>state.auth.status)
    const navigate = useNavigate()
    const navItems = [
        {
            name:"Home",
            slug:"/",
            active:true
        },
        {
            name:"Login",
            slug:"/login",
            active:!authStatus
        },
        {
            name:"Signup",
            slug:"/signup",
            active:!authStatus
        },
        {
            name:"login",
            slug:"/",
            active:true
        },
        {
            name:"login",
            slug:"/",
            active:true
        },
    ]
  return (
    <header className='bg-gray-50 shadow py-5'>  
        <Container className="flex">
            <nav>
                <div className='mr-5'>
                    <Link to='/'>
                        <Logo />
                    </Link>
                </div>
                <ul className='flex ml-auto'>
                    {navItems.map((item)=>item.active ? (
                        <li key={item.name}>
                            <button onClick={()=>navigate(item.slug)} 
                            classname="inline-block px-6 py-2 w-full hover:bg-blue-100 duration-200 rounded-full">
                                {item.name}
                            </button>
                        </li>
                    ): null)}
                    {authStatus && (
                        <LogoutBtn />
                    )}
                </ul>
            </nav>
        </Container>
    </header>
  );
}

export default Header;
