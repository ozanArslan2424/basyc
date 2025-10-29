import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Zap, BarChart3, Shield, Clock, Target } from "lucide-react";

const iconMap = {
	Users,
	Zap,
	BarChart3,
	Shield,
	Clock,
	Target,
};

export function FeatureCard({
	title,
	description,
	icon,
}: {
	title: string;
	description: string;
	icon: keyof typeof iconMap;
}) {
	const IconComponent = iconMap[icon];
	return (
		<Card className="border transition-shadow hover:shadow-lg">
			<CardHeader className="pb-4">
				<div className="flex items-center gap-4">
					<div className="bg-primary/10 rounded-lg p-2">
						<IconComponent className="text-primary h-5 w-5" />
					</div>
					<CardTitle className="text-foreground text-lg">{title}</CardTitle>
				</div>
			</CardHeader>
			<CardContent>
				<p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
			</CardContent>
		</Card>
	);
}
