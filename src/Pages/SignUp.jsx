import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {toast} from "react-hot-toast";
import { createaccount } from "../Redux/Slices/AuthSlice";

function SignUp(){
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [previewImage, setPreviewImage] = useState("");

    const [signUpData, setSignUpData] = useState({
        Name:"",
        email:"",
        password:"",
        avatar:""
    });

    function handleUserInput(e){
        const {name,value}=e.target;
        setSignUpData({
            ...signUpData,
            [name]:value
        })
    }

    function getImage(event){
        event.preventDefault();
        const uploadedImage=event.target.files[0];
        setSignUpData({
            ...signUpData,
            avatar:uploadedImage
        });
        const fileReader=new FileReader();
        fileReader.readAsDataURL(uploadedImage);
        fileReader.onload=()=>{
            setPreviewImage(fileReader.result);
        }
    }

    async function createAccount(e){
        e.preventDefault();
        if(!signUpData.Name || !signUpData.email || !signUpData.password || !signUpData.avatar){
            toast.error("All fields are required");
            return;
        }
        if(signUpData.Name.length<5){
            toast.error("Name must be at least 5 characters long");
            return;
        }
        if(signUpData.password.length<8){
            toast.error("Password must be at least 8 characters long");
            return;
        }
        if(!signUpData.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)){
            toast.error("Invalid email address");
            return;
        }
        
        
        const formData=new FormData();
        formData.append("Name", signUpData.Name);
        formData.append("email", signUpData.email);
        formData.append("password", signUpData.password);
        formData.append("avatar", signUpData.avatar);

        const response=await dispatch(createaccount(formData));
        if(response?.payload?.success){
            navigate("/");
        }

        setSignUpData({
            Name:"",
            email:"",
            password:"",
            avatar:""
        });
        setPreviewImage("");
        toast.success("Account created successfully");
    }

    return(
        <HomeLayout>
            <div className="flex justify-center items-center mt-0 mb-10 overflow-y-hidden ">
                <form className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 text-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),_0_2px_4px_-1px_rgba(0,0,0,0.06)] bg-gray-800">
                    <h1 className="text-center text-2xl font-bold"> Registration Page </h1>

                    <label htmlFor="image_upload" className="cursor-pointer">
                        {previewImage ? (
                            <img src={previewImage} alt="Preview" className="w-32 h-32 object-cover rounded-full mx-auto"/>
                        ) : (
                        <BsPersonCircle className="w-24 h-24 rounded-full m-auto"/>
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        type="file" 
                        id="image_upload"
                        accept=".jpg, .jpeg, .png,.svg"
                        className="hidden"
                        name="image_upload"
                        />

                        <div className="flex flex-col gap-1">
                            <label htmlFor="Name" className="font-semibold">Name</label>
                            <input type="text" name="Name" id="Name" required placeholder="Enter your name..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signUpData.Name} />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email" className="font-semibold">Email</label>
                            <input type="email" name="email" id="email" required placeholder="Enter your email..." className="bg-transparent px-2 py-1 border" onChange={handleUserInput} value={signUpData.email} />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="password" className="font-semibold">Password</label>
                            <input type="password" name="password" id="password" required placeholder="Enter your password..." className="bg-transparent px-2 py-1 border"  onChange={handleUserInput} value={signUpData.password}/>
                        </div>

                        <button type="submit" onClick={createAccount} className=" bg-yellow-600 mt-2 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm py-1 font-semibold text-lg cursor-pointer  ">
                            Create Account
                        </button>

                        <p className="text-center">Already have an acoount? <Link to="/login" className="text-blue-500 underline">Login</Link></p>
                </form>
            </div>



        </HomeLayout>
    )
}

export default SignUp;