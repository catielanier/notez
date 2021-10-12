import React from "react";
import Helmet from "react-helmet";
import { useTranslation } from "react-i18next";

export default function Title() {
	const { t } = useTranslation();
	return (
		<Helmet>
			<title>{t("app.name")}</title>
		</Helmet>
	);
}
