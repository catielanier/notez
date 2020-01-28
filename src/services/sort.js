export default function sort(arr, language) {
  if (language === "ja") {
    arr.sort((x, y) => {
      return x.name_ja.localeCompare(y.name_ja);
    });
  } else if (language === "ko") {
    arr.sort((x, y) => {
      return x.name_ko.localeCompare(y.name_ko);
    });
  } else if (
    language === "zh-CN" ||
    language === "zh-TW" ||
    language === "zh-HK"
  ) {
    arr.sort((x, y) => {
      return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
    });
  } else {
    arr.sort((x, y) => {
      return x.name.localeCompare(y.name);
    });
  }
}
