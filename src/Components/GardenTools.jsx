import React, { useState, useEffect } from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { FaTimes,  FaLeaf, FaTint, FaCut } from 'react-icons/fa';
 
const GardenTools = () => {
  const [tools, setTools] = useState([]);
  const [selectTool, setselectTool] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/GardenTools.json")
      .then((res) => res.json())
      .then(data => {
        setTools(data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const openModal = (tool) => {
    setselectTool(tool);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Cutting Tools': return <FaCut className="mr-1" />;
      case 'Watering Tools': return <FaTint className="mr-1" />;
      default: return <FaLeaf className="mr-1" />;
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading tools...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold text-center mb-8">Essential Gardening Tools</h1>

      {tools.length === 0 ? (
        <div className="text-center py-8">No tools available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              openModal={openModal}
              getCategoryIcon={getCategoryIcon}
            />
          ))}
        </div>
      )}

      <ToolModal
        isOpen={isModalOpen}
        onClose={closeModal}
        tool={selectTool}
        getCategoryIcon={getCategoryIcon}
      />
    </div>
  );
};

// ToolCard  
const ToolCard = ({ tool, openModal, getCategoryIcon }) => (
  <div
    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer border border-[#65963e]"
    onClick={() => openModal(tool)}
  >
    <div className="relative h-48 bg-gray-100 overflow-hidden">
      <img
        src={tool.image}
        alt={tool.name}
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300x200?text=Tool+Image";
        }}
      />
      
    </div>

    <div className="p-4">
      <h3 className="text-xl font-semibold text-[#65963e] mb-1">{tool.name}</h3>
      <div className="flex items-center text-sm text-[#489b04] mb-2">
        {getCategoryIcon(tool.category)}
        <span>{tool.category}</span>
      </div>
      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{tool.description}</p>
      <div className="flex justify-between items-center">
        <span className={`text-xs px-2 py-1 rounded-full ${
          tool.difficulty === 'Easy' ? 'bg-[#d4e2c8] text-[#65963e]' :
          tool.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {tool.difficulty}
        </span>
        <button
          className="text-[#65963e] "
          onClick={(e) => {
            e.stopPropagation();
            openModal(tool);
          }}
        >
         <BiCommentDetail/>
        </button>
      </div>
    </div>
  </div>
);

// ToolModal  
const ToolModal = ({ isOpen, onClose, tool, getCategoryIcon }) => {
  if (!isOpen || !tool) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[rgb(245,248,242)] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 hover:bg-gray-300 transition-colors z-10"
          >
            <FaTimes className="text-gray-700" />
          </button>

          <div className="h-72  bg-gray-100 overflow-hidden">
            <img
              src={tool.image}
              alt={tool.name}
              className="w-full h-full "
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=Tool+Image";
              }}
            />
          </div>

          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-[#65963e]">{tool.name}</h3>
                <div className="flex items-center font-semibold text-[#489b04] mt-1">
                  {getCategoryIcon(tool.category)}
                  <span className="text-sm">{tool.category}</span>
                </div>
              </div>
              
            </div>

            <p className="text-gray-700 mb-6">{tool.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-lg font-semibold mb-3 text-[#65963e] border-b pb-2">Features</h4>
                <ul className="space-y-2">
                  {tool.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#65963e] rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-3 text-[#65963e] border-b pb-2">Best For</h4>
                <ul className="space-y-2">
                  {tool.bestFor.map((use, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-[#65963e] rounded-full mt-2 mr-2"></span>
                      <span className="text-gray-700">{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4 border-t border-gray-200">
              <span className={`px-3 py-1 text-sm rounded-full ${
                tool.difficulty === 'Easy' ? 'bg-[#c3e6a6] text-[#65963e]' :
                tool.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-blue-100 text-blue-800'
              }`}>
                {tool.difficulty} to use
              </span>

              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GardenTools;
