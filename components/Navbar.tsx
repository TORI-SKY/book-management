import React from "react";
import Profile from "./Profile";
import Link from "next/link";
import MenuLinks from "./MenuLinks";

export default function Navbar() {
	return (
		<div className="flex justify-between items-center h-20 ">
			<div className="flex space-x-10">
			<Link href="/" className="my-auto">
				<h1 className="text-xl font-bold">SPRINGBOARD4EDUCATION</h1>
			</Link>
			<MenuLinks />
			</div>
			
			<Profile />
		</div>
	);
}
