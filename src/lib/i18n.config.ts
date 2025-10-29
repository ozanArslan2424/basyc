import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enCommon from "./locales/en/common.json";
import enLanding from "./locales/en/landing.json";
import enAuth from "./locales/en/auth.json";
import enPaths from "./locales/en/paths.json";
import enApplicants from "./locales/en/applicants.json";
import enJob from "./locales/en/job.json";
import enAnalytics from "./locales/en/analytics.json";

i18n
	.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		fallbackLng: "en",
		interpolation: {
			escapeValue: false,
		},
		resources: {
			en: {
				common: enCommon,
				landing: enLanding,
				auth: enAuth,
				paths: enPaths,
				applicants: enApplicants,
				job: enJob,
				analytics: enAnalytics,
			},
		},
		detection: {
			order: ["localStorage", "navigator", "htmlTag"],
			caches: ["localStorage"],
		},
	});

export default i18n;
