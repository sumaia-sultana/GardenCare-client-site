
import React, { use, useEffect } from 'react';
import { AiOutlineLike } from 'react-icons/ai';
import { Link, useLoaderData } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import { useState } from 'react';

const BrowseTips = () => {
    const usersTipsDB = useLoaderData();
  console.log(usersTipsDB);
  const { user} = use(AuthContext);
  const [tips, setTips] = useState(usersTipsDB)
  const [search, setSearch] = useState("")
  //   Searching Level
  useEffect(() => {
      fetch(`http://localhost:3000/userstip?search=${search}`)
      .then((res) => res.json())
      .then((data) => setTips(data));
  }, [search])
   
        // Updating user Like
         const handleLiked = (tip) => {           
          const userEmail =  user?.email;  
          //preventing user from liking own tips   
          if(tip.email === userEmail){
              Swal.fire({
                       position: "top-end",
                       icon: "warning",
                       title: "You can't like your own tips",
                       showConfirmButton: false,
                       timer: 1500
                   });
                   return;
          }
           fetch(`http://localhost:3000/userstip/${tip.email}`, {
               method: 'PATCH',
               headers: {
                   'content-type': 'application/json'
               },
               body: JSON.stringify({userEmail })  
           })
           .then(res => res.json())
           .then(result => {
               if (result.modifiedCount === 1) {
              const updatedLike = tips.map((item) =>
              item._id === tip._id ? 
              { ...item, likes: (item.likes || 0) + 1 ,
                  likedBy: [...(item.likedBy || []), userEmail]
                } : item
                );
                setTips(updatedLike);
                     Swal.fire({
                         position: "top-end",
                         icon: "success",
                         title: "Like updated successfully",
                         showConfirmButton: false,
                         timer: 1500
                     });
                 }
             })
             .catch(error => {
                 console.error('Error updating like:', error);
                 Swal.fire({
                     icon: 'error',
                     title: 'Update Failed',
                     text: 'Failed to update like status'
                 });
             });
         };
         console.log(search);
         
    
return (
 <div>
     <div className=" bg-[url('https://i.ibb.co/Swbw3qq7/Gardening-bannersmh.jpg')] pt-10 pb-10">
    <h1 className='pb-5 pt-20 text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold'>Our All amazing Gardening Tips... </h1>
    </div>
    <div>
     {/* Search Bar accord to level */}
<fieldset className="space-y-2 m-5 px-10">
  <label className="label text-white font-bold text text-shadow-md text-shadow-[#65963e]">
    Difficulty Level
  </label>
  <div className="flex gap-2">
    <select 
      name="Level" 
      className="select w-full flex-1"  
      placeholder="search"
      onChange={(e) => setSearch(e.target.value)}>
        
      <option disabled selected>Select Level</option>
      <option>Easy</option>
      <option>Medium</option>
      <option>Hard</option>
    </select>
    <button 
      className="bg-[#65963e] text-white font-bold px-4 py-2 rounded hover:bg-[#4a7a2a] transition-colors"
    >
      Search
    </button>
  </div>
</fieldset>
            </div>
  {/* Browse Table */}  
  <div> 
    <table className="min-w-full bg-white  border border-[#65963e] rounded-lg">          
        <thead className="bg-[#e6f5da]">              
       <tr>                                    
        <th className="py-3 px-4 text-[#65963e] text-center">Title</th>                  
        <th className="py-3 px-4 text-[#65963e] text-center">Category</th>                  
        <th className="py-3 px-4 text-[#65963e] text-center">Action</th>                  
        <th className="py-3 px-4 text-[#65963e] text-left">Image</th>                    
        <th className="py-3 px-4 text-[#65963e] text-left">Like </th>                  
        </tr>                                
        </thead>                
        <tbody>              
            {tips.map((tip) => (                  
            <tr key={tip._id} className="hover:bg-gray-50 border-b border-[#4a8c15]">                                            <td className="py-4 px-4 text-[#65963e] text-left font-medium">{tip.title}</td>                      <td className="py-4 px-4">                          <span className="bg-[#ceebb6] text-[#468910] text-xs px-2 py-1 rounded-full">                              {tip.category}                          </span>                      </td>                      <td>                    <span className={`badge ${                   tip.Level === 'Easy' ? 'badge-success' :
            tip.Level === 'Medium' ? 'badge-warning' : 'badge-error'
      }`}>
        {tip.Level}
      </span>
    </td>
      <td className="py-4 px-4">
        <Link to={`/userstip/${tip._id}`}>
         <button className="bg-[#65963e] hover:bg-[#ceebb6] text-white px-3 py-1 rounded text-sm">
            see details</button></Link>
        </td>
     <td className="py-4 px-4">
       {tip.photo && (
         <img src={tip.photo} alt={tip.title} className="w-16 h-16 object-cover rounded"/>
         )}
     </td>
      <td>
      <button 
        onClick={() => handleLiked(tip)}
        className="text-[#65963e]  text-center hover:text-[#65963e]"
      ><AiOutlineLike />{tip.likes || 0}
      </button>
    </td>
      </tr>
        ))}
        </tbody>
          </table> 
        </div>
        </div>
    );
};

export default BrowseTips;