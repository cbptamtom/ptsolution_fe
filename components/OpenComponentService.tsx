import { Header, Sidebar, Viewer } from "@/app/(OpenbimComponent)/layout";
import React from "react";

const OpenComponentService = () => {
	return (
		<div className="flex h-screen overflow-hidden">
			<Sidebar />

			<div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
				<Header />

				<main>
					<div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
						<Viewer />
					</div>
				</main>
			</div>
		</div>
	);
};

export default OpenComponentService;
