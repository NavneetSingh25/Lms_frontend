import HomeLayout from "../Layouts/HomeLayout";
import apj from "../assets/apj.png"
import bill from "../assets/bill.png"
import steve from "../assets/steve.png"
import einstein from "../assets/einstein.png"

function AboutUs(){
    return(
        <HomeLayout>
            <div className="pl-20 pt-15 flex flex-col text-white">
                <div className="flex items-center gap-5 mx-10">
                    <section className="w-1/2 space-y-10">
                    <h1 className="text-4xl font-bold text-yellow-500">
                        Affordable and Quality Education for All: Our Mission at LearnHub
                    </h1>
                    <p className="text-lg text-gray-200">
                        At LearnHub, we believe that education is a fundamental right and should be accessible to everyone, regardless of their background or location. Our mission is to provide high-quality online courses that empower individuals to achieve their personal and professional goals.
                    </p>
                    <p className="text-lg">
                        We are committed to creating a diverse and inclusive learning environment where students can thrive. Our courses are designed by industry experts and educators who are passionate about sharing their knowledge and expertise. 
                    </p>
                    
                    </section>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScoL3lROZceuLx5ywHQTzL4_1gOMhxWMPONw&s" id="test1" alt="aboutus" style={{filter:"drop-shadow(0px 10px 10px rgb(0,0,0));"}} className="w-1/2 rounded-lg drop-shadow-2xl"  />
                </div>

                <div className="carousel w-1/2  m-auto my-16 ">
                <div id="slide1" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 p-[16%]">
                        <img
                    src={apj}
                    className="w-40 rounded-full border-2 border-gray-400 " />

                    <p className="text-xl text-gray-200">{"Dream is not that which you see while sleeping, it is something that does not let you sleep."}
 </p>
                    <h3 className="text-2xl font-semi-bold">Apj Abdul Kalam</h3>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide4" className="btn btn-circle">❮</a>
                    <a href="#slide2" className="btn btn-circle">❯</a>
                    </div>
                    </div>
                </div>
                <div id="slide2" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 p-[16%]">
                        <img
                    src={steve}
                    className="w-40 rounded-full border-2 border-gray-400 " />
                    <p className="text-xl text-gray-200">{"Don't let the noise of others' opinions drown out your own inner voice."}
 </p>
                    <h3 className="text-2xl font-semi-bold">Steve Jobs</h3>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide1" className="btn btn-circle">❮</a>
                    <a href="#slide3" className="btn btn-circle">❯</a>
                    </div>
                    </div>
                </div>
                
                <div id="slide3" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 p-[16%]">
                        <img
                    src={bill}
                    className="w-40 rounded-full border-2 border-gray-400 " />
                    <p className="text-xl text-gray-200">{"It's fine to celebrate success, but it is more important to heed the lessons of failure"}
 </p>
                    <h3 className="text-2xl font-semi-bold">Bill Gates</h3>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide2" className="btn btn-circle">❮</a>
                    <a href="#slide4" className="btn btn-circle">❯</a>
                    </div>
                    </div>
                </div>
                <div id="slide4" className="carousel-item relative w-full">
                    <div className="flex flex-col items-center justify-center gap-4 p-[16%]">
                        <img
                    src={einstein}
                    className="w-40 rounded-full border-2 border-gray-400 " />
                    <p className="text-xl text-gray-200">{"Try not to become a man of success, but rather try to become a man of value."}
 </p>
                    <h3 className="text-2xl font-semi-bold">Albert EInstein</h3>
                    <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                    <a href="#slide3" className="btn btn-circle">❮</a>
                    <a href="#slide1" className="btn btn-circle">❯</a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;