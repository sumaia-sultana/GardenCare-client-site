
import { AiOutlineLike } from 'react-icons/ai';
import { Link, useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
  
const MyTips = () => {
  const tips = useLoaderData(); 
   
  const handleDeleteTip = (_id) => {
       console.log(_id);
         Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
         
        fetch(`http://localhost:3000/userstip/${_id}`, {
          method: 'DELETE',
           headers: {
            'Content-Type': 'application/json',
            
          }
        })
        .then(res => res.json())
        .then(data => {
          console.log('after delete', data);
          Swal.fire({
            title: "Deleted!",
            text: "Your tip has been deleted.",
            icon: "success"
          });
            
           
        })
        .catch(error => {
          console.error('Delete error:', error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete tip",
            icon: "error"
          });
        });
      }
    });
 }
return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl text-shadow-[#468910] text-shadow-md text-[#a1cf7b] font-bold mb-8">My Gardening Tips</h1>
    
    {tips.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl mb-4">You haven't shared any tips yet!</p>
        <a href="/sharetips" className="btn bg-[#65963e] text-white hover:bg-green-700">
            Share Your First Tip
        </a>
      </div>
  
    ) : (
        <div className="overflow-x-auto">
  <table className="min-w-full divide-y divide-gray-200">
    <thead className='' >
      <tr>
        <th className="w-12 text-left"> Image</th> {/* Image column */}
        <th className="text-center">Title</th>
        <th className="text-center">Category</th>
        <th className="text-center">Level</th>
        <th className="text-center">Status</th>
        <th className=" text-center">Actions</th>
      </tr>
    </thead>
    <tbody>
      {tips.map(tip => (
        <tr key={tip._id} className="border-b hover:bg-gray-50">
          <td>
            {tip.photo && (
              <img src={tip.photo} alt="" className="h-12 w-12 rounded" />
            )}
          </td>
          <td className="py-2 px-2">
            <div className="font-medium text-[#65963e] text-left">{tip.title}</div>
            <div className="text-sm text-gray-500 text-left">{tip.name}</div>
          </td>
          <td>{tip.category}</td>
          <td>
            <span className={`badge ${
              tip.Level === 'Easy' ? 'badge-success' :
              tip.Level === 'Medium' ? 'badge-warning' : 'badge-error'
            }`}>
              {tip.Level}
            </span>
          </td>
          <td>
            <span className={`badge ${
              tip.Availability === 'Public' ? 'badge-info' : 'badge-neutral'
            }`}>
              {tip.Availability}
            </span>
          </td>
             <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
            <Link to={`/update/${tip._id}`}
              
              className="text-[#65963e] text-center hover:text-[#3f542d]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </Link>
            <button 
              onClick={() => handleDeleteTip(tip._id)}
              className="text-red-400 text-center hover:text-red-900"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </td>
          
        </tr>
      ))}
    </tbody>
  </table>
</div>

       
      )}
    </div>
  );
};

export default MyTips;