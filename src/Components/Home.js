import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='mt-32 flex flex-col'>
            <h1 className='text-center text-primary  sm:xl md:2xl lg:text-4xl font-bold mb-'>Welcome TODO Application</h1>
            <button class="btn btn-xs my-5 sm:btn-sm md:btn-md lg:btn-md btn-primary mx-auto h-[20px]"><Link to={'/manage-todo'}>Get Started</Link></button>
        </div>
    );
};

export default Home;