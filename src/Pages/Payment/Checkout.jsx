import { useState } from "react";
import { BiRupee } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../Layouts/HomeLayout";

function Checkout() {
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [duration, setDuration] = useState("1 Year");
  const [amount, setAmount] = useState(499);

  function handleBuyNow(e) {
    e.preventDefault();
    setShowModal(true); // ✅ open modal
  }

  function handleConfirm() {
    // ✅ For demo, just redirect to success
    alert(`Subscribed for ${duration} at ₹${amount}`);
    setShowModal(false);
    navigate("/checkout/success");
    dispatch(verifyUserPayment({
  razorpay_payment_id,
  razorpay_subscription_id,
  razorpay_signature
}));
  }

  return (
    <HomeLayout>
      <form
        onSubmit={handleBuyNow}
        className="min-h-[90vh] flex items-center justify-center text-white"
      >
        <div className="w-80 h-[26rem] flex flex-col justify-center shadow-[0_0_10px_black] rounded-lg relative">
          <h1 className="bg-yellow-500 absolute top-0 w-full text-center py-4 text-2xl font-bold rounded-tl-lg rounded-tr-lg">
            Subscription Bundle
          </h1>
          <div className="px-4 space-y-5 text-center">
            <p className="text-[17px]">
              This purchase will allow you to access all available courses of our platform for{" "}
              <span className="text-yellow-500 font-bold">
                <br /> 1 Year duration
              </span>{" "}
              including all existing and newly launched courses.
            </p>

            <p className="flex items-center justify-center gap-1 text-2xl font-bold text-yellow-500">
              <BiRupee />
              <span>499</span> only
            </p>

            <div className="text-gray-200">
              <p>100% refund on cancellation</p>
              <p>* Terms and conditions applied *</p>
            </div>

            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-600 transition-all ease-in-out duration-300 absolute bottom-0 w-full left-0 text-xl font-bold rounded-bl-lg rounded-br-lg py-2"
            >
              Buy now
            </button>
          </div>
        </div>
      </form>

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Choose Subscription</h2>

            <label className="block mb-2">
              Duration:
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              >
                <option>1 Month</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </select>
            </label>

            <label className="block mb-4">
              Amount (₹):
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded p-2 mt-1"
              />
            </label>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default Checkout;