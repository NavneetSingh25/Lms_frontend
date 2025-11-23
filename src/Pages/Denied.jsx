import { useNavigate } from "react-router-dom";

function Denied(){
    const navigate=useNavigate();
    return(
        <main className="h-screen w-full flex flex-col justify-center items-center bg-gray-900">
            <h1 className="text-9xl font-bold text-white ">
                403
            </h1>
            <p className="text-2xl text-white mt-4">
                Access Denied
            </p>
            <button onClick={()=>navigate(-1)} className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-500 transition">
                Go Back
            </button>
        </main>

    )
}

export default Denied;