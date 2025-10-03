import { FiMenu } from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";

function HomeLayout({ children }) {
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
            <li><Link to="/courses">All Courses</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
      </div>

      <main className="pt-20">{children}</main>
      <Footer />
    </div>
  );
}

export default HomeLayout;