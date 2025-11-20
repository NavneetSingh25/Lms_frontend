import { useDispatch, useSelector } from "react-redux";
import { getAllCourses } from "../../Redux/Slices/CourseSlice";
import { useEffect } from "react";
import HomeLayout from "../../Layouts/HomeLayout";
import CourseCard from "../../Components/CourseCard";

function CourseList() {
    const dispatch = useDispatch();
    const courseData = useSelector((state) => state?.course?.courseData || []);

    async function loadCourses() {
        await dispatch(getAllCourses());
    }

    useEffect(() => {
        loadCourses();
    }, [dispatch]);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] pt-6 pl-20 flex flex-col  text-white">
                <h1 className="text-center font-semibold text-3xl mb-5">
                    Explore the Courses made by 
                    <span className="text-yellow-500 font-bold mx-2">
                        Industry Experts
                    </span>
                </h1>
                <div className="mb-10 flex flex-wrap gap-14">
                    {courseData?.map((course) => (
                        <CourseCard key={course._id} data={course} />
                    ))}
                </div>
            </div>
        </HomeLayout>
    )
}

export default CourseList;