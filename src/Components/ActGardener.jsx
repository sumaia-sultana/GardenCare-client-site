 import React, { useEffect, useState } from 'react';
import Loading from '../pages/Loading';
import { Link } from 'react-router';
 
 const ActGardener = () => { 
  const [displayGardeners, setDisplayGardeners] = useState([]);
  
  const [loading, setLoading] = useState(true);

    useEffect(() => {
  fetch("/Gardener.json")
    .then((res) => res.json())
    .then(data => {
      const activeGardeners = data.filter(g => g.status === "Active Gardener");
      setDisplayGardeners(activeGardeners);
      setLoading(false);
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      setLoading(false);
    });
}, []);

  if (loading) {
    return <div className="text-center py-8"><Loading/></div>;
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold text-center mb-8">👥 Here's Our Active Gardeners</h1>
      
      {displayGardeners.length === 0 ? (
        <p className="text-center">No gardeners found</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayGardeners.map(gardener => (
              <div 
                key={gardener.id} 
                className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
                  gardener.status !== "Active Gardener" ? "opacity-75" : ""
                }`}
              >
                <div className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <img 
                      src={gardener.image} 
                      alt={gardener.name} 
                      className="w-24 h-24 rounded-full object-cover border-4 border-[#6bb52f]"
                    />
                    <h2 className="mt-4 text-xl font-semibold text-gray-800">{gardener.name}</h2>
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-2 ${
                      gardener.status === "Active Gardener" 
                        ? "text-[#65963e] bg-[#caeeac]" 
                        : "text-gray-600 bg-gray-200"
                    }`}>
                      {gardener.status}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-gray-600">
                      <span className="font-medium">Specialty:</span> {gardener.specialty}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Experience:</span> {gardener.experience}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Location:</span> {gardener.location}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Last Active:</span> {gardener.lastActive}
                    </p>
                  </div>
                  
                  <p className="mt-4 text-gray-700 italic">"{gardener.bio}"</p>
                </div>
              </div>
            ))}
          </div>

          
        </>
      )}
      <div className='m-5 pt-5'>
        <Link to={'/gardener'}   
            className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-[#65963e] border-2 border-[#65963e] rounded-full hover:text-white group hover:bg-gray-50">
            <span className="absolute left-0 block w-full h-0 transition-all bg-[#65963e] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
            <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                 xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </span>
            <span className="relative">Let's Explore more Gardeners</span>
        </Link>
      </div>
    </div>
  );
 
 };
 
 export default ActGardener;

 