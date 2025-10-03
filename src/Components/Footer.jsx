import { BsFacebook,BsInstagram,BsLinkedin,BsTwitter } from "react-icons/bs";

function Footer(){

    const currentYear = new Date().getFullYear();

    return(
        <>
            <footer className="position-relative left-0 bottom-0 py-4 h-[10vh] flex flex-col sm:flex-row sm:px-20 justify-between items-center text-white bg-gray-800 p-4">
                <section className="text-lg">
                    &copy; {currentYear} . All rights reserved.
                </section>
                <section className="flex gap-4 text-2xl mt-2 sm:mt-0">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:bg-yellow-500 transition-all ease-in-out duration-300"><BsFacebook /></a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:bg-yellow-500 transition-all ease-in-out duration-300"><BsInstagram /></a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:bg-yellow-500 transition-all ease-in-out duration-300"><BsLinkedin /></a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:bg-yellow-500 transition-all ease-in-out duration-300"><BsTwitter /></a>
                </section>
            </footer>
        </>
    )
}

export default Footer;