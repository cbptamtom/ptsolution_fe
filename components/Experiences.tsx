import React from "react";
import TimeLine from "./TimeLine";
const timeLineData = [
	{
		date: "Dec, 2018",
		title: "Vinadeco Design Center - Revit Operator",
		description: "Create architectural models, structural models, construction models using ArchiCAD and Revit.",
	},
	{
		date: "Jan, 2020",
		title: "Vinadeco Design Center - Team Leader",
		description:
			"Managing a team to deliver projects with high quality and shortened deadlines. Using code to create products that optimize and reduce labor in repetitive, routine steps.",
	},
	{
		date: "Apr, 2022",
		title: "OpenBIM VietNam Team - Coder",
		description:
			"Co-Founder and Coder, dedicated to developing product-based website services for the AEC industry. Additionally, I engage in marketing campaigns to promote products, organize, and facilitate teaching sessions on Autodesk Platform Service (Forge) and IFCjs.",
	},
	{
		date: "Apr, 2022",
		title: "Aurecon VietNam - Digital Modeling",
		description:
			"Using Revit for structural design and build projects, resolving all work-related issues, and creating various supportive tools through coding during the workflow.",
	},
	{
		date: "Now",
		title: "Balancing My Career at Aurecon with My Love for Coding After Hours.",
		description: "Revit modeling, coding every day :D",
	},
];

const Experiences = () => {
	return (
		<div className="items-center mx-auto max-w-screen-xl px-4 pb-24 pt-12">
			<TimeLine items={timeLineData} />
		</div>
	);
};

export default Experiences;
