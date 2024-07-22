"use client";
import React from "react";
import { usePathname } from "next/navigation";

import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu"


export default function MenuLinks() {
	const pathname = usePathname();

	return (

		<div className="flex">
			{/* {pathname} */}
			<NavigationMenu>
				<NavigationMenuList className=" flex space-x-2 font-bold ">
					<NavigationMenuItem className={`${pathname === '/' ? ' bg-primary text-white font-bold' : ''}  px-[1rem] py-[0.5rem] rounded`}>
						<NavigationMenuLink href="/">Stocks</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className={`${pathname === '/books' ? ' bg-primary text-white font-bold' : ''}  px-[1rem] py-[0.5rem] rounded`}>
						<NavigationMenuLink href="/books">Books</NavigationMenuLink>
					</NavigationMenuItem >
					<NavigationMenuItem className={`${pathname === '/purchase' ? ' bg-primary text-white font-bold' : ''}  px-[1rem] py-[0.5rem] rounded`}>
						<NavigationMenuLink href="/purchase">Purchase</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

		</div>

	);
}
