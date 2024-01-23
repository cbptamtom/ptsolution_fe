import { SimpleBlogCard } from "@/app/lib/interface";
import { client, urlFor } from "@/app/lib/sanity";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";

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
	console.log(data);
	return (
		<section className="lg:mt-44 lg:mb-16" id="blog">
			<div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-10 mx-auto max-w-screen-xl px-4">
				{data.map((post, idx) => (
					<Card key={idx} className="">
						<Image
							src={urlFor(post.titleImage).url()}
							alt="image"
							width={500}
							height={500}
							className="rounded-t-lg h-[200px] object-cover"
						/>
						<CardContent className="mt-5">
							<h3 className="text-lg line-clamp-2 font-bold">{post.title}</h3>
							<p className="line-clamp-3 text-sm mt-2 text-gray-600 dark:text-gray-300">
								{post.smallDescription}
							</p>

							<Link
								href={`/blog/${post.currentSlug}`}
								className="w-full inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center dark:hover:bg-gray-700 dark:hover:text-green-500 border-black rounded-lg focus:ring-4 focus:ring-gray-100 hover:bg-gray-200 "
							>
								Read More
							</Link>
						</CardContent>
					</Card>
				))}
			</div>
		</section>
	);
};

export default Blog;
