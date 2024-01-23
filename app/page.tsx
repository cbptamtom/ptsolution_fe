import About from "@/components/About";
import Blog from "@/components/Blog";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Experiences from "@/components/Experiences";
import Image from "next/image";

export default function Home() {
	return (
		<main>
			<Header />
			<Hero />
			<About />
			<Blog />
		</main>
	);
}
