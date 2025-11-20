import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/course/description/${data?._id || ""}`)}
            className="w-[22rem] h-[430px] bg-gray-800 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 group"
        >
            <div className="overflow-hidden">
                <img
                    className="h-48 w-full object-cover rounded-tl-lg rounded-tr-lg group-hover:scale-105 transition-transform duration-300"
                    src={data?.thumbnail?.secure_url || "/placeholder.png"}
                    alt={data?.title || "course thumbnail"}
                />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-yellow-500 line-clamp-2">
                        {data?.title}
                    </h2>
                    <h2 className="line-clamp-2">
                        {data?.description}
                    </h2>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">
                            Total Lectures:
                        </span>
                        {data?.numberoflectures}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">
                            Instructor:
                        </span>
                        {data?.createdBy}
                    </p>
                </div>
            </div>
        </div>
    );
}
export default CourseCard;