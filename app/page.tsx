import { Hero } from "@/components";
import About from "@/components/About";
import Experiences from "@/components/Experiences";
import Image from "next/image";

export default function Home() {
	return (
		<main>
			<Hero />
			<About />
		</main>
	);
}
