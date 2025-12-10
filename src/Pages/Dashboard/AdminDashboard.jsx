    import { useEffect } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import HomeLayout from "../../Layouts/HomeLayout";
    import { getAllCourses, deleteCourse } from "../../Redux/Slices/CourseSlice";
    import { getStatsData } from "../../Redux/Slices/StatSlice";
    import { getPaymentRecord } from "../../Redux/Slices/RajorPaySlice";
    import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
    import { FaUsers } from "react-icons/fa";
    import { FcSalesPerformance } from "react-icons/fc";
    import { GiMoneyStack } from "react-icons/gi";

    import { Bar, Pie } from "react-chartjs-2";
    import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    } from "chart.js";

    ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
    );

    function AdminDashboard() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        allUsersCount = 0,
        subscribedCount = 0,
        totalAdmins = 0,
        totalCourses = 0,
        monthlySalesRecord = [],
        loading: statsLoading,
        error: statsError,
    } = useSelector((state) => state.stats);

    const { allPayments = [], monthlySalesRecord: paymentSalesRecord = [] } = useSelector(
        (state) => state.rajorpay
    );
    const { role, isLoggedIn } = useSelector((state) => state.auth);
    const myCourses = useSelector((state) => state.course.courseData) || [];

    useEffect(() => {
        (async () => {
        await dispatch(getAllCourses());
        if (isLoggedIn && role && role.toUpperCase() === "ADMIN") {
            await dispatch(getStatsData());
            await dispatch(getPaymentRecord());
        } else {
            navigate("/");
        }
        })();
    }, [dispatch, isLoggedIn, role, navigate]);

    async function onCourseDelete(id) {
        if (window.confirm("Are you sure you want to delete the course?")) {
        const res = await dispatch(deleteCourse(id));
        if (res?.payload?.success) {
            await dispatch(getAllCourses());
        }
        }
    }

    const userData = {
        labels: ["Registered Users", "Enrolled Users"],
        datasets: [
        {
            label: "User Details",
            data: [allUsersCount, subscribedCount],
            backgroundColor: ["#facc15", "#22c55e"],
            borderWidth: 1,
            borderColor: ["#facc15", "#22c55e"],
        },
        ],
    };

    const salesData = {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        datasets: [
        {
            label: "Signups per Month",
            data:
            monthlySalesRecord && monthlySalesRecord.length === 12
                ? monthlySalesRecord
                : Array(12).fill(0),
            backgroundColor: ["rgb(255, 99, 132)"],
            borderWidth: 2,
        },
        ],
    };

    return (
        <HomeLayout>
        <div className="min-h-[90vh] pt-5 flex flex-col flex-wrap gap-10 text-white">
            <h1 className="text-center text-5xl font-semibold text-yellow-500">Admin Dashboard</h1>

            {statsError && (
            <div className="mx-10 p-4 bg-red-900 border border-red-700 rounded text-red-200">
                Failed to load stats: {String(statsError)}
            </div>
            )}

            <div className="grid grid-cols-2 gap-5 m-auto mx-10">
            {/* User Stats Card */}
            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md bg-zinc-800">
                <div className="w-80 h-80">
                <Pie data={userData} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-zinc-700">
                    <div className="flex flex-col items-center">
                    <p className="font-semibold">Registered Users</p>
                    <h3 className="text-4xl font-bold">{allUsersCount}</h3>
                    </div>
                    <FaUsers className="text-yellow-500 text-5xl" />
                </div>
                <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-zinc-700">
                    <div className="flex flex-col items-center">
                    <p className="font-semibold">Subscribed Users</p>
                    <h3 className="text-4xl font-bold">{subscribedCount}</h3>
                    </div>
                    <FaUsers className="text-green-500 text-5xl" />
                </div>
                </div>
            </div>

            {/* Sales & Payments Card */}
            <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md bg-zinc-800">
                <div className="h-80 w-full relative">
                <Bar className="absolute bottom-0 h-80 w-full" data={salesData} />
                </div>
                <div className="grid grid-cols-2 gap-5">
                <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-zinc-700">
                    <div className="flex flex-col items-center">
                    <p className="font-semibold">Subscription Count</p>
                    <h3 className="text-4xl font-bold">
                        {Array.isArray(allPayments) ? allPayments.length : 0}
                    </h3>
                    </div>
                    <FcSalesPerformance className="text-yellow-500 text-5xl" />
                </div>
                <div className="flex items-center justify-between p-5 gap-5 rounded-md shadow-md bg-zinc-700">
                    <div className="flex flex-col items-center">
                    <p className="font-semibold">Total Admins</p>
                    <h3 className="text-4xl font-bold">{totalAdmins}</h3>
                    </div>
                    <GiMoneyStack className="text-green-500 text-5xl" />
                </div>
                </div>
            </div>
            </div>

            {/* Courses Section */}
            <div className="mx-[10%] w-[80%] self-center flex flex-col items-center justify-center gap-10 mb-10">
            <div className="flex w-full items-center justify-between">
                <h1 className="text-center text-3xl font-semibold">Courses Overview</h1>
                <button
                onClick={() => navigate("/course/create")}
                className="w-fit bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 rounded py-2 px-4 font-semibold text-lg cursor-pointer"
                >
                Create New Course
                </button>
            </div>

            <table className="table overflow-x-scroll w-full">
                <thead>
                <tr>
                    <th>S No</th>
                    <th>Course Title</th>
                    <th>Category</th>
                    <th>Instructor</th>
                    <th>Lectures</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {myCourses && myCourses.length > 0 ? (
                    myCourses.map((course, idx) => (
                    <tr key={course._id}>
                        <td>{idx + 1}</td>
                        <td>
                        <textarea
                            readOnly
                            value={course?.title || ""}
                            className="w-40 h-auto bg-transparent resize-none"
                        />
                        </td>
                        <td>{course?.category || "N/A"}</td>
                        <td>{course?.createdBy || "N/A"}</td>
                        <td>{course?.NumberofLectures || 0}</td>
                        <td className="max-w-28 overflow-hidden text-ellipsis whitespace-nowrap">
                        <textarea
                            value={course?.description || ""}
                            readOnly
                            className="w-80 h-auto bg-transparent resize-none"
                        />
                        </td>
                        <td className="flex items-center gap-4">
                        <button
                            className="bg-green-500 hover:bg-green-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                            onClick={() =>
                            navigate(`/course/${course._id}/displaylectures`, {
                                state: { ...course },
                            })
                            }
                        >
                            <BsCollectionPlayFill />
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-600 transition-all ease-in-out duration-300 text-xl py-2 px-4 rounded-md font-bold"
                            onClick={() => onCourseDelete(course?._id)}
                        >
                            <BsTrash />
                        </button>
                        </td>
                    </tr>
                    ))
                ) : (
                    <tr>
                    <td colSpan="7" className="text-center text-zinc-400">
                        No courses found
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </HomeLayout>
    );
    }

    export default AdminDashboard;