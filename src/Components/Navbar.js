import { signOut } from 'firebase/auth';
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from './firebase.init';

const Navbar = () => {
    const [user, loadding] = useAuthState(auth);
    const navigate =useNavigate();

    //user logout //
    const signout = () => {
        signOut(auth);
        navigate('/');
        toast.success("Logout Successful !", {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const menu =
        <>
            <li className='lg:text-xl'><Link to={'/'}>Home</Link></li>
            <li className='lg:text-xl'><Link to={'/manage-todo'}>Manage Todo</Link></li>
            {
            user ? <li className='lg:text-xl'><button onClick={signout}>Logout</button></li> :
            <li className='lg:text-xl'><Link to={'/login'}>Login</Link></li>

        }
            

        </>

    return (
        <div class="navbar bg-base-100">
            <div class="navbar-start">
                <div class="dropdown">
                    <label tabindex="0" class="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        {menu}
                    </ul>
                </div>
                <a class="btn btn-ghost normal-case text-xl">TODO APP</a>
            </div>
            <div class="navbar-center hidden lg:flex">
                <ul class="menu menu-horizontal p-0">
                    {menu}
                </ul>
            </div>
            <div class="navbar-end">
            <Link class="btn" to={'/manage-todo'}>Get Started</Link>
               

            </div>
        </div>
    );
};

export default Navbar;