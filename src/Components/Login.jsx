
import React, { use, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { Link, useLocation, useNavigate } from 'react-router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';

const Login = () => {

         const [error, setError] = useState();
         const  {signInUser, setUser} = use(AuthContext);


         const location = useLocation();
         const navigate = useNavigate();
          // console.log(location);
         console.log(signInUser);

        const [success, setSuccess] = useState();
        const [errorMessage, setErrorMessage] = useState('')

       const handleLogIn = e => {
 
        e.preventDefault();
        const email = e.target.email.value; 
        const password = e.target.password.value;
        // console.log(email, password);
        signInUser(email,password)
        .then(result => {
          console.log(result.user); 
          navigate(`${location.state? location.state : "/" }`)
          setSuccess(true); 
        })
        .catch(error => {
          const errorCode = error.code; 
          const errorMessage = error.message;         
          setErrorMessage(errorMessage); 
           setError(errorCode); 
           setSuccess(false)     
        });
     
    }

       const provider = new GoogleAuthProvider();
       const handleGoogle = () => {
        console.log('Google sign in clicked!');
  
      signInWithPopup(auth, provider).then(result => {
         console.log(result.user);
        setUser(result.user);
          navigate(`${location.state? location.state : "/" }`)
         
      }) .catch(error => {
          console.log(error);      
      })
    

      }
    return (
           
  <div className="hero-content flex-col">
    <div className="text-center">
    </div>
    <div className="card bg-base-100 w-88 my-10 shrink-0 shadow-sm">
      <div className="card-body">
        <form onSubmit={handleLogIn} className="fieldset">
             <h1 className="text-4xl text-[#65963e] font-bold">Login now!</h1> 
          <label className="label">Email</label>
          <input type="email" name='email' className="input" placeholder="Email" />
          <label className="label">Password</label>
          <input type="password" name='password' className="input" placeholder="Password" />
          <div><a className="link link-hover">Forgot password?</a></div>
          {
          errorMessage && <p className='text-red-500'> {errorMessage} </p>
        }
          <button className="btn bg-[#65963e] text-amber-50 mt-4">Log in</button>
          {
          success && <p className="text-green-500 font-semibold" >You're successfully Logged In!</p>
        }
        </form>
        <div className="divider"><span className='text-[#65963e] font-bold'>or</span></div>
        <div className='justify-center items-center'>
        <button onClick={handleGoogle}  className="btn mt-3 shadow-green-200 shadow-sm hover:bg-[#65963e] hover:text-amber-50 bg-white text-black border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Login with Google
            </button>

        </div>
        <p className='font-semibold text-gray-500'>New To This website? Please <Link to='/register' className='text-blue-500 underline' >Register now</Link>  </p>
        
         
      </div>
    </div>
   
  </div>
 
 
       
    );
};

export default Login;