import { Button } from "@/components/ui/button";
import { paths } from "@/nav/paths";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router";
import { FeatureCard } from "./feature-card";

export function LandingPage() {
	const { t } = useTranslation("landing");

	return (
		<div className="bg-background min-h-screen">
			{/* Hero Section */}
			<section className="border-b py-24">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-foreground mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
						{t("hero.title")}
						<span className="text-primary block">{t("hero.highlight")}</span>
					</h1>
					<p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg md:text-xl">{t("hero.description")}</p>
					<div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
						<Link to={paths.dashboard}>
							<Button size="lg" className="px-12 py-6 text-lg">
								{t("hero.primaryButton")}
								<ArrowRight className="ml-2 h-5 w-5" />
							</Button>
						</Link>
						<Button size="lg" variant="outline" className="px-12 py-6 text-lg">
							{t("hero.secondaryButton")}
						</Button>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-20">
				<div className="container mx-auto px-4">
					<div className="mb-16 text-center">
						<h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{t("features.title")}</h2>
					</div>

					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						<FeatureCard
							title={t("features.items.centralCandidatePool.title")}
							description={t("features.items.centralCandidatePool.description")}
							icon="Users"
						/>
						<FeatureCard
							title={t("features.items.smartWorkflow.title")}
							description={t("features.items.smartWorkflow.description")}
							icon="Zap"
						/>
						<FeatureCard
							title={t("features.items.detailedAnalytics.title")}
							description={t("features.items.detailedAnalytics.description")}
							icon="BarChart3"
						/>
						<FeatureCard
							title={t("features.items.secureAndCompliant.title")}
							description={t("features.items.secureAndCompliant.description")}
							icon="Shield"
						/>
						<FeatureCard
							title={t("features.items.fastIntegration.title")}
							description={t("features.items.fastIntegration.description")}
							icon="Clock"
						/>
						<FeatureCard
							title={t("features.items.teamCollaboration.title")}
							description={t("features.items.teamCollaboration.description")}
							icon="Target"
						/>
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-muted/50 py-20">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-foreground mb-4 text-3xl font-bold md:text-4xl">{t("cta.title")}</h2>
					<p className="text-muted-foreground mx-auto mb-8 max-w-2xl">{t("cta.description")}</p>
					<Button size="lg" className="px-8 py-6 text-lg">
						{t("cta.button")}
						<ArrowRight className="ml-2 h-5 w-5" />
					</Button>
				</div>
			</section>
		</div>
	);
}
