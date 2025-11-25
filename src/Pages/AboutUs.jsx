import HomeLayout from "../Layouts/HomeLayout";
import apj from "../assets/apj.png"
import bill from "../assets/bill.png"
import steve from "../assets/steve.png"
import einstein from "../assets/einstein.png"
import CarouselSlide from "../Components/CarouselSlide";

function AboutUs(){

    const celebrities=[
        {
            name:"Apj Abdul Kalam",
            img:apj,
            description:"Dream is not that which you see while sleeping, it is something that does not let you sleep.",
            slideNumber:1
        },
        {
            name:"Steve Jobs",
            img:steve,
            description:"Don't let the noise of others' opinions drown out your own inner voice.",
            slideNumber:2
        },
        {
            name:"Bill Gates",
            img:bill,
            description:"It's fine to celebrate success, but it is more important to heed the lessons of failure",
            slideNumber:3
        },
        {
            name:"Albert EInstein",
            img:einstein,
            description:"Try not to become a man of success, but rather try to become a man of value.",
            slideNumber:4
        }
    ]

    return(
        <HomeLayout>
            <div className="pl-20 pt-5 flex flex-col text-white">
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

                <div className="carousel w-1/2  m-auto my-6 ">
                {celebrities && celebrities.map((celebrity)=>(
                    <CarouselSlide 
                        key={celebrity.slideNumber}
                        image={celebrity.img}
                        tile={celebrity.name}
                        description={celebrity.description}
                        slideNumber={celebrity.slideNumber}
                        totalSlides={celebrities.length}
                    />
                ))}
                </div>
            </div>
        </HomeLayout>
    )
}

export default AboutUs;