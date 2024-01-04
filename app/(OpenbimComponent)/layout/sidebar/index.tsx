// components/Sidebar.tsx
import React from "react";
import Link from "next/link";

const Sidebar = () => {
	return (
		<aside
			id="logo-sidebar"
			className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
			aria-label="Sidebar"
		>
			<div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
				<ul className="space-y-2 font-medium">
					{/* Sidebar Item: Dashboard */}
					<li>
						<Link href="#">
							<div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
								{/* Dashboard Icon */}
								<span className="ms-3">Dashboard</span>
							</div>
						</Link>
					</li>

					

					{/* More Sidebar Items... */}
				</ul>
			</div>
		</aside>
	);
};

export default Sidebar;
