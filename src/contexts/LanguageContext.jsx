import { createContext, useEffect, useState } from "react";

export const LanguageContext = createContext();

const LanguageContextProvider = (props) => {
  const [language, setLanguage] = useState(null);
  useEffect(() => {
    const locale = navigator.language;
    const index = locale.indexOf("zh");
    if (index !== 0) {
      const userLanguage = locale.split(/[-_]/)[0];
      setLanguage(userLanguage);
    } else {
      if (locale === "zh-CN") {
        const userLanguage = locale;
        setLanguage(userLanguage);
      } else {
        setLanguage("zh");
      }
    }
  });
  return (
    <LanguageContext.Provider value={{ language }}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export default LanguageContextProvider;
