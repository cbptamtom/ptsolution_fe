"use client";

import { ModeToggle } from "@/app/components/Theme-toggle";
import ThemeToggler from "@/app/components/Theme-toggle2";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
const menuItems = [
	{ id: 4, href: "#blog", text: "Blog" },
	{ id: 3, href: "#services", text: "Services" },
	{ id: 2, href: "#about-me", text: "About me" },
];

const Header = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const toggleMobileMenu = () => {
		setMobileMenuOpen(!mobileMenuOpen);
	};
	return (
		<header>
			<nav className="px-4 lg:px-6 py-2.5">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
					<Link href="/" className="flex items-center">
						<Image src="/myLogo.svg" alt="logo" width={46} height={46} className="flex items-center" />
						<span
							className="hidden lg:flex pl-5 self-center text-xl font-semibold whitespace-nowrap "
							style={{ lineHeight: "0.8" }}
						>
							<div>
								<div className="text-green-800 dark:text-white text-2xl font-normal uppercase tracking-widest ">
									tc solution
								</div>
								<div className="text-green-800 dark:text-white text-xl font-normal">
									digitally today
								</div>
							</div>
						</span>
					</Link>

					<div className="flex items-center lg:order-2">
						<div className="pr-5">
							<ModeToggle />
							{/* <ThemeToggler /> */}
						</div>
						<Link
							href="#"
							className="focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
						>
							Log in
						</Link>

						<Link
							href="#"
							className="bg-green-600 focus:ring-4 text-white focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800 hover:bg-green-800"
						>
							Get started
						</Link>
						<button
							data-collapse-toggle="mobile-menu-2"
							type="button"
							className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
							aria-controls="mobile-menu-2"
							aria-expanded="false"
							onClick={toggleMobileMenu}
						>
							<span className="sr-only">Open main menu</span>
							<svg
								className="w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
									clipRule="evenodd"
								></path>
							</svg>
							<svg
								className="hidden w-6 h-6"
								fill="currentColor"
								viewBox="0 0 20 20"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									fillRule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clipRule="evenodd"
								></path>
							</svg>
						</button>
					</div>
					<div
						className={`${
							mobileMenuOpen ? "block" : "hidden"
						} justify-between items-center w-full lg:flex lg:w-auto lg:order-1`}
						id="mobile-menu-2"
					>
						<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
							{menuItems.map((item) => (
								<li key={item.id}>
									<Link
										href={item.href}
										className="block py-2 px-3 text-black hover:text-green-600  rounded md:bg-transparent  md:p-0 dark:text-white md:dark:text-white md:dark:hover:text-green-600"
									>
										{item.text}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
};

export default Header;
