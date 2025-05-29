import React from 'react';
import { Link, useLoaderData } from 'react-router';

const TipsDetails = () => {
    const  {
         title, type, name,category, description,Level, Availability, photo} = useLoaderData();
        
    return (
        <div>
            <h1 className='pb-10 pt-10 text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold'>
               Breaking Down the Tips</h1>
            <div className='' >
               <div className="bg-white flex rounded-xl shadow-lg overflow-hidden">
                
                {/* Image Section */}
                <div className="w-1/3 overflow-hidden">
                    <img 
                        src={photo || 'https://via.placeholder.com/800x400?text=Tip+Image'} 
                        alt={title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/800x400?text=Image+Not+Available';
                        }}
                    />
                </div>
                
                {/* Content Section */}
                <div className="p-6 w-2/3">
                     
                    <div className="flex justify-between items-start mb-4">
                        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                            {category}
                        </span>
                    </div>
                    
                    {/* Tip Type and Level */}
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full text-sm">
                            Type: {type}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                            Level === 'Easy' ? 'bg-green-100 text-green-800' :
                            Level === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                        }`}>
                            Level: {Level}
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm ${
                            Availability === 'Public' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                        }`}>
                            {Availability}
                        </div>
                    </div>
                    
                    {/* Description */}
                    <div className="prose max-w-none mb-6">
                        <p className="text-gray-700 whitespace-pre-line">{description}</p>
                    </div>
                    
                    {/* Author Info */}
                    <div className="flex justify-between items-center border-t pt-4">
                        <div className='flex items-center pt-4'>
                             <div className="bg-green-500 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                            {name?.charAt(0) || 'U'}
                        </div>
                        <div>
                            <p className="font-medium text-gray-800">{name || 'Unknown Author'}</p>
                            <p className="text-sm text-gray-500">Gardener</p>
                        </div>
                        </div>
                       
                         <div>
                        <Link to={'/browsetips'}   
    className="relative inline-flex items-center px-12 py-3 overflow-hidden text-lg font-medium text-[#65963e] border-2 border-[#65963e] rounded-full hover:text-white group hover:bg-gray-50">
    <span className="absolute left-0 block w-full h-0 transition-all bg-[#65963e] opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
    <span className="absolute right-0 flex items-center justify-start w-10 h-10 duration-300 transform translate-x-full group-hover:translate-x-0 ease">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"
         xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
    </span>
    <span className="relative">Back To see more Tips</span>
</Link>
                    </div>
                    </div>
                   
                </div>
            </div>
            </div>
        </div>
    );
};

export default TipsDetails;