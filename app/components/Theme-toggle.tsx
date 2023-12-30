"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<button className="relative flex items-center focus:outline-none">
					<SunIcon className="h-[1.2rem] w-[1.2rem] transition-all dark:opacity-0 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] opacity-0 scale-0 transition-all dark:opacity-100 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
