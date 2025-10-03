import HomeLayout from "../Layouts/HomeLayout";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <HomeLayout>
      <div className="flex justify-center items-center px-6 py-10 text-white gap-10 h-[80vh]">
        <div className="w-full max-w-xl space-y-6 text-center sm:text-left">
          <h1 className="text-4xl font-bold">
            Welcome to <span className="text-yellow-500">LMS</span>
          </h1>
          <p className="text-lg">
            Your gateway to knowledge and learning. Explore our wide range of courses and start your educational journey today!
          </p>
          
            <Link to="/courses">
            <button className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-semibold  px-5 py-3 mt-4 rounded-lg transition-all ease-in-out duration-300">Exlpore Courses</button>
            </Link>

            <Link to="/contact">
            <button className="border border-yellow-500 hover:bg-yellow-600 text-white font-semibold ml-4  px-5 py-3 mt-4 rounded-lg transition-all ease-in-out duration-300">Contact Us</button>
            </Link>

        </div>
        <div className="flex items-center justify-center">
            <img src="https://img.freepik.com/free-vector/online-education-concept-illustration_114360-6261.jpg?w=740&t=st=1696118473~exp=1696119073~hmac=5b1a3e2f0a4f0e2e4f6c8e4f6c8e4f6c8e4f6c8e4f6c8e4f6c8e4f6c8e4f6c8e" alt="Learning" className="w-full max-w-lg rounded-lg shadow-lg" />
        </div>
      </div>
    </HomeLayout>
  );
}

export default HomePage;