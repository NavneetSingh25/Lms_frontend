import { useState } from "react";
import HomeLayout from "../Layouts/HomeLayout";
import { toast } from "react-hot-toast";
import axiosInstance from "../Helpers/axiosInstance";

function Contact(){
    const [userInput,setUserInput]=useState({
        name:"",
        email:"",
        message:""
    });

    function handleUserInput(e){
        const {name,value}=e.target;
        setUserInput((prevState)=>({
            ...prevState,
            [name]:value
        }))
    }

async function handleFormSubmit(e){
        e.preventDefault();
        if(!userInput.name || !userInput.email || !userInput.message){
            toast.error("Please fill all the fields");
            return;
        }
        
        try{
            const response=axiosInstance.post("/contact",userInput);
            toast.promise(response,{
                pending:"Sending message",
                success:"Message sent successfully",
                error:"Failed to send message"
            });
            await response;
            setUserInput({
                name:"",
                email:"",
                message:""
            });
        }catch(err){
            toast.error(err?.response?.data?.message || err.message || "Failed to send message");
        }
    }

    return(
        <HomeLayout>
            <div className='flex justify-center items-center h-[100vh]'>
                <form onSubmit={handleFormSubmit} className="flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white w-[22rem] shadow-[0_0_10px_black]">
                <h1 className="text-3xl font-semibold">
                    Contact Form
                </h1>
                <div className="flex flex-col w-full gap-4 mt-4">
                    <label htmlFor="name" className='text-xl font-semibold'>
                        Name
                    </label>
                    <input type="text" className='bg-transparent px-2 py-1 border rounded-sm'
                        id="name"
                        placeholder="Enter your name"
                        name="name"
                        onChange={handleUserInput}
                        value={userInput.name}
                    />
                </div>
                <div className="flex flex-col w-full gap-4 mt-4">
                    <label htmlFor="email" className='text-xl font-semibold'>
                        Email
                    </label>
                    <input type="email" className='bg-transparent px-2 py-1 border rounded-sm'
                        id="email"
                        placeholder="Enter your email"
                        name="email"
                        onChange={handleUserInput}
                        value={userInput.email}
                    />
                </div>
                <div className="flex flex-col w-full gap-4 mt-4">
                    <label htmlFor="message" className='text-xl font-semibold'>
                        Message
                    </label>
                    <textarea type="message" className='bg-transparent px-2 py-1 border rounded-sm h-40 resize-none'
                        id="message"
                        placeholder="Enter the message"
                        name="message"
                        onChange={handleUserInput}
                        value={userInput.message}
                    />
                </div>
                <button  className="w-full bg-yellow-600 hover:bg-yellow-500 transition-all ease-in-out duration-300 rounded-sm font-semibold cursor-pointer p-2">
                    Submit
                </button>
            </form>
            </div>
        </HomeLayout>
    )
}

export default Contact;