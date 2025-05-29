import React, { use, useState } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { GoogleAuthProvider, signInWithPopup, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/firebase.init';
import { Link, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const Register = () => {

    const  {createUser, setUser} = use(AuthContext);
    console.log(createUser);


     const [success, setSuccess] = useState(false);
     const [errorMessage, setErrorMessage ] = useState('')
     const [showPassword, setShowPassword] = useState(false);
         
        const navigate = useNavigate()
        const handleRegister = e => {
        e.preventDefault();
        const form = e.target;
        console.log(e.target);
        const formData = new FormData(form)

        const  { password, email, name, photo } = Object.fromEntries(formData.entries())
        
        const terms = e.target.check.checked;
        // console.log( password,email, name,photo, terms);
         
        setSuccess(false);
        setErrorMessage('');
        if(!terms){
          setErrorMessage('please accept the terms and conditions.');
          return
        }
        // console.log({ email, password, name,photo});
        
          createUser(email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                return updateProfile(user, {
                    displayName: name,
                    photoURL: photo
                });
            })
            .then(() => {
                setUser(auth.currentUser);
                setSuccess(true);
                navigate(location.state?.from || "/");
            })
            .catch(error => {
             console.log(error); 
              setErrorMessage(error.message) ; 
           })
           
     }
    
          const handleGoogle = () => {
             const provider = new GoogleAuthProvider();
              // console.log('Google sign in clicked!');
              signInWithPopup(auth, provider).then(result => {
                       console.log(result.user);
                       setUser(result.user);
                       navigate(location.state?.from || "/");
                       
                    }) .catch(error => {
                        console.log(error);      
                    })

 }


    return (
        <div>
             <div className='card border-green-200 w-88  my-10 shrink-0 shadow-green-200 shadow-sm mx-auto'>           
                <h1 className='text-3xl text-[#65963e]  font-bold m-5'>Please Sign Up now!</h1>         
            <div className='card-body'>
                <form onSubmit={handleRegister} className='space-y-4 '> 
                <label className="input validator bg-white">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
    </g>
  </svg>
  <input type="email"
    name="email"
   placeholder="mail@site.com" required />
</label>
<br/>
<div className="validator-hint space-y-5 hidden">Enter valid email address</div>
  
  {/* name */}

   <label className="input validator bg-white">
   
  <input type="name"
    name="name"
   placeholder="Enter Your Name" required />
</label>
<div className="validator-hint space-y-5   hidden">Enter  name</div>
  
  {/* photo */}
  
  <label className="input validator bg-white ">
   
  <input type="Photo URl"
    name="photo"
   placeholder="Enter Your photo URL" required />
</label>
<div className="validator-hint space-y-5 hidden">Enter  name</div>
<label className="input validator bg-white space-y-5">
   
 
  <div>
  <input
    type={showPassword ? "text" : "password"}
    name='password'
    className="w-full p-2 pr-10 rounded bg-white " 
    required
    placeholder="Password"
    minLength="8"
    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
    title="Must be more than 8 characters, including number,
     lowercase letter, uppercase letter"
  />
   <button 
      type="button"
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
      onClick={() => setShowPassword(!showPassword)}
      
    >
      {showPassword ? 
      <FaEyeSlash  className="h-5 w-5" />// Replace with  eye-off icon     
        : <FaEye className="h-5 w-5" />   // Replace with  eye icon
      }
    </button>
  </div>
  
</label>
<p className="validator-hint hidden">
  Must be more than 8 characters, including
  <br />At least one number <br />At least one lowercase letter <br />At least one uppercase letter
</p> <br/>
<label className="label">
    <input name="check" type="checkbox" className="checkbox" />
    Accept terms & conditions
  </label>
 <br/>
<input className='btn bg-[#65963e] text-white' type="submit" value="Sign Up"/> 
                </form>
                <p>Already have an account? Please <Link to='/Login' className='text-blue-500 underline'>Log In</Link> </p>
                {
                    errorMessage && <p className='text-red-500'> {errorMessage} </p>
                }
                {
                    success && <p className='text-[#65963e]'>User has created Successfully! </p>
                }
                  <div>
                    <div className="divider items-center justify-center"><span className='text-[#65963e] font-semibold'>or</span></div>
                    <div className='items-center justify-center'>
                    <button onClick={handleGoogle}  className="btn text-center mt-3 shadow-sm shadow-green-200 bg-white text-black hover:bg-[#65963e]  hover:text-amber-50 border-[#e5e5e5]">
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
            Sign Up with Google
            </button> 
            </div> 
             
            </div> 
             
            </div>

        </div>
        </div>
    );
};

export default Register;