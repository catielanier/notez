const dbLocale = (language, element) => {
  if (language === "ja") {
    return element.name_ja;
  } else if (language === "ko") {
    return element.name_ko;
  } else if (language === "zh-CN") {
    return element["name_zh-cn"];
  } else if (language === "zh-TW" || language === "zh-SG") {
    return element["name_zh-tw"];
  } else if (language === "zh-HK") {
    return element["name_zh-hk"];
  } else {
    return element.name;
  }
};

export default dbLocale;
