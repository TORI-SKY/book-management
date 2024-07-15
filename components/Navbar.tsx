import React from "react";
import Profile from "./Profile";
import Link from "next/link";
import MenuLinks from "./MenuLinks";
import Image from 'next/image'

export default function Navbar() {
	return (
		<div className="flex justify-between items-center h-20 ">
			<div className="flex space-x-10">
				<Link href="/" className="my-auto">
					<Image
						src="/logo.png"
						width={300}
						height={200}
						alt="springbaord logo"
					/>
				</Link>
				<MenuLinks />
			</div>

			<Profile />
		</div>
	);
}
