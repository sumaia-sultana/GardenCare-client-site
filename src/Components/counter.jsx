
 import React from 'react';
import CountUp from 'react-countup';
 
 
 const Counter = () => {
   return (
      <div className='my-5 py-10'>
         <h1 className='text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold pb-5 text-center'>
             We are Green Loving Community</h1>
             <p className='text-sm text-center text-gray-500'>Our platform connects you with various amazing tips and hacks and many more gardener's share their personal experiences.  </p>
           <div className='grid  lg:grid-cols-4 md:grid-cols-2'>
             <div className='m-5 p-7  bg-[#65963e] relative space-y-3 border-white shadow-sm w-44 h-44 rounded-md'>
               
               <img className='items-center size-12' src='https://i.ibb.co.com/xKTMzb1v/success-doctor.png' alt='dr-icon'/>
           
                <h2 className='text-3xl text-[#dae7d1] font-extrabold'>  
                <CountUp enableScrollSpy
                start={0} end={1000}></CountUp>+
                </h2>
                <p className='text-white'>Sharied Tips</p>
             </div>
                
             <div className='m-5 p-7 relative space-y-3 bg-[#65963e] border-white shadow-sm w-44 h-44 rounded-md'>
             <img className='items-center size-12' src='https://i.ibb.co.com/6R63F3KW/success-review.png' alt='dr-icon'/>
             <h2 className='text-3xl  font-extrabold  text-[#dae7d1]'>
                <CountUp  enableScrollSpy
                start={0} end={400}></CountUp>+
                </h2>
                <p className='text-white'>Total Review</p>
             </div>

             <div className='m-5 p-7 relative space-y-3 bg-[#65963e]  border-white shadow-sm w-44 h-44 rounded-md'>
             <img className='items-center size-12' src='https://i.ibb.co/whc43qh9/gommunity-gardened-1.png' alt='dr-icon'/>
             <h2 className='text-3xl  text-[#dae7d1] font-extrabold'>
                <CountUp enableScrollSpy
                start={0} end={20

                } duration={2}>   
                </CountUp>+
                </h2>
                <p className='text-white'>Active Gardeners</p>
             </div>
             <div className='m-5 p-7 relative bg-[#65963e] space-y-3 border-white shadow-sm w-44 h-44 rounded-md'>                   
             <img className='items-center size-12' src='https://i.ibb.co.com/S7P2TyL6/success-staffs.png' alt='dr-icon'/>
                   <h2 className='text-3xl  text-[#dae7d1] font-extrabold'>
                <CountUp enableScrollSpy
                start={0} end={70}></CountUp>%
                </h2>
                <p className='text-white'>Trending Tips</p>
                    
             </div>
        </div>

      </div>
   );
 };
 
 export default Counter;