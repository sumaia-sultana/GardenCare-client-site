import React, { useState, useEffect } from 'react';
import Loading from '../pages/Loading';

const Gardener = () => {
  const [allGardeners, setAllGardeners] = useState([]);
  const [displayGardeners, setDisplayGardeners] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Gardener.json")
      .then((res) => res.json())
      .then(data => {
        setAllGardeners(data);
        // showing only active gardeners firstly
        setDisplayGardeners(data.filter(g => g.status === "Active Gardener"));
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const toggleShowAll = () => {
    if (showAll) {
      // Showing only active gardeners
      setDisplayGardeners(allGardeners.filter(g => g.status === "Active Gardener"));
    } else {
      // Show all gardeners
      setDisplayGardeners(allGardeners);
    }
    setShowAll(!showAll);
  };

  if (loading) {
    return <div className="text-center py-8"><Loading/></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold text-center mb-8">Here's Our All Gardeners</h1>
      
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

          <div className="text-center mt-8">
            <button onClick={toggleShowAll}  className="relative   items-center justify-start inline-block px-5 py-3 overflow-hidden font-medium transition-all bg-[#4e6738] rounded-full hover:bg-white group">
    <span className="absolute inset-0 border-0 group-hover:border-[25px] ease-linear duration-100 transition-all border-white rounded-full"></span>
    <span className="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-[#65963e]"> 
        {showAll ? "Show Active Only" : "Show All Gardeners"}</span>
        </button>
            
          </div>
        </>
      )}
    </div>
  );
};

export default Gardener;
 

 