
import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import Swal from 'sweetalert2';
import Theme from './Theme';
import { FaMoon, FaSun } from 'react-icons/fa';

const Navbar = () => {
 
  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");  // Fixed navigation
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have been successfully logged out",
        });
      })
      .catch(error => {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message || "Something went wrong!",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      });
  };

  const links = <>
    <li className='text-[#65963e] font-semibold'><NavLink to='/'>Home</NavLink></li>
    <li className='text-[#65963e] font-semibold'><NavLink to='/gardener'>Explore Gardeners</NavLink></li>
    <li className='text-[#65963e] font-semibold'><NavLink to='/browsetips'>Browse Tips</NavLink></li>
    <li className='text-[#65963e] font-semibold'><NavLink to='/sharetips'>Share a Garden Tip</NavLink></li>
    {user && <li className='text-[#65963e] font-semibold'><NavLink to={`/mytips/${user.email}`}>My Tips</NavLink></li>}
  </>;
 
    return (
        <div>
              <nav className="navbar bg-base-100 shadow-sm">
  <div className="navbar-start">
    <div className="dropdown">
      <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
         {links}
      </ul>
    </div>
    <nav className='lg:flex justify-between flex  dark:bg-gray-900 text-black dark:text-white '>
        <img className='size-10 relative  lg:-top-2' src='https://i.ibb.co/6J0LwVF3/logo-bgless.png' alt='logo' />
    <h1 className=" text-2xl lg:flex md:flex relative lg:-top-0.5  top-2  font-bold  ">
        Garden<span className='text-[#65963e] relative'>Care</span> </h1>
        
    </nav>
    
  </div>
  <div className="navbar-center hidden lg:flex">
    <ul className="menu menu-horizontal px-1  text-[#65963e] font-semibold">
      {links}
    </ul>
  </div>
  <div className="navbar-end gap-1.5"> 
    { user ? 
     <> 
     <div className="tooltip  tooltip-bottom" data-tip={`${user.displayName } ${user.email}`}>
      <div className="avatar"> 
         <div className="ring-active ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-1">
        <img src= {user.photoURL} />
    </div>   
</div>
</div>      
    <button onClick={handleSignOut}  className="btn bg-[#65963e] text-white">Log Out</button>
       </>      
       :
       <>
       <Link to='/register' className="btn bg-[#65963e] text-white">Register</Link>
       <Link to='/login' className="btn bg-[#65963e] text-white">Log In</Link> 
     </>
    }      
  </div>
  <Theme/>
  {/* <Theme/> */}
 


  {/* <button
    onClick={handleToggleTheme}
    className="cursor-pointer dark:bg-[#334155] p-2 rounded-full dark:text-yellow-400 bg-[#2C2C2C]/70 text-white hover:bg-[#2C2C2C]"
> <Icon size={22} />
</button> */}
</nav>
        </div>
    );
};

export default Navbar;
