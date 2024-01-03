"use client"
import openComponent from "@/app/service/opencomponent";
import React, { useRef, useEffect } from "react";

const Viewer = () => {
	const containerRef = useRef(null);

	useEffect(() => {
		// Code sử dụng containerRef.current ở đây
		const container = containerRef.current;
		if (container) {
	openComponent(containerRef);

			// Thực hiện các thao tác với container ở đây
			// Ví dụ:
			// container.style.backgroundColor = "red";
			// Hoặc bạn có thể thực hiện việc gán container cho renderer hoặc thêm các thành phần khác vào đó
		}
	}, []); // Chạy useEffect chỉ một lần khi component được render
	return (
		<div className="flex-1 ml-64 mt-[65px] h-screen w-auto bg-slate-950" id="container" ref={containerRef}>
		</div>
	);
};

export default Viewer;
