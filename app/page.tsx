import { Header, Hero } from "@/components";
import About from "@/components/About";
import Blog from "@/components/Blog";
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
