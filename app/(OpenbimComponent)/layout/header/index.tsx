"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import MainLogo from "@/app/images/mainLogo";
import { ModeToggle } from "@/app/components/Theme-toggle";

const Header = () => {
	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						{/* Button and logo part */}
						<Link href="/" className="flex items-center">
							<MainLogo height="40" />
							<span
								className="hidden lg:flex pl-5 self-center text-xl font-semibold whitespace-nowrap "
								style={{ lineHeight: "0.8" }}
							>
								<div>
									<div className="text-green-800 dark:text-white text-2xl font-normal uppercase tracking-widest ">
										tc solution - OpenBIM
									</div>
								</div>
							</span>
						</Link>
					</div>
					<div className="flex items-center">
						<div className="mr-10">
							<ModeToggle />
						</div>
						<div className="flex items-center ms-3">
							<button
								type="button"
								className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
								aria-expanded="false"
								data-dropdown-toggle="dropdown-user"
							>
								<span className="sr-only">Open user menu</span>
								<img
									className="w-8 h-8 rounded-full"
									src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
									alt="user photo"
								/>
							</button>
							{/* Dropdown menu content */}
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Header;
