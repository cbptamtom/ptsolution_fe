import Header from "@/app/(OpenbimComponent)/layout/header";
import Sidebar from "@/app/(OpenbimComponent)/layout/sidebar";
import Viewer from "@/app/(OpenbimComponent)/layout/viewer";
import React from "react";

const Services = () => {
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex flex-1 mt-[heightOfHeader]">
				<Sidebar />
				<Viewer />
			</div>
		</div>
	);
};

export default Services;
