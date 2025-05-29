import React from 'react';
import { Link } from 'react-router-dom';  

const Error = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-[80vh] text-center'>
            <h1 className='text-2xl text-[#65963e] pb-3 font-bold'>No Page found!</h1>
            <div className='flex justify-center'>
                <img 
                    className='w-60 h-60' 
                    src='https://i.ibb.co/bjK2vV9g/404errored.png' 
                    alt='404 Error' 
                />
            </div>
            <p className='text-gray-500 pb-3'>Opps!! No Content Found With the route.</p>
            <Link to='/' className='inline-block'>
                <button className='btn text-white bg-[#65963e]'>Back To Home</button>
            </Link>
        </div>
    );
};

export default Error;