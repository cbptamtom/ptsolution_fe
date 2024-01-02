import React from "react";

type TimeLineItem = {
	date: string;
	title: string;
	description: string;
};

type TimeLineProps = {
	items: TimeLineItem[];
};

const TimeLine: React.FC<TimeLineProps> = ({ items }) => {
	return (
		<div className="-my-6">
			{items.map((item, index) => (
				<div key={index} className="relative pl-8 sm:pl-32 py-6 group">
					<div className="font-caveat font-medium text-2xl text-content-green-light dark:text-content-green-dark  mb-1 sm:mb-0">
						{item.title}
					</div>
					<div className="flex flex-col sm:flex-row items-start mb-1 group-last:before:hidden before:absolute before:left-2 sm:before:left-0 before:h-full before:px-px before:bg-slate-300 sm:before:ml-[6.5rem] before:self-start before:-translate-x-1/2 before:translate-y-3 after:absolute after:left-2 sm:after:left-0 after:w-2 after:h-2 after:bg-green-400 after:border-4 after:box-content after:border-slate-50 after:rounded-full sm:after:ml-[6.5rem] after:-translate-x-1/2 after:translate-y-1.5">
						<time className="sm:absolute left-0 translate-y-0.5 inline-flex items-center justify-center text-xs font-semibold uppercase w-20 h-6 mb-3 sm:mb-0 text-emerald-600 bg-emerald-100 rounded-full ">
							{item.date}
						</time>
					</div>
					<div className="md:text-lg lg:text-xl text-slate-600 dark:text-content-color">
						{item.description}
					</div>
				</div>
			))}
		</div>
	);
};

export default TimeLine;
