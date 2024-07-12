"use client";
import React, { Suspense } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { supabaseBrowser } from "@/lib/supabase/browser";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = supabaseBrowser();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/auth?message=Could not authenticate user");
    }

    return redirect("/");
  };

  return  (
    <div className="flex justify-center">
     <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <form className="flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <label className="text-md font-bold" htmlFor="email">
          Email
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />
        <label className="text-md font-bold" htmlFor="password">
          Password
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          required
        />
        <SubmitButton
          formAction={signIn}
          className="bg-[#6C2C8D] rounded-md px-4 py-2 text-foreground mb-2 text-white font-semibold"
          pendingText="Signing In..."
        >
          Sign In
        </SubmitButton>
        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
    </div>
  );
}