import Image from "next/image";
import Link from "next/link";
import React from "react";

const Hero = () => {
	return (
		<section id="hero" className="dark:pg-darkColor lg:my-62 my-32 py-32">
			<div className="grid max-w-screen-xl  mx-auto lg:gap-8 xl:gap-0  lg:grid-cols-12 px-4">
				<div className="mr-auto place-self-center lg:col-span-7">
					<h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl ">
						Hi there, <br />I am <span className="text-green-800">Tam</span>
					</h1>
					<div className=" max-w-2xl my-6 font-light lg:mb-8 md:text-lg lg:text-xl  text-lg text-slate-600 dark:text-slate-400 ">
						I am a Civil Engineering graduate who has embraced a career transition towards coding due to my
						strong passion for programming and technology. I am dedicated to immersing myself in learning
						all aspects of technology within the construction industry. My goal is to create innovative
						products that provide substantial benefits to the AEC (Architecture, Engineering, and
						Construction) industry.
					</div>
					<Link
						href="#"
						className="bg-green-600 text-white inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-center  rounded-lg  hover:bg-green-800 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900 dark:hover:bg-gray-700"
					>
						My services
						<svg
							className="w-5 h-5 ml-2 -mr-1"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clipRule="evenodd"
							></path>
						</svg>
					</Link>

					<Link
						href="#"
						className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center dark:hover:bg-gray-700  border-black rounded-lg focus:ring-4 focus:ring-gray-100 hover:bg-gray-200 "
					>
						Contact me
					</Link>
				</div>
				<div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
					{/* <Image src="/heroSection.svg" alt="mockup" width="500" height="500" className="w-auto h-auto" /> */}
				</div>
			</div>
		</section>
	);
};

export default Hero;
