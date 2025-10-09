import { useNavigate } from "react-router-dom";

function NotFound(){
    const navigate=useNavigate();
    return(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-yellow-500"> 
        <h1 className="text-6xl font-extrabold tracking-widest mb-4">404</h1>
        <h2 className="text-2xl mb-8 bg-black rotate-12 text-white rounded">Page Not Found</h2>
        <p className="text-lg mb-4">Sorry, the page you are looking for does not exist.</p>
        <button className="mt-5">
            <a className="relative inline-block text-sm font-md text-[#FF6A3D] group active:text-yellow-500 focus:outline-none focus-ring"></a>
            <span onClick={()=>navigate(-1)} className="relative inset-0 border block px-8 py-3 border-current rounded-lg">
                Go Back
            </span>
        </button>
        </div>
    )
}

export default NotFound;