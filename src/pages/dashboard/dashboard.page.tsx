import { useAppContext } from "@/client";
import { FormField } from "@/components/form/form-field";
import { PageContent } from "@/components/page-content";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@/hooks/use-form";
import { ThingCreateDataSchema } from "@/schemas/thing.schemas";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

export function DashboardPage() {
	const ctx = useAppContext();
	const { t } = useTranslation("common");
	const browserTitle = t("app.name");

	const thingListQuery = useSuspenseQuery(ctx.thingService.listQuery());
	const thingCreateMutation = useMutation(ctx.thingService.create());

	const form = useForm({
		schema: ThingCreateDataSchema,
		onSubmit: (body) => {
			thingCreateMutation.mutate(body, {
				onSuccess: () => {
					form.reset();
				},
			});
		},
	});

	return (
		<PageContent browserTitle={browserTitle}>
			<div className="grid grid-cols-12 gap-4">
				<div className="col-span-4">
					<div className="flex flex-col gap-4">
						<Card>
							<CardContent>
								<form {...form.methods} className="flex flex-col gap-2">
									<FormField form={form} name="content" id="content">
										<Textarea placeholder="thing goes here" required className="relative" />
									</FormField>
									<Button size="sm">Submit</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>

				<div className="col-span-8">
					{thingListQuery.data.map((thing) => (
						<Card key={thing.id}>
							<CardContent>{thing.content}</CardContent>
						</Card>
					))}
				</div>
			</div>
		</PageContent>
	);
}
