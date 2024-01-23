import { SimpleBlogCard } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import React from "react";

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
		<div className="grid grid-cols-1  md:grid-cols-2 mt-5 gap-5" id="blog">
			{/* {data.map( (post) => {
        
      })} */}
		</div>
	);
};

export default Blog;
