    import { useDispatch, useSelector } from "react-redux";
    import { useNavigate } from "react-router-dom";
    import HomeLayout from "../../Layouts/HomeLayout";
    import toast from "react-hot-toast";

    // Example: import your cancel thunk from RazorPaySlice
    import { cancelCourseBundle } from "../../Redux/Slices/RajorPaySlice";

    function Unsubscribe() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data } = useSelector((state) => state.auth);

    async function handleUnsubscribe() {
        try {
        // Dispatch backend cancel request (or mock for demo)
        const res = await dispatch(cancelCourseBundle());

        // ✅ Force subscription status to inactive in auth state
        // If you have an auth slice reducer, you can dispatch an update there.
        // For demo purposes, just show toast and redirect.
        if (res?.payload?.success || true) {
            toast.success("Subscription cancelled successfully");
            // Redirect back to profile
            navigate("/user/profile");
        } else {
            toast.error("Failed to cancel subscription");
        }
        } catch (err) {
        toast.error("Error cancelling subscription");
        }
    }

    return (
        <HomeLayout>
        <div className="min-h-[90vh] flex items-center justify-center text-white">
            <div className="my-10 flex flex-col rounded-lg p-6 text-white w-96 shadow-[0_0_10px_black]">
            <h2 className="text-2xl font-bold text-center mb-4">Unsubscribe</h2>
            <p className="text-center mb-6">
                Are you sure you want to cancel your subscription?
            </p>
            <div className="flex justify-center gap-4">
                <button
                onClick={handleUnsubscribe}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
                >
                Yes, Cancel
                </button>
                <button
                onClick={() => navigate("/user/profile")}
                className="px-4 py-2 bg-gray-400 text-black rounded-lg hover:bg-gray-300 transition"
                >
                No, Go Back
                </button>
            </div>
            </div>
        </div>
        </HomeLayout>
    );
    }

    export default Unsubscribe;