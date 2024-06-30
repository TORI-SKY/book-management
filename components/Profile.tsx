"use client";
import React from "react";
import Link from "next/link";
import useUser from "@/app/hook/useUser";

import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQueryClient } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { protectedPaths } from "@/lib/constant";

export default function Profile() {
	const { isFetching, data } = useUser();
	const queryClient = useQueryClient();
	const router = useRouter();

	const pathname = usePathname();

	if (isFetching) {
		return <></>;
	}

	const handleLogout = async () => {
		const supabase = supabaseBrowser();
		queryClient.clear();
		await supabase.auth.signOut();
		router.refresh();
		if (protectedPaths.includes(pathname)) {
			router.replace("/auth?next=" + pathname);
		}
	};

	return (
		<div>
			{data ? (
				<div className="flex items-center gap-4">
					<span className=" hidden md:block">{data?.email}</span>
					<form action={handleLogout}>
						<button className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover">
							Logout
						</button>
					</form>
				</div>
			) : (
				<Link
					href="/auth"
					className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
				>
					Login
				</Link>
			)}
		</div>
	);
}
