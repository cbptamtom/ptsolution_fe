"use client";
import openComponent from "@/app/OpenComponentService";
import React, { useRef, useEffect, useState } from "react";

const Viewer = () => {
	const containerRef = useRef(null);
	const [hasOpenComponentCalled, setHasOpenComponentCalled] = useState(false);

	useEffect(() => {
		if (!hasOpenComponentCalled) {
			openComponent(containerRef);
			setHasOpenComponentCalled(true);
		}
	}, [hasOpenComponentCalled]);
	return <div className="flex-1 ml-64 mt-[65px] w-auto bg-slate-950" id="container" ref={containerRef}></div>;
};

export default Viewer;
