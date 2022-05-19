import React, { useEffect, useState } from 'react';
import {  useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from './firebase.init';
import Loadding from './Loadding';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    // signin with google //
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    useEffect(() => {
        if (googleUser) {
            navigate(from, { replace: true });
            toast.success("Login Successful !", {
                position: toast.POSITION.TOP_RIGHT
            });
            setErrorMessage('')
        }
        
    }, [googleUser]);

    //handle all errors//
    useEffect(()=>{
        if(googleError){
            const message = googleError?.code.split('/')[1];
            setErrorMessage(message)
        }else{
            setErrorMessage('')
        }
    },[googleError])


    if (googleLoading) {
        return <Loadding />
    }
    return (
        <div class="card w-96 bg-base-100 shadow-xl mx-auto mt-10">
            <div class="card-body">
                <h2 class="uppercase text-xl text-center">Please Login</h2><hr />
                {
                        errorMessage &&
                        <div className="alert shadow-lg h-10 text-center mt-5">
                            <div className='flex justify-center mx-auto'>
                                <small className='text-red-500 text-center uppercase'>{errorMessage}</small>
                            </div>
                        </div>
                    }
                <button onClick={() => signInWithGoogle()} class="btn btn-outline mt-10 mb-10">Continue with google</button>
            </div>
        </div>
    );
};

export default Login;