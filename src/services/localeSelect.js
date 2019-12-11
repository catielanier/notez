const localeSelect = (language, element) => {
  if (language === "ja") {
    return element.ja;
  } else if (language === "ko") {
    return element.ko;
  } else if (language === "zh-CN") {
    return element.cn;
  } else if (language === "zh-TW") {
    return element.tw;
  } else if (language === "zh-SG") {
    return element.sg;
  } else if (language === "zh-HK") {
    return element.hk;
  } else {
    return element.en;
  }
};

export default localeSelect;
