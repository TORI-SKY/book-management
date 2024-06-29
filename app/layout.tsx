import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import QueryProvider from "@/components/query-provider";
import Navbar from "@/components/Navbar";
import ToastMessage from '@/components/common/ToastMessage'
import { Providers } from '@/components/common/Providers'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Book Stock Management",
	description: "Book Stock Management",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {


	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<AppRouterCacheProvider>
					<QueryProvider>
						<ThemeProvider
							attribute="class"
							enableSystem
							disableTransitionOnChange
						>
							<Providers>
								<ToastMessage />
								<main className="max-w-6xl min-h-screen mx-auto py-10 space-y-10 px-5 xl:px-0">
									<Navbar />
									{children}
								</main>
							</Providers>
						</ThemeProvider>
					</QueryProvider>
				</AppRouterCacheProvider>

			</body>
		</html>
	);
}
