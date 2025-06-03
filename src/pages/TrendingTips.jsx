
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';


const TrendingTips = () => {

    const [trendingTips, setTrendingTips] = useState([]);

    useEffect(() => {
    fetch('https://assignment10-server-beryl.vercel.app/trendingtips')
    .then(res => res.json())
    .then(data => setTrendingTips(data));
}, []);


    return (
        <div>

     <div className="p-5">
  <h2 className="text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold text-center mb-3">🌼Top Trending Gardening Tips</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {trendingTips.map(tip => (
      <div key={tip._id} className="border border-[#65963e] p-3 rounded-lg bg-[#f6fbe9]">
        <h3 className="text-lg font-bold text-[#468910]">{tip.title}</h3>
        <p className="text-sm text-[#65963e]">Likes: {tip.likes || 0}</p>
        {tip.photo && <img src={tip.photo} alt={tip.title} className="w-full h-32 object-cover mt-2 rounded" />}
        <Link  to={`/userstip/${tip._id}`} className='text-[#65963e] underline'>view details</Link>
      </div>
    ))}
  </div>
</div>

            
        </div>
    );
};

export default TrendingTips;