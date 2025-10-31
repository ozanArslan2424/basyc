import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { paths } from "@/nav/paths";
import { Link } from "react-router";

export function ErrorCard({ error }: { error: Error | null | string }) {
	const title = "Unexpected error";
	const description = typeof error === "string" ? error : error?.message || "Please try again later";

	return (
		<div className="flex min-h-screen w-full items-center justify-center">
			<Card className="w-full max-w-md">
				<CardHeader>
					<CardTitle className="text-xl">{title}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardContent>
					<p className="text-muted-foreground text-sm">If the problem persists, contact the support team.</p>
				</CardContent>
				<CardFooter className="gap-2">
					<Link to={paths.dashboard}>
						<Button>Back to Dashboard</Button>
					</Link>

					<Link to={paths.login}>
						<Button variant="secondary">Back to Login</Button>
					</Link>
				</CardFooter>
			</Card>
		</div>
	);
}
