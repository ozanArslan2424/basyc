import { Card, CardContent } from "@/components/ui/card";
import { Outlet } from "react-router";

const decorationImage = "/public/logo.svg";
// const decorationImage = "/brand/brand_bg.png";
const decorationImageAlt = "Auth Decoration";
const confirmText = {
	first: "By continuing you'll be accepting",
	tos: "Terms of Service",
	and: "and",
	pp: "Privacy Policy",
	last: ".",
};

export function AuthLayout() {
	return (
		<div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
			<div className="w-full max-w-sm md:max-w-3xl">
				<div className="flex flex-col gap-6">
					<Card className="overflow-hidden p-0">
						<CardContent className="grid p-0 md:grid-cols-2">
							<Outlet />
							<div className="bg-muted relative hidden md:block">
								<img
									src={decorationImage}
									alt={decorationImageAlt}
									className="absolute inset-0 h-full w-full object-cover"
								/>
							</div>
						</CardContent>
					</Card>
					<div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
						{confirmText.first} <a href="#">{confirmText.tos}</a> {confirmText.and} <a href="#">{confirmText.pp}</a>{" "}
						{confirmText.last}
					</div>
				</div>
			</div>
		</div>
	);
}
