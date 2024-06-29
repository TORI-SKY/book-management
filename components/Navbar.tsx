import React from "react";
import Profile from "./Profile";
import Link from "next/link";
import MenuLinks from "./MenuLinks";

export default function Navbar() {
	return (
		<div className="flex justify-between items-center h-20 ">
			{/* <Link href="/">
				<h1 className="text-xl font-bold">Logo</h1>
			</Link> */}
			<MenuLinks />
			<Profile />
		</div>
	);
}
