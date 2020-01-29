import React, { useContext } from "react";
import Helmet from "react-helmet";
import { title } from "../data/locales";
import localeSelect from "../services/localeSelect";
import { LanguageContext } from "../contexts/LanguageContext";

export default function Title() {
  const { language } = useContext(LanguageContext);
  return (
    <Helmet>
      <title>{localeSelect(language, title)}</title>
    </Helmet>
  );
}
