import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomeLayout({ children }) {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const isLoggedIn=useSelector(state=>state?.auth?.isLoggedIn);
  const role=useSelector(state=>state?.auth?.role);

  function handleLogout(){
    e.preventDefault();
    //cosnt res=await dispatch(logout());
    //if(res?.payload.success)
    navigate("/");
  }

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div className="drawer fixed z-50">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Menu Button */}
          <label htmlFor="my-drawer" className="cursor-pointer m-4 block">
            <FiMenu className="text-white" size={32} />
          </label>
        </div>

        <div className="drawer-side">
          <label htmlFor="my-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-64 sm:w-80 bg-base-200 text-base-content">
            {/* Close Button */}
            <li className="absolute right-2 top-2">
              <label htmlFor="my-drawer" className="cursor-pointer mt-1">
                <AiFillCloseCircle size={24} />
              </label>
            </li>
            {/* Navigation Links */}
            <li><Link to="/">Home</Link></li>

            {isLoggedIn && role==="ADMIN" && <li><Link to="/admin/dashboard">Admin Dashboard</Link></li>}

            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>

            {!isLoggedIn && 
              <li className="absolut bottom-4 w-[90%] top-2">
              <div className="w-full flex justify-center items-center">
                <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold  px-5 py-3 mt-4 rounded-lg transition-all ease-in-out duration-300">
                  <Link to="/login">Login</Link>
                </button>
                <button className="bg-gradient-to-r from-purple-400 to-purple-600  text-white font-semibold  px-5 py-3 mt-4 rounded-lg transition-all ease-in-out duration-300">
                  <Link to="/signup">SignUp</Link>
                </button>
              </div>
              </li>
            }

            {isLoggedIn && 
              <li className="absolut bottom-4 w-[90%] top-2">
              <div className="w-full flex justify-center items-center">
                <button className="bg-gradient-to-r from-blue-400 to-blue-600 text-white font-semibold  px-5 py-3 mt-4 rounded-lg transition-all ease-in-out duration-300">
                  <Link to="/user/profile">Profile</Link>
                </button>
                <button className="bg-gradient-to-r from-purple-400 to-purple-600  text-white font-semibold  px-5 py-3 mt-4 rounded-lg transition-all ease-in-out duration-300">
                  <Link onClick={handleLogout}>Logout</Link>
                </button>
              </div>
              </li>
            }
            
          </ul>
        </div>
      </div>

      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export default HomeLayout;