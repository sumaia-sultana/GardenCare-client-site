 
import React, { use } from 'react';
import { useLoaderData, useNavigate  } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';

const Update = () => {

  const { user} = use(AuthContext);
    const {title, _id,
    email, name, type, category,description,
    photo,Availability,Level} = useLoaderData()
     const navigate = useNavigate();
    // Update user tips
    const handleUpdateTip = e => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const updateTips = Object.fromEntries(formData.entries());

        fetch(`https://assignment10-server-beryl.vercel.app/userstip/${_id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updateTips)
        })
        .then(res => {
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return res.json();
        })
        .then(data => {
            if (data.modifiedCount) {
                return Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your tip has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            throw new Error('No documents were modified');
        })
        .then(() => {
            navigate(`/mytips/${user?.email}`);  
        })
        .catch(error => {
            console.error('Error updating tip:', error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.message
            });
        });
    };
return (
         <div>
            <div className='m-auto p-10'>
                <h1 className='text-2xl text-[#65963e] font-bold'>Update Your Garden's Tips With Here</h1>
            </div>
       <form className='p-8' onSubmit={handleUpdateTip}> 
         
        <div 
  className="bg-cover bg-center"
  style={{
    backgroundImage: "url('https://i.ibb.co/m51mhLJS/gardenn-1.jpg')",
     
  }}
>
    <fieldset className="fieldset text-left grid lg:grid-cols-2 gap-4 border-base-300 rounded-box  space-y-0.5   border px-10">
  <legend className="fieldset-legend text-center text-white">Form details</legend>

  <fieldset className='space-y-0.5'><label className="label text-white text-shadow-md text-shadow-[#65963e] font-bold">Title</label>
  <input type="text" name='title' defaultValue={title} className="input bg-white w-full" placeholder="Your Tips Title...." /></fieldset>
 
    <fieldset className='space-y-0.5'> 
   <label className="label text-white text-shadow-md text-shadow-[#65963e] font-bold">User Email</label>
  <input type="email" name='email' defaultValue={email} className="input bg-white w-full" placeholder="mail@send.com" />
  </fieldset>
  <fieldset className='space-y-0.5'> 
   <label className="label text-white text-shadow-md text-shadow-[#65963e] font-bold">User Name</label>
  <input type="name" name='name' defaultValue={name} className="input bg-white w-full" placeholder="your name..." />
  </fieldset>
  
 <fieldset className='space-y-0.5'>
  <label className="label text-white text-shadow-md text-shadow-[#65963e] font-bold">Topic/Plant Type</label>
  <input type="text" name='type'defaultValue={type} className="input bg-white w-full" placeholder="Enter your Plants type" />
 </fieldset>
  
<fieldset className="space-y-0.5">
  <label className="label text-white font-bold text text-shadow-md text-shadow-[#65963e]">
    Category
  </label>
  <select
    name="category" 
    defaultValue={category}
    className="select bg-white w-full"  
    placeholder="Select Category"
  >
    <option disabled selected>Select Category</option>
    <option>Plant Care</option>
     <option>Composting</option>
    <option>Landscaping</option>
    <option>Indoor Gardening</option>
    <option>Ornamental Gardening(Flower/Bonsai)</option>
    <option>Vegetable Gardening</option>
     <option>Medicinal Gardening</option>
     <option>Roof/Patio Gardening</option>
     <option>Organic Gardening</option>
     <option>Greenhouse Gardening </option>
  </select>
</fieldset>

 <fieldset className='space-y-0.5'>
   <label className="label text-white text-shadow-md text-shadow-[#65963e] font-bold">Description </label>
  <input type="text" name='description' defaultValue={description} className="input bg-white w-full" placeholder="Please Give a description..." />
</fieldset>
 <fieldset className="space-y-0.5">
  <label className="label text-white font-bold text text-shadow-md text-shadow-[#65963e]">
   Difficulty Level
  </label>
  <select 
    name="Level" 
    defaultValue={Level}
    className="select bg-white w-full" // Ensure you have styles for `select` in your CSS
    placeholder="Select Category"
  >
    <option disabled selected>Select Level</option>
    <option>Easy</option>
    <option>Medium</option>
    <option>Hard</option>
  </select>
</fieldset>
   
  <fieldset className="space-y-0.5">
  <label className="label text-white font-bold text text-shadow-md text-shadow-[#65963e]">
    Availability
  </label>
  <select 
    name="Availability" 
    defaultValue={Availability}
    className="select bg-white w-full" // Ensure you have styles for `select` in your CSS
    placeholder="Select Category"
  >
    <option disabled selected>Select Category</option>
    <option>Public</option>
    <option>Hidden</option>
  </select>
</fieldset>
  
</fieldset>
<fieldset className='mx-5 px-7'><label className="label text-white text-shadow-md text-shadow-[#65963e] font-bold">Image url</label>
  <input type="text" name='photo' defaultValue={photo} className="input bg-white w-full" placeholder="Enter your Photo URL" /></fieldset>
                  
      <div className='py-5'>   
    <button  type='submit' className="relative inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold text-[#65963e] transition-all duration-150 ease-in-out rounded hover:pl-10 hover:pr-6 bg-gray-50 group">
    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-[#65963e] group-hover:h-full"></span>
    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
        <svg className="w-5 h-5 text-[#65963e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
        <svg className="w-5 h-5 text-[#65963e]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative w-full text-left transition-colors duration-200 ease-in-out group-hover:text-white">Submit Your updated Tip</span>
</button>
</div> 
          </div>
          
        
        
       </form>

       </div>
    );
};


export default Update;