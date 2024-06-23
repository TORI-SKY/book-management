import { Button } from "@/components/ui/button";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Page() {
	return (
		<div>
			<div className=" flex justify-between">
				<h1 className=" text-xl">Books</h1>
				<Dialog>
					<DialogTrigger>Add New Book</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Book</DialogTitle>
						</DialogHeader>
						<div>
							<p>form here</p>
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
