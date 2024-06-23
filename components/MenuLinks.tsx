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
				<NavigationMenuList className=" flex space-x-2">
					<NavigationMenuItem className={`${pathname === '/'? ' bg-slate-500 text-white': ''}  p-2 rounded`}>
						<NavigationMenuLink href="/">Stocks</NavigationMenuLink>
					</NavigationMenuItem>
					<NavigationMenuItem className={`${pathname === '/books'? ' bg-slate-500 text-white': ''}  p-2 rounded`}>
						<NavigationMenuLink href="/books">Books</NavigationMenuLink>
					</NavigationMenuItem >
					<NavigationMenuItem className={`${pathname === '/purchase'? ' bg-slate-500 text-white': ''}  p-2 rounded`}>
						<NavigationMenuLink href="/purchase">Purchase</NavigationMenuLink>
					</NavigationMenuItem>
				</NavigationMenuList>
			</NavigationMenu>

		</div>
	);
}
