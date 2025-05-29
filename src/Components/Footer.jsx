import React, { use } from 'react';
 
import { NavLink } from 'react-router';
import { FaFacebook, FaGoogle, FaYoutube } from 'react-icons/fa';
import { AuthContext } from '../Context/AuthContext';
 
const Footer = () => {
    const {user} = use(AuthContext);
    //  console.log(user);
 
    return (

        <footer className="footer mt-10 pt-10 footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
             <div className='lg:flex justify-between flex  '>
        <img className='size-10 relative top-1  ' src='https://i.ibb.co/6J0LwVF3/logo-bgless.png' alt='logo' />
    <h1 className=" text-xl lg:flex md:flex relative lg:top-0.5 top-2  font-bold  ">
        Garden<span className='text-[#65963e] relative'>Care</span> </h1>
    </div>
    <p className='text-gray-500'>GardenCare is a blogging page,Here the passionate gardeners share their tips and hacks.</p>
  <nav className="flex gap-4">
    <ul className='flex gap-5'>
    <>
         <li className='text-[#65963e] font-semibold'><NavLink to='/'>Home</NavLink></li>
             <li className='text-[#65963e] font-semibold'><NavLink to='/gardener'>Explore Gardeners</NavLink></li>
             <li className='text-[#65963e] font-semibold'><NavLink to='/browsetips'>Browse Tips</NavLink></li>
             <li className='text-[#65963e] font-semibold'><NavLink to='/sharetips'>Share a Garden Tip</NavLink></li>
             {user && 
             <li className='text-[#65963e] font-semibold'><NavLink to={`/mytips/${user.email}`}>My Tips</NavLink></li>}
     
     </>
    </ul>

  </nav>
  <div className='flex '>
    <FaYoutube></FaYoutube>
    <FaFacebook></FaFacebook>
    <FaGoogle></FaGoogle>
  </div>
  
  <aside>
    <div className='flex gap-2'>Copyright © {new Date().getFullYear()} - All right reserved by 
         
        <h1 className="  lg:flex md:flex relative  font-bold  ">
        Garden<span className='text-[#65963e] relative'>Care</span> </h1></div>
  </aside>
</footer>
 
    );
};

export default Footer;