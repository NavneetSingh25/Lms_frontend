import { useDispatch, useSelector } from "react-redux";
import HomeLayout from "../../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function Profile(){
    const dispatch=useDispatch();
    const {data}=useSelector((state)=>state.auth);
    return(
        <HomeLayout>
            <div className="min-h-[90vh] flex  items-center justify-center">
                <div className="my-10 flex flex-col rounded-lg p-4 text-white w-96 shadow-[0_0_10px_black]">
                    <img src={data?.avatar?.secure_url} alt="profile" className="w-40 m-auto rounded-full border border-black" />
                    <h3 className="text-xl font-semibold text-center capitalize">
                        {data?.name}
                    </h3>
                    
                    
                        <div className="grid grid-cols-2 gap-4 mt-2">
                            <p className="font-semibold text-yellow-500">Joined On: </p><p>{new Date(data?.createdAt).toLocaleDateString()}</p>
                            
                            <p className="font-semibold text-yellow-500">Email:</p><p className="text-center text-gray-300">{data?.email}</p>
                            
                            <p className="font-semibold text-yellow-500">Role: </p><p>{data?.role}</p>
                            
                            <p className="font-semibold text-yellow-500">Subscription Status: </p><p>{data?.subscription?.status==="active"?"Active":"Inactive"}</p>

                        </div>
                        
                        <div className="flex items-center justify-between gap-2 mt-4 ">
                            <Link to="/changepassword" className="w-50 px-4 py-2 bg-blue-600 text-white rounded-lg text-center hover:bg-blue-500 transition">
                                Change Password
                            </Link>
                            <Link to="/user/editprofile" className="w-50 px-4 py-2 bg-green-600 text-white rounded-lg text-center hover:bg-green-500 transition">
                                Update Profile
                            </Link>
                        </div>
                        {data?.subscription?.status==="ACTIVE" && (
                            <div className="mt-6 text-center">
                                <Link to="/unsubscribe" className="px-4 py-2  bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"> Unsubscribe </Link>
                            </div>
                        )}
                        {data?.subscription?.status!=="ACTIVE" && (
                            <div className="mt-6 text-center">
                                <Link to="/subscribe" className="px-4 py-2  bg-yellow-500 text-black rounded-lg hover:bg-yellow-400 transition"> Subscribe Now </Link>
                            </div>
                        )}
                </div>

            </div>
        </HomeLayout>
    );
}
export default Profile;