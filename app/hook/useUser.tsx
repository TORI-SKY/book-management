"use client";
import { supabaseBrowser } from "@/lib/supabase/browser";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export default function useUser() {
	return useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const supabase = supabaseBrowser();
			const { data: {user} } = await supabase.auth.getUser();
			return user;
		},
	});
}
