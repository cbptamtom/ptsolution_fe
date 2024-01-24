"use client";
import { FullBlog } from "@/app/lib/interface";
import { client } from "@/app/lib/sanity";
import Header from "@/components/Header";
import { PortableText } from "@portabletext/react";
const getData = async (slug: string) => {
	const query = `
  *[_type=="blog" && slug.current == "${slug}"]{
    "currentSlug":slug.current,
      title,
      content,
      titleImage
  }[0]
  `;
	const data = await client.fetch(query);
	return data;
};

const BlogArticle = async ({ params }: { params: { slug: string } }) => {
	const data: FullBlog = await getData(params.slug);
	return (
		<>
			<Header />
			<div className="mx-auto max-w-screen-xl px-4 flex flex-col justify-between items-center">
				<p className="m-20 px-8 text-center text-3xl font-semibold leading-8 text-green-900 sm:text-3xl sm:leading-9 dark:text-white	 ">
					{data.title}
				</p>
				<div className="mt-20 prose prose-blue prose-xl dark:prose-invert prose-h1:font-medium">
					<PortableText value={data.content} />
				</div>
			</div>
		</>
	);
};

export default BlogArticle;
