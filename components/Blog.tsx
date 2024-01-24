"use client";
import { SimpleBlogCard } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";

const getData = async () => {
	const query = `
  *[_type=="blog"] | order(_createdAt desc) {
		title,
		smallDescription,
		"currentSlug":slug.current,
			titleImage
	}
  `;

	const data = await client.fetch(query);
	return data;
};

const Blog = async () => {
	const data: SimpleBlogCard[] = await getData();
	return (
		<section className="lg:mt-44 lg:mb-16" id="blog">
			<div className="grid grid-cols-1 md:grid-cols-3 mt-5 gap-10 mx-auto max-w-screen-xl px-4">
				{data.map((post, idx) => (
					<Card
						key={idx}
						className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 "
					>
						<Image
							src={urlFor(post.titleImage).url()}
							alt="image"
							width={500}
							height={500}
							className="rounded-t-lg h-[200px] object-cover"
						/>
						<CardContent className="p-5 flex flex-col h-auto">
							<div className="mb-2 min-h-[5em]">
								<Link
									href={`/blog/${post.currentSlug}`}
									className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
								>
									{post.title}
								</Link>
							</div>
							<div className="mb-3 ">
								<p className="font-normal text-gray-700 dark:text-gray-400 overflow-hidden line-clamp-3">
									{post.smallDescription}
								</p>
							</div>
							<div>
								<Link
									href={`/blog/${post.currentSlug}`}
									className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg dark:hover:bg-gray-700 dark:hover:text-green-500 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-green-600 dark:focus:ring-blue-800"
								>
									Read more
									<svg
										className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
										aria-hidden="true"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 14 10"
									>
										<path
											stroke="currentColor"
											stroke-linecap="round"
											stroke-linejoin="round"
											stroke-width="2"
											d="M1 5h12m0 0L9 1m4 4L9 9"
										/>
									</svg>
								</Link>
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Blog;
