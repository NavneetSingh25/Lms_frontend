import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CourseDescription() {
  const { state } = useLocation();
  const { role, data } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(state);
  }, [state]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-16 px-6 md:px-20 flex items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl">
          {/* Left Section: Image and Metadata */}
          <div className="space-y-6">
            <img
              src={state?.thumbnail?.secure_url}
              alt="Course Thumbnail"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <div className="space-y-4 text-lg text-white">
              <p>
                <span className="text-yellow-500 font-semibold">Total Lectures: </span>
                {state?.NumberofLectures}
              </p>
              <p>
                <span className="text-yellow-500 font-semibold">Created By: </span>
                {state?.createdBy}
              </p>

              {role === "ADMIN" || data?.subscription?.status === "active" ? (
                // navigate to URL that contains course id so DisplayLectures can work on refresh
                <button
                  onClick={() => navigate(`/course/${state?._id}/displaylectures`, { state })}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition"
                >
                  Watch Lectures
                </button>
              ) : (
                <button onClick={() => navigate('/checkout')} className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition">
                  Subscribe to Watch Lectures
                </button>
              )}
            </div>
          </div>

          {/* Right Section: Title and Description */}
          <div className="space-y-6 text-white">
            <h1 className="text-3xl font-bold text-yellow-500 text-center md:text-left">
              {state?.title}
            </h1>
            <div>
              <p className="text-yellow-500 font-semibold mb-2">Course Description:</p>
              <p className="text-gray-200 leading-relaxed">{state?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  );
}

export default CourseDescription;