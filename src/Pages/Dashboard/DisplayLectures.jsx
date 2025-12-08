    import { useEffect, useState, useCallback } from "react";
    import { useDispatch, useSelector } from "react-redux";
    import { useLocation, useNavigate, useParams } from "react-router-dom";

    import HomeLayout from "../../Layouts/HomeLayout";
    import { getLectures, deleteLectures } from "../../Redux/Slices/LectureSlice";

    function Displaylectures() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state: locationState } = useLocation();
    const params = useParams(); // read :id from URL
    // prefer navigation state, fallback to URL param
    const courseId = locationState?._id || params?.id;

    // note: lecture reducer state shape is { lectures: [] }
    const { lectures } = useSelector((s) => s.lectures || { lectures: [] });
    const { role } = useSelector((s) => s.auth || {});

    const [currentVideo, setCurrentVideo] = useState(0);

    // fetch lectures when courseId is resolved
    useEffect(() => {
        if (!courseId) {
        // if no course id anywhere, redirect to courses list
        navigate("/courses");
        return;
        }
        dispatch(getLectures(courseId));
    }, [courseId, dispatch, navigate]);

    // delete handler
    const onLectureDelete = useCallback(
        async (courseIdParam, lectureId) => {
        if (!courseIdParam || !lectureId) return;
        try {
            await dispatch(deleteLectures({ courseId: courseIdParam, lectureId }));
            // reload lectures after deletion
            await dispatch(getLectures(courseIdParam));
            // if currently showing deleted lecture, reset index
            setCurrentVideo((idx) => Math.max(0, idx - 1));
        } catch (err) {
            // thunk already handles toast; optionally log
            console.error("Delete lecture failed:", err);
        }
        },
        [dispatch]
    );

    // Render
    return (
        <HomeLayout>
        <div className="flex flex-col gap-10 items-center justify-center min-h-[90vh] py-10 text-white mx-[5%]">
            <div className="text-center text-2xl font-semibold text-yellow-500">
            Course Name: {locationState?.title || "Course"}
            </div>

            {lectures && lectures.length > 0 ? (
            <div className="flex justify-center gap-10 w-full">
                {/* left section */}
                <div className="space-y-5 w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black]">
                <video
                    src={lectures?.[currentVideo]?.lecture?.secure_url}
                    className="object-fill rounded-tl-lg rounded-tr-lg w-full"
                    controls
                    disablePictureInPicture
                    muted
                    controlsList="nodownload"
                />
                <div>
                    <h1>
                    <span className="text-yellow-500"> Title: </span>
                    {lectures?.[currentVideo]?.title}
                    </h1>
                    <p>
                    <span className="text-yellow-500 line-clamp-4"> Description: </span>
                    {lectures?.[currentVideo]?.description}
                    </p>
                </div>
                </div>

                {/* right section */}
                <ul className="w-[28rem] p-2 rounded-lg shadow-[0_0_10px_black] space-y-4">
                <li className="font-semibold text-xl text-yellow-500 flex items-center justify-between">
                    <p>Lectures list</p>
                    {role === "ADMIN" && (
                    <button
                        onClick={() =>
                        navigate(`/course/${courseId}/addlecture`, { state: { ...(locationState || {}), _id: courseId } })
                        }
                        className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-purple-500 text-white "
                    >
                        Add new lecture
                    </button>
                    )}
                </li>

                {lectures.map((lecture, idx) => (
                    <li className="space-y-2" key={lecture._id}>
                    <p className="cursor-pointer" onClick={() => setCurrentVideo(idx)}>
                        <span className="text-blue-300"> Lecture {idx + 1} : </span>
                        {lecture?.title}
                    </p>
                    {role === "ADMIN" && (
                        <button
                        onClick={() => onLectureDelete(courseId, lecture._id)}
                        className="btn-accent px-2 py-1 rounded-md font-semibold text-sm bg-purple-500 text-white"
                        >
                        Delete lecture
                        </button>
                    )}
                    </li>
                ))}
                </ul>
            </div>
            ) : (
            role === "ADMIN" && (
                <button
                onClick={() =>
                    navigate(`/course/${courseId}/addlecture`, { state: { ...(locationState || {}), _id: courseId } })
                }
                className="btn-primary px-2 py-1 rounded-md font-semibold text-sm bg-purple-500 text-white"
                >
                Add new lecture
                </button>
            )
            )}
        </div>
        </HomeLayout>
    );
    }

    export default Displaylectures;