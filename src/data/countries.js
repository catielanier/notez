const countries = [
  {
    value: "AFG",
    name_en: "Afghanistan",
    name_ja: "アフガニスタン",
    name_ko: "아프가니스탄",
    name_cn: "阿富汗",
    name_tw: "阿富汗",
    name_hk: "阿富汗"
  },
  {
    value: "ALB",
    name_en: "Albania",
    name_ja: "アルバニア",
    name_ko: "알바니아",
    name_cn: "阿尔巴尼亚",
    name_tw: "阿爾巴尼亞",
    name_hk: "阿爾巴尼亞"
  },
  {
    value: "DZA",
    name_en: "Algeria",
    name_ja: "アルジェリア",
    name_ko: "알제리",
    name_cn: "阿尔及利亚",
    name_tw: "阿爾及利亞",
    name_hk: "阿爾及利亞"
  },
  {
    value: "ASM",
    name_en: "American Samoa",
    name_ja: "アメリカ領サモア",
    name_ko: "아메리카 사모아",
    name_cn: "美属萨摩亚",
    name_tw: "美屬薩摩亞",
    name_hk: "美屬薩摩亞"
  },
  {
    value: "AND",
    name_en: "Andorra",
    name_ja: "アンドラ",
    name_ko: "안도라",
    name_cn: "安道尔",
    name_tw: "安道爾",
    name_hk: "安道爾"
  },
  {
    value: "AGO",
    name_en: "Angola",
    name_ja: "アンゴラ",
    name_ko: "앙골라",
    name_cn: "安哥拉",
    name_tw: "安哥拉",
    name_hk: "安哥拉"
  },
  {
    value: "AIA",
    name_en: "Anguilla",
    name_ja: "アンギラ",
    name_ko: "앵귈라",
    name_cn: "安圭拉岛",
    name_tw: "安圭拉島",
    name_hk: "安圭拉島"
  },
  {
    value: "ATA",
    name_en: "Antarctica",
    name_ja: "南極大陸",
    name_ko: "남극",
    name_cn: "南极洲",
    name_tw: "南極洲",
    name_hk: "南極洲"
  },
  {
    value: "ATG",
    name_en: "Antigua and Barbuda",
    name_ja: "アンティグアバーブーダ",
    name_ko: "앤티가 바부다",
    name_cn: "安提瓜和巴布达",
    name_tw: "安提瓜和巴布達",
    name_hk: "安提瓜和巴布達"
  },
  {
    value: "ARG",
    name_en: "Argentina",
    name_ja: "アルゼンチン",
    name_ko: "아르헨티나",
    name_cn: "阿根廷",
    name_tw: "阿根廷",
    name_hk: "阿根廷"
  },
  {
    value: "ARM",
    name_en: "Armenia",
    name_ja: "アルメニア",
    name_ko: "아르메니아",
    name_cn: "亚美尼亚",
    name_tw: "亞美尼亞",
    name_hk: "亞美尼亞"
  },
  {
    value: "ABW",
    name_en: "Aruba",
    name_ja: "アルバ",
    name_ko: "아루바",
    name_cn: "阿鲁巴岛",
    name_tw: "阿魯巴島",
    name_hk: "阿魯巴島"
  },
  {
    value: "AUS",
    name_en: "Australia",
    name_ja: "オーストラリア",
    name_ko: "호주",
    name_cn: "澳大利亚",
    name_tw: "澳大利亞",
    name_hk: "澳大利亞"
  },
  {
    value: "AUT",
    name_en: "Austria",
    name_ja: "オーストリア",
    name_ko: "오스트리아",
    name_cn: "奥地利",
    name_tw: "奧地利",
    name_hk: "奧地利"
  },
  {
    value: "AZE",
    name_en: "Azerbaijan",
    name_ja: "アゼルバイジャン",
    name_ko: "아제르바이잔",
    name_cn: "阿塞拜疆",
    name_tw: "阿塞拜疆",
    name_hk: "阿塞拜疆"
  },
  {
    value: "BHS",
    name_en: "Bahamas",
    name_ja: "バハマ",
    name_ko: "바하마",
    name_cn: "巴哈马",
    name_tw: "巴哈馬",
    name_hk: "巴哈馬"
  },
  {
    value: "BHR",
    name_en: "Bahrain",
    name_ja: "バーレーン",
    name_ko: "바레인",
    name_cn: "巴林",
    name_tw: "巴林",
    name_hk: "巴林"
  },
  {
    value: "BGD",
    name_en: "Bangladesh",
    name_ja: "バングラデシュ",
    name_ko: "방글라데시",
    name_cn: "孟加拉国",
    name_tw: "孟加拉國",
    name_hk: "孟加拉國"
  },
  {
    value: "BRB",
    name_en: "Barbados",
    name_ja: "バルバドス",
    name_ko: "바베이도스",
    name_cn: "巴巴多斯",
    name_tw: "巴巴多斯",
    name_hk: "巴巴多斯"
  },
  {
    value: "BLR",
    name_en: "Belarus",
    name_ja: "ベラルーシ",
    name_ko: "벨라루스",
    name_cn: "白俄罗斯",
    name_tw: "白俄羅斯",
    name_hk: "白俄羅斯"
  },
  {
    value: "BEL",
    name_en: "Belgium",
    name_ja: "ベルギー",
    name_ko: "벨기에",
    name_cn: "比利时",
    name_tw: "比利時",
    name_hk: "比利時"
  },
  {
    value: "BEN",
    name_en: "Benin",
    name_ja: "ベナン",
    name_ko: "베냉",
    name_cn: "贝宁",
    name_tw: "貝寧",
    name_hk: "貝寧"
  },
  {
    value: "BMU",
    name_en: "Bermuda",
    name_ja: "バミューダ",
    name_ko: "버뮤다",
    name_cn: "百慕大",
    name_tw: "百慕大",
    name_hk: "百慕大"
  },
  {
    value: "BTN",
    name_en: "Bhutan",
    name_ja: "ブータン",
    name_ko: "부탄",
    name_cn: "不丹",
    name_tw: "不丹",
    name_hk: "不丹"
  },
  {
    value: "BOL",
    name_en: "Bolivia",
    name_ja: "ボリビア",
    name_ko: "볼리비아",
    name_cn: "玻利维亚",
    name_tw: "玻利維亞",
    name_hk: "玻利維亞"
  },
  {
    value: "BES",
    name_en: "Bonaire",
    name_ja: "ボネール",
    name_ko: "보네르",
    name_cn: "博奈尔",
    name_tw: "博奈爾",
    name_hk: "博奈爾"
  },
  {
    value: "BIH",
    name_en: "Bosnia and Herzegovina",
    name_ja: "ボスニア・ヘルツェゴビナ",
    name_ko: "보스니아 헤르체고비나",
    name_cn: "波斯尼亚和黑塞哥维那",
    name_tw: "波斯尼亞和黑塞哥維那",
    name_hk: "波斯尼亞和黑塞哥維那"
  },
  {
    value: "BWA",
    name_en: "Botswana",
    name_ja: "ボツワナ",
    name_ko: "보츠와나",
    name_cn: "博茨瓦纳",
    name_tw: "博茨瓦納",
    name_hk: "博茨瓦納"
  },
  {
    value: "BVT",
    name_en: "Bouvet Island",
    name_ja: "ブーベ島",
    name_ko: "부베 섬",
    name_cn: "布维岛",
    name_tw: "布維島",
    name_hk: "布維島"
  },
  {
    value: "BRA",
    name_en: "Brazil",
    name_ja: "ブラジル",
    name_ko: "브라질",
    name_cn: "巴西",
    name_tw: "巴西",
    name_hk: "巴西"
  },
  {
    value: "IOT",
    name_en: "British Indian Ocean Territory",
    name_ja: "イギリス領インド洋地域",
    name_ko: "영국령 인도양 지역",
    name_cn: "英属印度洋领地",
    name_tw: "英屬印度洋領地",
    name_hk: "英屬印度洋領地"
  },
  {
    value: "BRN",
    name_en: "Brunei",
    name_ja: "イギリス領インド洋地域",
    name_ko: "영국령 인도양 지역",
    name_cn: "英属印度洋领地",
    name_tw: "英屬印度洋領地",
    name_hk: "英屬印度洋領地"
  },
  {
    value: "BGR",
    name_en: "Bulgaria",
    name_ja: "ブルガリア",
    name_ko: "불가리아",
    name_cn: "保加利亚",
    name_tw: "保加利亞",
    name_hk: "保加利亞"
  },
  {
    value: "BFA",
    name_en: "Burkina Faso",
    name_ja: "ブルキナファソ",
    name_ko: "부르키나 파소",
    name_cn: "布基纳法索",
    name_tw: "布基納法索",
    name_hk: "布基納法索"
  },
  {
    value: "BDI",
    name_en: "Burundi",
    name_ja: "ブルンジ",
    name_ko: "부룬디",
    name_cn: "布隆迪",
    name_tw: "布隆迪",
    name_hk: "布隆迪"
  },
  {
    value: "CPV",
    name_en: "Cabo Verde",
    name_ja: "カボベルデ",
    name_ko: "카보 베르데",
    name_cn: "佛得角",
    name_tw: "佛得角",
    name_hk: "佛得角"
  },
  {
    value: "KHM",
    name_en: "Cambodia",
    name_ja: "カンボジア",
    name_ko: "캄보디아",
    name_cn: "柬埔寨",
    name_tw: "柬埔寨",
    name_hk: "柬埔寨"
  },
  {
    value: "CMR",
    name_en: "Cameroon",
    name_ja: "カメルーン",
    name_ko: "카메룬",
    name_cn: "喀麦隆",
    name_tw: "喀麥隆",
    name_hk: "喀麥隆"
  },
  {
    value: "CAN",
    name_en: "Canada",
    name_ja: "カナダ",
    name_ko: "캐나다",
    name_cn: "加拿大",
    name_tw: "加拿大",
    name_hk: "加拿大"
  },
  {
    value: "CYM",
    name_en: "Cayman Islands",
    name_ja: "ケイマン諸島",
    name_ko: "케이맨 제도",
    name_cn: "开曼群岛",
    name_tw: "開曼群島",
    name_hk: "開曼群島"
  },
  {
    value: "CAF",
    name_en: "Central African Republic",
    name_ja: "中央アフリカ共和国",
    name_ko: "중앙 아프리카 공화국",
    name_cn: "中非共和国",
    name_tw: "中非共和國",
    name_hk: "中非共和國"
  },
  {
    value: "TCD",
    name_en: "Chad",
    name_ja: "チャド",
    name_ko: "차드",
    name_cn: "乍得",
    name_tw: "乍得",
    name_hk: "乍得"
  },
  {
    value: "CHL",
    name_en: "Chile",
    name_ja: "チリ",
    name_ko: "칠레",
    name_cn: "智利",
    name_tw: "智利",
    name_hk: "智利"
  },
  {
    value: "CHN",
    name_en: "China",
    name_ja: "中国",
    name_ko: "중국",
    name_cn: "中国",
    name_tw: "中國",
    name_hk: "中國"
  },
  {
    value: "CXR",
    name_en: "Christmas Island",
    name_ja: "クリスマス島",
    name_ko: "크리스마스 섬",
    name_cn: "圣诞岛",
    name_tw: "聖誕島",
    name_hk: "聖誕島"
  },
  {
    value: "CCK",
    name_en: "Cocos (Keeling) Islands",
    name_ja: "ココス諸島",
    name_ko: "코코스 제도",
    name_cn: "科科斯群岛",
    name_tw: "科科斯群島",
    name_hk: "科科斯群島"
  },
  {
    value: "COL",
    name_en: "Colombia",
    name_ja: "コロンビア",
    name_ko: "콜롬비아",
    name_cn: "哥伦比亚",
    name_tw: "哥倫比亞",
    name_hk: "哥倫比亞"
  },
  {
    value: "COM",
    name_en: "Comoros",
    name_ja: "コモロ",
    name_ko: "코모로",
    name_cn: "科摩罗",
    name_tw: "科摩羅",
    name_hk: "科摩羅"
  },
  {
    value: "COD",
    name_en: "Congo",
    name_ja: "コンゴ",
    name_ko: "콩고",
    name_cn: "刚果",
    name_tw: "剛果",
    name_hk: "剛果"
  },
  {
    value: "COK",
    name_en: "Cook Islands",
    name_ja: "クック諸島",
    name_ko: "쿡 제도",
    name_cn: "库克群岛",
    name_tw: "庫克群島",
    name_hk: "庫克群島"
  },
  {
    value: "CRI",
    name_en: "Costa Rica",
    name_ja: "コスタリカ",
    name_ko: "코스타리카",
    name_cn: "哥斯达黎加",
    name_tw: "哥斯達黎加",
    name_hk: "哥斯達黎加"
  },
  {
    value: "HRV",
    name_en: "Croatia",
    name_ja: "クロアチア",
    name_ko: "크로아티아",
    name_cn: "克罗地亚",
    name_tw: "克羅地亞",
    name_hk: "克羅地亞"
  },
  {
    value: "CUB",
    name_en: "Cuba",
    name_ja: "キューバ",
    name_ko: "쿠바",
    name_cn: "古巴",
    name_tw: "古巴",
    name_hk: "古巴"
  },
  {
    value: "CUW",
    name_en: "Curaçao",
    name_ja: "キュラソー",
    name_ko: "쿠라사오",
    name_cn: "库拉索",
    name_tw: "庫拉索",
    name_hk: "庫拉索"
  },
  {
    value: "CYP",
    name_en: "Cyprus",
    name_ja: "キプロス",
    name_ko: "키프로스",
    name_cn: "塞浦路斯",
    name_tw: "塞浦路斯",
    name_hk: "塞浦路斯"
  },
  {
    value: "CZE",
    name_en: "Czechia",
    name_ja: "チェコ",
    name_ko: "체코",
    name_cn: "捷克",
    name_tw: "捷克",
    name_hk: "捷克"
  },
  {
    value: "CIV",
    name_en: "Côte d'Ivoire",
    name_ja: "コートジボワール",
    name_ko: "코트 디부아르",
    name_cn: "象牙海岸",
    name_tw: "象牙海岸",
    name_hk: "象牙海岸"
  },
  {
    value: "COD",
    name_en: "Democratic Republic of the Congo",
    name_ja: "コンゴ民主共和国",
    name_ko: "콩고 민주 공화국",
    name_cn: "刚果民主共和国",
    name_tw: "剛果民主共和國",
    name_hk: "剛果民主共和國"
  },
  {
    value: "DNK",
    name_en: "Denmark",
    name_ja: "デンマーク",
    name_ko: "덴마크",
    name_cn: "丹麦",
    name_tw: "丹麥",
    name_hk: "丹麥"
  },
  {
    value: "DJI",
    name_en: "Djibouti",
    name_ja: "ジブチ",
    name_ko: "지부티",
    name_cn: "吉布地",
    name_tw: "吉布地",
    name_hk: "吉布地"
  },
  {
    value: "DMA",
    name_en: "Dominica",
    name_ja: "ドミニカ国",
    name_ko: "도미니카",
    name_cn: "多米尼加",
    name_tw: "多米尼加",
    name_hk: "多米尼加"
  },
  {
    value: "DOM",
    name_en: "Dominican Republic",
    name_ja: "ドミニカ共和国",
    name_ko: "도미니카 공화국",
    name_cn: "多明尼加共和国",
    name_tw: "多明尼加共和國",
    name_hk: "多明尼加共和國"
  },
  {
    value: "ECU",
    name_en: "Ecuador",
    name_ja: "エクアドル",
    name_ko: "에콰도르",
    name_cn: "厄瓜多尔",
    name_tw: "厄瓜多爾",
    name_hk: "厄瓜多爾"
  },
  {
    value: "EGY",
    name_en: "Egypt",
    name_ja: "エジプト",
    name_ko: "이집트",
    name_cn: "埃及",
    name_tw: "埃及",
    name_hk: "埃及"
  },
  {
    value: "SLV",
    name_en: "El Salvador",
    name_ja: "エルサルバドル",
    name_ko: "엘살바도르",
    name_cn: "萨尔瓦多",
    name_tw: "薩爾瓦多",
    name_hk: "薩爾瓦多"
  },
  {
    value: "GNQ",
    name_en: "Equatorial Guinea",
    name_ja: "赤道ギニア",
    name_ko: "적도 기니",
    name_cn: "赤道几内亚",
    name_tw: "赤道幾內亞",
    name_hk: "赤道幾內亞"
  },
  {
    value: "ERI",
    name_en: "Eritrea",
    name_ja: "エリトリア",
    name_ko: "에리트레아",
    name_cn: "厄立特里亚",
    name_tw: "厄立特里亞",
    name_hk: "厄立特里亞"
  },
  {
    value: "EST",
    name_en: "Estonia",
    name_ja: "エストニア",
    name_ko: "에스토니아",
    name_cn: "爱沙尼亚",
    name_tw: "愛沙尼亞",
    name_hk: "愛沙尼亞"
  },
  {
    value: "SWZ",
    name_en: "Eswatini",
    name_ja: "スワジランド",
    name_ko: "스와질란드",
    name_cn: "斯威士兰",
    name_tw: "斯威士蘭",
    name_hk: "斯威士蘭"
  },
  {
    value: "ETH",
    name_en: "Ethiopia",
    name_ja: "エチオピア",
    name_ko: "에티오피아",
    name_cn: "埃塞俄比亚",
    name_tw: "埃塞俄比亞",
    name_hk: "埃塞俄比亞"
  },
  {
    value: "FLK",
    name_en: "Falkland Islands",
    name_ja: "フォークランド諸島",
    name_ko: "포클랜드 제도",
    name_cn: "福克兰群岛",
    name_tw: "福克蘭群島",
    name_hk: "福克蘭群島"
  },
  {
    value: "FRO",
    name_en: "Faroe Islands",
    name_ja: "フェロー諸島",
    name_ko: "페로 제도",
    name_cn: "法罗群岛",
    name_tw: "法羅群島",
    name_hk: "法羅群島"
  },
  {
    value: "FJI",
    name_en: "Fiji",
    name_ja: "フィジー",
    name_ko: "피지",
    name_cn: "斐济",
    name_tw: "斐濟",
    name_hk: "斐濟"
  },
  {
    value: "FIN",
    name_en: "Finland",
    name_ja: "フィンランド",
    name_ko: "핀란드",
    name_cn: "芬兰",
    name_tw: "芬蘭",
    name_hk: "芬蘭"
  },
  {
    value: "FRA",
    name_en: "France",
    name_ja: "フランス",
    name_ko: "프랑스",
    name_cn: "法国",
    name_tw: "法國",
    name_hk: "法國"
  },
  {
    value: "GUI",
    name_en: "French Guiana",
    name_ja: "フランス領ギアナ",
    name_ko: "프랑스 령 기아나",
    name_cn: "法属圭亚那",
    name_tw: "法屬圭亞那",
    name_hk: "法屬圭亞那"
  },
  {
    value: "PYF",
    name_en: "French Polynesia",
    name_ja: "フランス領ポリネシア",
    name_ko: "프랑스 령 폴리네시아",
    name_cn: "法属波利尼西亚",
    name_tw: "法屬波利尼西亞",
    name_hk: "法屬波利尼西亞"
  },
  {
    value: "ATF",
    name_en: "French Southern Territories",
    name_ja: "フランス南部領",
    name_ko: "프랑스 령 남부 지역",
    name_cn: "法属南部领地",
    name_tw: "法屬南部領地",
    name_hk: "法屬南部領地"
  },
  {
    value: "GAB",
    name_en: "Gabon",
    name_ja: "ガボン",
    name_ko: "가봉",
    name_cn: "加蓬",
    name_tw: "加蓬",
    name_hk: "加蓬"
  },
  {
    value: "GMB",
    name_en: "Gambia",
    name_ja: "ガンビア",
    name_ko: "감비아",
    name_cn: "冈比亚",
    name_tw: "岡比亞",
    name_hk: "岡比亞"
  },
  {
    value: "GEO",
    name_en: "Georgia",
    name_ja: "ジョージア",
    name_ko: "그루지야",
    name_cn: "格鲁吉亚",
    name_tw: "格魯吉亞",
    name_hk: "格魯吉亞"
  },
  {
    value: "DEU",
    name_en: "Germany",
    name_ja: "ドイツ",
    name_ko: "독일",
    name_cn: "德国",
    name_tw: "德國",
    name_hk: "德國"
  },
  {
    value: "GHA",
    name_en: "Ghana",
    name_ja: "ガーナ",
    name_ko: "가나",
    name_cn: "加纳",
    name_tw: "加納",
    name_hk: "加納"
  },
  {
    value: "GIB",
    name_en: "Gibraltar",
    name_ja: "ジブラルタル",
    name_ko: "지브롤터",
    name_cn: "直布罗陀",
    name_tw: "直布羅陀",
    name_hk: "直布羅陀"
  },
  {
    value: "GRC",
    name_en: "Greece",
    name_ja: "ギリシャ",
    name_ko: "그리스",
    name_cn: "希腊",
    name_tw: "希臘",
    name_hk: "希臘"
  },
  {
    value: "GRL",
    name_en: "Greenland",
    name_ja: "グリーンランド",
    name_ko: "그린란드",
    name_cn: "格陵兰",
    name_tw: "格陵蘭",
    name_hk: "格陵蘭"
  },
  {
    value: "GRD",
    name_en: "Grenada",
    name_ja: "グレナダ",
    name_ko: "그레나다",
    name_cn: "格林纳达",
    name_tw: "格林納達",
    name_hk: "格林納達"
  },
  {
    value: "GLP",
    name_en: "Guadeloupe",
    name_ja: "グアドループ",
    name_ko: "과들루프",
    name_cn: "瓜德罗普岛",
    name_tw: "瓜德羅普島",
    name_hk: "瓜德羅普島"
  },
  {
    value: "GUM",
    name_en: "Guam",
    name_ja: "グアム",
    name_ko: "괌",
    name_cn: "关岛",
    name_tw: "關島",
    name_hk: "關島"
  },
  {
    value: "GTM",
    name_en: "Guatemala",
    name_ja: "グアテマラ",
    name_ko: "과테말라",
    name_cn: "危地马拉",
    name_tw: "危地馬拉",
    name_hk: "危地馬拉"
  },
  {
    value: "GGY",
    name_en: "Guernsey",
    name_ja: "ガーンジー",
    name_ko: "건지",
    name_cn: "根西岛",
    name_tw: "根西島",
    name_hk: "根西島"
  },
  {
    value: "GIN",
    name_en: "Guinea",
    name_ja: "ギニア",
    name_ko: "기니",
    name_cn: "几内亚",
    name_tw: "幾內亞",
    name_hk: "幾內亞"
  },
  {
    value: "GIB",
    name_en: "Guinea-Bissau",
    name_ja: "ギニアビサウ",
    name_ko: "기니 비사우",
    name_cn: "几内亚比绍",
    name_tw: "幾內亞比紹",
    name_hk: "幾內亞比紹"
  },
  {
    value: "GUY",
    name_en: "Guyana",
    name_ja: "ギニアビサウ",
    name_ko: "기니 비사우",
    name_cn: "几内亚比绍",
    name_tw: "幾內亞比紹",
    name_hk: "幾內亞比紹"
  },
  {
    value: "HTI",
    name_en: "Haiti",
    name_ja: "ハイチ",
    name_ko: "아이티",
    name_cn: "海地",
    name_tw: "海地",
    name_hk: "海地"
  },
  {
    value: "HMD",
    name_en: "Heard Island and McDonald Islands",
    name_ja: "ハード島とマクドナルド諸島",
    name_ko: "허드 섬 및 맥도날드 제도",
    name_cn: "希尔德岛和麦当劳群岛",
    name_tw: "希爾德島和麥當勞群島",
    name_hk: "希爾德島和麥當勞群島"
  },
  {
    value: "VAT",
    name_en: "Holy See",
    name_ja: "神聖な参照",
    name_ko: "교황청",
    name_cn: "教廷",
    name_tw: "教廷",
    name_hk: "教廷"
  },
  {
    value: "HND",
    name_en: "Honduras",
    name_ja: "ホンジュラス",
    name_ko: "온두라스",
    name_cn: "洪都拉斯",
    name_tw: "洪都拉斯",
    name_hk: "洪都拉斯"
  },
  {
    value: "HKG",
    name_en: "香港",
    name_ja: "日本",
    name_ko: "홍콩",
    name_cn: "香港",
    name_tw: "香港",
    name_hk: "香港"
  },
  {
    value: "HUN",
    name_en: "Hungary",
    name_ja: "ハンガリー",
    name_ko: "헝가리",
    name_cn: "匈牙利",
    name_tw: "匈牙利",
    name_hk: "匈牙利"
  },
  {
    value: "ISL",
    name_en: "Iceland",
    name_ja: "アイスランド",
    name_ko: "아이슬란드",
    name_cn: "冰岛",
    name_tw: "冰島",
    name_hk: "冰島"
  },
  {
    value: "IND",
    name_en: "India",
    name_ja: "インド",
    name_ko: "인도",
    name_cn: "印度",
    name_tw: "印度",
    name_hk: "印度"
  },
  {
    value: "IDN",
    name_en: "Indonesia",
    name_ja: "インドネシア",
    name_ko: "인도네시아",
    name_cn: "印度尼西亚",
    name_tw: "印度尼西亞",
    name_hk: "印度尼西亞"
  },
  {
    value: "IRN",
    name_en: "Iran",
    name_ja: "イラン",
    name_ko: "이란",
    name_cn: "伊朗",
    name_tw: "伊朗",
    name_hk: "伊朗"
  },
  {
    value: "IRQ",
    name_en: "Iraq",
    name_ja: "イラク",
    name_ko: "이라크",
    name_cn: "伊拉克",
    name_tw: "伊拉克",
    name_hk: "伊拉克"
  },
  {
    value: "IRL",
    name_en: "Ireland",
    name_ja: "アイルランド",
    name_ko: "아일랜드",
    name_cn: "爱尔兰",
    name_tw: "愛爾蘭",
    name_hk: "愛爾蘭"
  },
  {
    value: "IMN",
    name_en: "Isle of Man",
    name_ja: "マン島",
    name_ko: "아일 오브 맨",
    name_cn: "马恩岛",
    name_tw: "馬恩島",
    name_hk: "馬恩島"
  },
  {
    value: "ISR",
    name_en: "Israel",
    name_ja: "イスラエル",
    name_ko: "이스라엘",
    name_cn: "以色列",
    name_tw: "以色列",
    name_hk: "以色列"
  },
  {
    value: "ITA",
    name_en: "Italy",
    name_ja: "イタリア",
    name_ko: "이탈리아",
    name_cn: "意大利",
    name_tw: "意大利",
    name_hk: "意大利"
  },
  {
    value: "JAM",
    name_en: "Jamaica",
    name_ja: "ジャマイカ",
    name_ko: "자메이카",
    name_cn: "牙买加",
    name_tw: "牙買加",
    name_hk: "牙買加"
  },
  {
    value: "JPN",
    name_en: "Japan",
    name_ja: "日本",
    name_ko: "일본",
    name_cn: "日本",
    name_tw: "日本",
    name_hk: "日本"
  },
  {
    value: "JEY",
    name_en: "Jersey",
    name_ja: "ジャージー",
    name_ko: "저지",
    name_cn: "泽西岛",
    name_tw: "澤西島",
    name_hk: "澤西島"
  },
  {
    value: "JOR",
    name_en: "Jordan",
    name_ja: "ヨルダン",
    name_ko: "요르단",
    name_cn: "约旦",
    name_tw: "約旦",
    name_hk: "約旦"
  },
  {
    value: "KAZ",
    name_en: "Kazakhstan",
    name_ja: "カザフスタン",
    name_ko: "카자흐스탄",
    name_cn: "哈萨克斯坦",
    name_tw: "哈薩克斯坦",
    name_hk: "哈薩克斯坦"
  },
  {
    value: "KEN",
    name_en: "Kenya",
    name_ja: "ケニア",
    name_ko: "케냐",
    name_cn: "肯尼亚",
    name_tw: "肯尼亞",
    name_hk: "肯尼亞"
  },
  {
    value: "KIR",
    name_en: "Kiribati",
    name_ja: "キリバス",
    name_ko: "키리바시",
    name_cn: "基里巴斯",
    name_tw: "基里巴斯",
    name_hk: "基里巴斯"
  },
  {
    value: "KUW",
    name_en: "Kuwait",
    name_ja: "クウェート",
    name_ko: "쿠웨이트",
    name_cn: "科威特",
    name_tw: "科威特",
    name_hk: "科威特"
  },
  {
    value: "KGZ",
    name_en: "Kyrgyzstan",
    name_ja: "キルギスタン",
    name_ko: "키르기스스탄",
    name_cn: "吉尔吉斯斯坦",
    name_tw: "吉爾吉斯斯坦",
    name_hk: "吉爾吉斯斯坦"
  },
  {
    value: "LAO",
    name_en: "Laos",
    name_ja: "ラオス",
    name_ko: "라오스",
    name_cn: "老挝",
    name_tw: "老撾",
    name_hk: "老撾"
  },
  {
    value: "LVA",
    name_en: "Latvia",
    name_ja: "ラオス",
    name_ko: "라오스",
    name_cn: "老挝",
    name_tw: "老撾",
    name_hk: "老撾"
  },
  {
    value: "LBN",
    name_en: "Lebanon",
    name_ja: "レバノン",
    name_ko: "레바논",
    name_cn: "黎巴嫩",
    name_tw: "黎巴嫩",
    name_hk: "黎巴嫩"
  },
  {
    value: "LSO",
    name_en: "Lesotho",
    name_ja: "レソト",
    name_ko: "레소토",
    name_cn: "莱索托",
    name_tw: "萊索托",
    name_hk: "萊索托"
  },
  {
    value: "LBR",
    name_en: "Liberia",
    name_ja: "リベリア",
    name_ko: "라이베리아",
    name_cn: "利比里亚",
    name_tw: "利比里亞",
    name_hk: "利比里亞"
  },
  {
    value: "LBY",
    name_en: "Libya",
    name_ja: "リビア",
    name_ko: "리비아",
    name_cn: "利比亚",
    name_tw: "利比亞",
    name_hk: "利比亞"
  },
  {
    value: "LIE",
    name_en: "Liechtenstein",
    name_ja: "リヒテンシュタイン",
    name_ko: "리히텐슈타인",
    name_cn: "列支敦士登",
    name_tw: "列支敦士登",
    name_hk: "列支敦士登"
  },
  {
    value: "LTU",
    name_en: "Lithuania",
    name_ja: "リトアニア",
    name_ko: "리투아니아",
    name_cn: "立陶宛",
    name_tw: "立陶宛",
    name_hk: "立陶宛"
  },
  {
    value: "LUX",
    name_en: "Luxembourg",
    name_ja: "ルクセンブルク",
    name_ko: "룩셈부르크",
    name_cn: "卢森堡",
    name_tw: "盧森堡",
    name_hk: "盧森堡"
  },
  {
    value: "MAC",
    name_en: "Macao",
    name_ja: "マカオ",
    name_ko: "마카오",
    name_cn: "澳门",
    name_tw: "澳門",
    name_hk: "澳門"
  },
  {
    value: "MDG",
    name_en: "Madagascar",
    name_ja: "マダガスカル",
    name_ko: "마다가스카르",
    name_cn: "马达加斯加",
    name_tw: "馬達加斯加",
    name_hk: "馬達加斯加"
  },
  {
    value: "MWI",
    name_en: "Malawi",
    name_ja: "マラウイ",
    name_ko: "말라위",
    name_cn: "马拉维",
    name_tw: "馬拉維",
    name_hk: "馬拉維"
  },
  {
    value: "MYS",
    name_en: "Malaysia",
    name_ja: "マレーシア",
    name_ko: "말레이시아",
    name_cn: "马来西亚",
    name_tw: "馬來西亞",
    name_hk: "馬來西亞"
  },
  {
    value: "MDV",
    name_en: "Maldives",
    name_ja: "モルディブ",
    name_ko: "몰디브",
    name_cn: "马尔代夫",
    name_tw: "馬爾代夫",
    name_hk: "馬爾代夫"
  },
  {
    value: "MLI",
    name_en: "Mali",
    name_ja: "マリ",
    name_ko: "말리",
    name_cn: "马里",
    name_tw: "馬里",
    name_hk: "馬里"
  },
  {
    value: "MLT",
    name_en: "Malta",
    name_ja: "マルタ",
    name_ko: "몰타",
    name_cn: "马耳他",
    name_tw: "馬耳他",
    name_hk: "馬耳他"
  },
  {
    value: "MHL",
    name_en: "Marshall Islands",
    name_ja: "マーシャル諸島",
    name_ko: "마샬 군도",
    name_cn: "马绍尔群岛",
    name_tw: "馬紹爾群島",
    name_hk: "馬紹爾群島"
  },
  {
    value: "MTQ",
    name_en: "Martinique",
    name_ja: "マルティニーク",
    name_ko: "마르티니크",
    name_cn: "马提尼克岛",
    name_tw: "馬提尼克島",
    name_hk: "馬提尼克島"
  },
  {
    value: "MRT",
    name_en: "Mauritania",
    name_ja: "モーリタニア",
    name_ko: "모리타니",
    name_cn: "毛里塔尼亚",
    name_tw: "毛里塔尼亞",
    name_hk: "毛里塔尼亞"
  },
  {
    value: "MUS",
    name_en: "Mauritius",
    name_ja: "モーリシャス",
    name_ko: "모리셔스",
    name_cn: "毛里求斯",
    name_tw: "毛里求斯",
    name_hk: "毛里求斯"
  },
  {
    value: "MYT",
    name_en: "Mayotte",
    name_ja: "マヨット",
    name_ko: "마요트",
    name_cn: "马约特岛",
    name_tw: "馬約特島",
    name_hk: "馬約特島"
  },
  {
    value: "MEX",
    name_en: "Mexico",
    name_ja: "メキシコ",
    name_ko: "멕시코",
    name_cn: "墨西哥",
    name_tw: "墨西哥",
    name_hk: "墨西哥"
  },
  {
    value: "FSM",
    name_en: "Micronesia",
    name_ja: "ミクロネシア",
    name_ko: "미크로네시아",
    name_cn: "密克罗尼西亚",
    name_tw: "密克羅尼西亞",
    name_hk: "密克羅尼西亞"
  },
  {
    value: "MDA",
    name_en: "Moldova",
    name_ja: "モルドバ",
    name_ko: "몰도바",
    name_cn: "摩尔多瓦",
    name_tw: "摩爾多瓦",
    name_hk: "摩爾多瓦"
  },
  {
    value: "MCO",
    name_en: "Monaco",
    name_ja: "モナコ",
    name_ko: "모나코",
    name_cn: "摩纳哥",
    name_tw: "摩納哥",
    name_hk: "摩納哥"
  },
  {
    value: "MNG",
    name_en: "Mongolia",
    name_ja: "モンゴル",
    name_ko: "몽골리아",
    name_cn: "蒙古",
    name_tw: "蒙古",
    name_hk: "蒙古"
  },
  {
    value: "MNE",
    name_en: "Montenegro",
    name_ja: "モンテネグロ",
    name_ko: "몬테네그로",
    name_cn: "黑山共和国",
    name_tw: "黑山共和國",
    name_hk: "黑山共和國"
  },
  {
    value: "MSR",
    name_en: "Montserrat",
    name_ja: "モントセラト",
    name_ko: "몬세라트",
    name_cn: "蒙特塞拉特",
    name_tw: "蒙特塞拉特",
    name_hk: "蒙特塞拉特"
  },
  {
    value: "MAR",
    name_en: "Morocco",
    name_ja: "モロッコ",
    name_ko: "모로코",
    name_cn: "摩洛哥",
    name_tw: "摩洛哥",
    name_hk: "摩洛哥"
  },
  {
    value: "MOZ",
    name_en: "Mozambique",
    name_ja: "モザンビーク",
    name_ko: "모잠비크",
    name_cn: "莫桑比克",
    name_tw: "莫桑比克",
    name_hk: "莫桑比克"
  },
  {
    value: "MMR",
    name_en: "Myanmar",
    name_ja: "ミャンマー",
    name_ko: "미얀마",
    name_cn: "缅甸",
    name_tw: "緬甸",
    name_hk: "緬甸"
  },
  {
    value: "NAM",
    name_en: "Namibia",
    name_ja: "ナミビア",
    name_ko: "나미비아",
    name_cn: "纳米比亚",
    name_tw: "納米比亞",
    name_hk: "納米比亞"
  },
  {
    value: "NRU",
    name_en: "Nauru",
    name_ja: "ナウル",
    name_ko: "나우루",
    name_cn: "瑙鲁",
    name_tw: "瑙魯",
    name_hk: "瑙魯"
  },
  {
    value: "NPL",
    name_en: "Nepal",
    name_ja: "ネパール",
    name_ko: "네팔",
    name_cn: "尼泊尔",
    name_tw: "尼泊爾",
    name_hk: "尼泊爾"
  },
  {
    value: "NLD",
    name_en: "Netherlands",
    name_ja: "オランダ",
    name_ko: "네덜란드",
    name_cn: "荷兰",
    name_tw: "荷蘭",
    name_hk: "荷蘭"
  },
  {
    value: "NCL",
    name_en: "New Caledonia",
    name_ja: "ニューカレドニア",
    name_ko: "뉴 칼레도니아",
    name_cn: "新喀里多尼亚",
    name_tw: "新喀裡多尼亞",
    name_hk: "新喀裡多尼亞"
  },
  {
    value: "NIC",
    name_en: "Nicaragua",
    name_ja: "ニカラグア",
    name_ko: "뉴 칼레도니아",
    name_cn: "新喀里多尼亚",
    name_tw: "新喀裡多尼亞",
    name_hk: "新喀裡多尼亞"
  },
  {
    value: "NER",
    name_en: "Niger",
    name_ja: "ニジェール",
    name_ko: "니제르",
    name_cn: "尼日尔",
    name_tw: "尼日爾",
    name_hk: "尼日爾"
  },
  {
    value: "NGA",
    name_en: "Nigeria",
    name_ja: "ナイジェリア",
    name_ko: "나이지리아",
    name_cn: "奈及利亚",
    name_tw: "奈及利亞",
    name_hk: "奈及利亞"
  },
  {
    value: "NIU",
    name_en: "Niue",
    name_ja: "ニウエ",
    name_ko: "니우에",
    name_cn: "纽埃",
    name_tw: "紐埃",
    name_hk: "紐埃"
  },
  {
    value: "NFK",
    name_en: "Norfolk Islands",
    name_ja: "ノーフォーク諸島",
    name_ko: "노퍽 제도",
    name_cn: "诺福克群岛",
    name_tw: "諾福克群島",
    name_hk: "諾福克群島"
  },
  {
    value: "MNP",
    name_en: "Northern Mariana Islands",
    name_ja: "北マリアナ諸島",
    name_ko: "북 마리아나 제도",
    name_cn: "北马里亚纳群岛",
    name_tw: "北馬里亞納群島",
    name_hk: "北馬里亞納群島"
  },
  {
    value: "PRK",
    name_en: "North Korea",
    name_ja: "北朝鮮",
    name_ko: "조선",
    name_cn: "朝鲜",
    name_tw: "朝鮮",
    name_hk: "朝鮮"
  },
  {
    value: "NOR",
    name_en: "Norway",
    name_ja: "ノルウェー",
    name_ko: "노르웨이",
    name_cn: "挪威",
    name_tw: "挪威",
    name_hk: "挪威"
  },
  {
    value: "OMN",
    name_en: "Oman",
    name_ja: "オマーン",
    name_ko: "오만",
    name_cn: "阿曼",
    name_tw: "阿曼",
    name_hk: "阿曼"
  },
  {
    value: "PAK",
    name_en: "Pakistan",
    name_ja: "パキスタン",
    name_ko: "파키스탄",
    name_cn: "巴基斯坦",
    name_tw: "巴基斯坦",
    name_hk: "巴基斯坦"
  },
  {
    value: "PLW",
    name_en: "Palau",
    name_ja: "パラオ",
    name_ko: "팔라우",
    name_cn: "帛琉",
    name_tw: "帛琉",
    name_hk: "帛琉"
  },
  {
    value: "PSE",
    name_en: "Palestine",
    name_ja: "パレスチナ",
    name_ko: "팔레스타인",
    name_cn: "巴勒斯坦",
    name_tw: "巴勒斯坦",
    name_hk: "巴勒斯坦"
  },
  {
    value: "PAN",
    name_en: "Panama",
    name_ja: "パナマ",
    name_ko: "파나마",
    name_cn: "巴拿马",
    name_tw: "巴拿馬",
    name_hk: "巴拿馬"
  },
  {
    value: "PNG",
    name_en: "Papua New Guinea",
    name_ja: "パプアニューギニア",
    name_ko: "파푸아 뉴기니",
    name_cn: "巴布亚新几内亚",
    name_tw: "巴布亞新幾內亞",
    name_hk: "巴布亞新幾內亞"
  },
  {
    value: "PRY",
    name_en: "Paraguay",
    name_ja: "パラグアイ",
    name_ko: "파라과이",
    name_cn: "巴拉圭",
    name_tw: "巴拉圭",
    name_hk: "巴拉圭"
  },
  {
    value: "PER",
    name_en: "Peru",
    name_ja: "ペルー",
    name_ko: "페루",
    name_cn: "秘鲁",
    name_tw: "秘魯",
    name_hk: "秘魯"
  },
  {
    value: "PHL",
    name_en: "Philippines",
    name_ja: "フィリピン",
    name_ko: "필리핀",
    name_cn: "菲律宾",
    name_tw: "菲律賓",
    name_hk: "菲律賓"
  },
  {
    value: "PCN",
    name_en: "Pitcairn",
    name_ja: "ピトケアン",
    name_ko: "핏케언",
    name_cn: "皮特凯恩",
    name_tw: "皮特凱恩",
    name_hk: "皮特凱恩"
  },
  {
    value: "POL",
    name_en: "Poland",
    name_ja: "ポーランド",
    name_ko: "폴란드",
    name_cn: "波兰",
    name_tw: "波蘭",
    name_hk: "波蘭"
  },
  {
    value: "PRT",
    name_en: "Portugal",
    name_ja: "ポルトガル",
    name_ko: "포르투갈",
    name_cn: "葡萄牙",
    name_tw: "葡萄牙",
    name_hk: "葡萄牙"
  },
  {
    value: "PRI",
    name_en: "Puerto Rico",
    name_ja: "プエルトリコ",
    name_ko: "푸에르토 리코",
    name_cn: "波多黎各",
    name_tw: "波多黎各",
    name_hk: "波多黎各"
  },
  {
    value: "QAT",
    name_en: "Qatar",
    name_ja: "カタール",
    name_ko: "카타르",
    name_cn: "卡塔尔",
    name_tw: "卡塔爾",
    name_hk: "卡塔爾"
  },
  {
    value: "MKD",
    name_en: "Republic of North Macedonia",
    name_ja: "北マケドニア共和国",
    name_ko: "북 마케도니아 공화국",
    name_cn: "北马其顿共和国",
    name_tw: "北馬其頓共和國",
    name_hk: "北馬其頓共和國"
  },
  {
    value: "ROU",
    name_en: "Romania",
    name_ja: "ルーマニア",
    name_ko: "루마니아",
    name_cn: "罗马尼亚",
    name_tw: "羅馬尼亞",
    name_hk: "羅馬尼亞"
  },
  {
    value: "RUS",
    name_en: "Russia",
    name_ja: "ロシア",
    name_ko: "러시아",
    name_cn: "俄国",
    name_tw: "俄國",
    name_hk: "俄國"
  },
  {
    value: "RWA",
    name_en: "Rwanda",
    name_ja: "ルワンダ",
    name_ko: "르완다",
    name_cn: "卢旺达",
    name_tw: "盧旺達",
    name_hk: "盧旺達"
  },
  {
    value: "REU",
    name_en: "Réunion",
    name_ja: "レユニオン",
    name_ko: "레위니옹",
    name_cn: "留尼汪",
    name_tw: "留尼汪",
    name_hk: "留尼汪"
  },
  {
    value: "BLM",
    name_en: "Saint Barthélemy",
    name_ja: "サンバルテルミー",
    name_ko: "생 바르텔레미",
    name_cn: "圣巴塞洛缪",
    name_tw: "聖巴托洛繆",
    name_hk: "聖巴托洛繆"
  },
  {
    value: "SHN",
    name_en: "Saint Helena, Ascension and Tristan da Cunha",
    name_ja: "セントヘレナ、アセンションおよびトリスタンダクーニャ",
    name_ko: "세인트 헬레나 어센션 트리스탄 다 쿠냐",
    name_cn: "圣海伦娜，提升和特里斯坦·达库尼亚",
    name_tw: "聖海倫娜，提升和特里斯坦·達庫尼亞",
    name_hk: "聖海倫娜，提升和特里斯坦·達庫尼亞"
  },
  {
    value: "KNA",
    name_en: "Saint Kitts and Nevis",
    name_ja: "セントクリストファー・ネイビス",
    name_ko: "세인트 키츠 네비스",
    name_cn: "圣基茨和尼维斯",
    name_tw: "聖基茨和尼維斯",
    name_hk: "聖基茨和尼維斯"
  },
  {
    value: "LCA",
    name_en: "Saint Lucia",
    name_ja: "セントルシア",
    name_ko: "세인트 루시아",
    name_cn: "圣卢西亚",
    name_tw: "聖盧西亞",
    name_hk: "聖盧西亞"
  },
  {
    value: "MAF",
    name_en: "Saint Martin",
    name_ja: "セントマーティン",
    name_ko: "세인트 마틴",
    name_cn: "圣马丁",
    name_tw: "聖馬丁",
    name_hk: "聖馬丁"
  },
  {
    value: "SPM",
    name_en: "Saint Pierre and Miquelon",
    name_ja: "サンピエール・ミクロン",
    name_ko: "생 피에르 미클롱",
    name_cn: "圣皮埃尔和密克隆群岛",
    name_tw: "聖皮埃爾和密克隆群島",
    name_hk: "聖皮埃爾和密克隆群島"
  },
  {
    value: "VCT",
    name_en: "Saint Vincent and the Grenadines",
    name_ja: "セントビンセントおよびグレナディーン諸島",
    name_ko: "세인트 빈센트 그레나딘",
    name_cn: "圣文森特和格林纳丁斯",
    name_tw: "聖文森特和格林納丁斯",
    name_hk: "聖文森特和格林納丁斯"
  },
  {
    value: "WSM",
    name_en: "Samoa",
    name_ja: "サモア",
    name_ko: "사모아",
    name_cn: "萨摩亚",
    name_tw: "薩摩亞",
    name_hk: "薩摩亞"
  },
  {
    value: "SMR",
    name_en: "San Marino",
    name_ja: "サンマリノ",
    name_ko: "산 마리노",
    name_cn: "圣马力诺",
    name_tw: "聖馬力諾",
    name_hk: "聖馬力諾"
  },
  {
    value: "STP",
    name_en: "Sao Tome and Principe",
    name_ja: "サントメプリンシペ",
    name_ko: "상투메 프린시페",
    name_cn: "圣多美和普林西比",
    name_tw: "聖多美和普林西比",
    name_hk: "聖多美和普林西比"
  },
  {
    value: "SAU",
    name_en: "Saudi Arabia",
    name_ja: "サウジアラビア",
    name_ko: "사우디 아라비아",
    name_cn: "沙特阿拉伯",
    name_tw: "沙特阿拉伯",
    name_hk: "沙特阿拉伯"
  },
  {
    value: "SEN",
    name_en: "Senegal",
    name_ja: "セネガル",
    name_ko: "세네갈",
    name_cn: "塞内加尔",
    name_tw: "塞內加爾",
    name_hk: "塞內加爾"
  },
  {
    value: "SRB",
    name_en: "Serbia",
    name_ja: "セルビア",
    name_ko: "세르비아",
    name_cn: "塞尔维亚",
    name_tw: "塞爾維亞",
    name_hk: "塞爾維亞"
  },
  {
    value: "SYC",
    name_en: "Seychelles",
    name_ja: "セイシェル",
    name_ko: "세이셸",
    name_cn: "塞舌尔",
    name_tw: "塞舌爾",
    name_hk: "塞舌爾"
  },
  {
    value: "SLE",
    name_en: "Sierra Leone",
    name_ja: "シエラレオネ",
    name_ko: "시에라 리온",
    name_cn: "塞拉利昂",
    name_tw: "塞拉利昂",
    name_hk: "塞拉利昂"
  },
  {
    value: "SGP",
    name_en: "Singapore",
    name_ja: "シンガポール",
    name_ko: "싱가포르",
    name_cn: "新加坡",
    name_tw: "新加坡",
    name_hk: "新加坡"
  },
  {
    value: "SXM",
    name_en: "Sint Maarten",
    name_ja: "シント・マールテン",
    name_ko: "신트 마르턴",
    name_cn: "荷属圣马丁",
    name_tw: "荷屬聖馬丁",
    name_hk: "荷屬聖馬丁"
  },
  {
    value: "SVK",
    name_en: "Slovakia",
    name_ja: "スロバキア",
    name_ko: "슬로바키아",
    name_cn: "斯洛伐克",
    name_tw: "斯洛伐克",
    name_hk: "斯洛伐克"
  },
  {
    value: "SVN",
    name_en: "Slovenia",
    name_ja: "スロベニア",
    name_ko: "슬로베니아",
    name_cn: "斯洛文尼亚",
    name_tw: "斯洛文尼亞",
    name_hk: "斯洛文尼亞"
  },
  {
    value: "SLB",
    name_en: "Solomon Islands",
    name_ja: "ソロモン諸島",
    name_ko: "솔로몬 제도",
    name_cn: "所罗门群岛",
    name_tw: "所羅門群島",
    name_hk: "所羅門群島"
  },
  {
    value: "SOM",
    name_en: "Somalia",
    name_ja: "ソマリア",
    name_ko: "소말리아",
    name_cn: "索马里",
    name_tw: "索馬里",
    name_hk: "索馬里"
  },
  {
    value: "ZAF",
    name_en: "South Africa",
    name_ja: "南アフリカ",
    name_ko: "남아프리카",
    name_cn: "南非",
    name_tw: "南非",
    name_hk: "南非"
  },
  {
    value: "SGS",
    name_en: "South Georgia and the Sandwich Islands",
    name_ja: "サウスジョージアとサンドイッチ諸島",
    name_ko: "사우스 조지아 및 샌드위치 제도",
    name_cn: "南乔治亚岛和桑威奇群岛",
    name_tw: "南喬治亞島和桑威奇群島",
    name_hk: "南喬治亞島和桑威奇群島"
  },
  {
    value: "KOR",
    name_en: "South Korea",
    name_ja: "韓国",
    name_ko: "한국",
    name_cn: "韩国",
    name_tw: "韩国",
    name_hk: "韩国"
  },
  {
    value: "SSD",
    name_en: "South Sudan",
    name_ja: "南スーダン",
    name_ko: "남 수단",
    name_cn: "南苏丹",
    name_tw: "南蘇丹",
    name_hk: "南蘇丹"
  },
  {
    value: "ESP",
    name_en: "Spain",
    name_ja: "スペイン",
    name_ko: "스페인",
    name_cn: "西班牙",
    name_tw: "西班牙",
    name_hk: "西班牙"
  },
  {
    value: "LKA",
    name_en: "Sri Lanka",
    name_ja: "スリランカ",
    name_ko: "스리랑카",
    name_cn: "斯里兰卡",
    name_tw: "斯里蘭卡",
    name_hk: "斯里蘭卡"
  },
  {
    value: "SDN",
    name_en: "Sudan",
    name_ja: "スーダン",
    name_ko: "수단",
    name_cn: "苏丹",
    name_tw: "蘇丹",
    name_hk: "蘇丹"
  },
  {
    value: "SUR",
    name_en: "Suriname",
    name_ja: "スリナム",
    name_ko: "수리남",
    name_cn: "苏里南",
    name_tw: "蘇里南",
    name_hk: "蘇里南"
  },
  {
    value: "SJM",
    name_en: "Svalbard and Jan Mayen",
    name_ja: "スバールバル諸島とヤンマイエン島",
    name_ko: "스발바르 얀 마옌",
    name_cn: "斯瓦尔巴和扬·马延",
    name_tw: "斯瓦爾巴和揚·馬延",
    name_hk: "斯瓦爾巴和揚·馬延"
  },
  {
    value: "SWE",
    name_en: "Sweden",
    name_ja: "スウェーデン",
    name_ko: "스웨덴",
    name_cn: "瑞典",
    name_tw: "瑞典",
    name_hk: "瑞典"
  },
  {
    value: "CHE",
    name_en: "Switzerland",
    name_ja: "スイス",
    name_ko: "스위스",
    name_cn: "瑞士",
    name_tw: "瑞士",
    name_hk: "瑞士"
  },
  {
    value: "SYR",
    name_en: "Syria",
    name_ja: "シリア",
    name_ko: "시리아",
    name_cn: "叙利亚",
    name_tw: "敘利亞",
    name_hk: "敘利亞"
  },
  {
    value: "TWN",
    name_en: "Taiwan",
    name_ja: "台湾",
    name_ko: "대만",
    name_cn: "台湾",
    name_tw: "台灣",
    name_hk: "台灣"
  },
  {
    value: "TJK",
    name_en: "Tajikistan",
    name_ja: "タジキスタン",
    name_ko: "타지키스탄",
    name_cn: "塔吉克斯坦",
    name_tw: "塔吉克斯坦",
    name_hk: "塔吉克斯坦"
  },
  {
    value: "TZA",
    name_en: "Tanzania",
    name_ja: "タンザニア",
    name_ko: "탄자니아",
    name_cn: "坦桑尼亚",
    name_tw: "坦桑尼亞",
    name_hk: "坦桑尼亞"
  },
  {
    value: "THA",
    name_en: "Thailand",
    name_ja: "タイ",
    name_ko: "태국",
    name_cn: "泰国",
    name_tw: "泰國",
    name_hk: "泰國"
  },
  {
    value: "TLS",
    name_en: "Timor-Leste",
    name_ja: "東ティモール",
    name_ko: "동 티모르",
    name_cn: "东帝汶",
    name_tw: "東帝汶",
    name_hk: "東帝汶"
  },
  {
    value: "TGO",
    name_en: "Togo",
    name_ja: "トーゴ",
    name_ko: "토고",
    name_cn: "多哥",
    name_tw: "多哥",
    name_hk: "多哥"
  },
  {
    value: "TKL",
    name_en: "Tokelau",
    name_ja: "トケラウ",
    name_ko: "토켈라우",
    name_cn: "托克劳",
    name_tw: "托克勞",
    name_hk: "托克勞"
  },
  {
    value: "TON",
    name_en: "Tonga",
    name_ja: "トンガ",
    name_ko: "통가",
    name_cn: "汤加",
    name_tw: "湯加",
    name_hk: "湯加"
  },
  {
    value: "TTO",
    name_en: "Trinidad and Tobago",
    name_ja: "トリニダード・トバゴ",
    name_ko: "트리니다드 토바고",
    name_cn: "特立尼达和多巴哥",
    name_tw: "特立尼達和多巴哥",
    name_hk: "特立尼達和多巴哥"
  },
  {
    value: "TUN",
    name_en: "Tunisia",
    name_ja: "チュニジア",
    name_ko: "튀니지",
    name_cn: "突尼斯",
    name_tw: "突尼斯",
    name_hk: "突尼斯"
  },
  {
    value: "TUR",
    name_en: "Turkey",
    name_ja: "トルコ",
    name_ko: "터키",
    name_cn: "土耳其",
    name_tw: "土耳其",
    name_hk: "土耳其"
  },
  {
    value: "TKM",
    name_en: "Turkmenistan",
    name_ja: "トルクメニスタン",
    name_ko: "투르크메니스탄",
    name_cn: "土库曼斯坦",
    name_tw: "土庫曼斯坦",
    name_hk: "土庫曼斯坦"
  },
  {
    value: "TCA",
    name_en: "Turks and Caicos Islands",
    name_ja: "タークスカイコス諸島",
    name_ko: "터크스 케이커스 제도",
    name_cn: "特克斯和凯科斯群岛",
    name_tw: "特克斯和凱科斯群島",
    name_hk: "特克斯和凱科斯群島"
  },
  {
    value: "TUV",
    name_en: "Tuvalu",
    name_ja: "ツバル",
    name_ko: "투발루",
    name_cn: "图瓦卢",
    name_tw: "圖瓦盧",
    name_hk: "圖瓦盧"
  },
  {
    value: "UGA",
    name_en: "Uganda",
    name_ja: "ウガンダ",
    name_ko: "우간다",
    name_cn: "乌干达",
    name_tw: "烏干達",
    name_hk: "烏干達"
  },
  {
    value: "UKR",
    name_en: "Ukraine",
    name_ja: "ウクライナ",
    name_ko: "우크라이나",
    name_cn: "乌克兰",
    name_tw: "烏克蘭",
    name_hk: "烏克蘭"
  },
  {
    value: "ARE",
    name_en: "United Arab Emirates",
    name_ja: "アラブ首長国連邦",
    name_ko: "아랍 에미리트",
    name_cn: "阿拉伯联合酋长国",
    name_tw: "阿拉伯聯合酋長國",
    name_hk: "阿拉伯聯合酋長國"
  },
  {
    value: "GBR",
    name_en: "United Kingdom",
    name_ja: "イギリス",
    name_ko: "영국",
    name_cn: "英国",
    name_tw: "英國",
    name_hk: "英國"
  },
  {
    value: "UMI",
    name_en: "United States Minor Outlying Islands",
    name_ja: "アメリカ合衆国の小離島",
    name_ko: "미국령 군소 제도",
    name_cn: "美国本土外小岛屿",
    name_tw: "美國本土外小島嶼",
    name_hk: "美國本土外小島嶼"
  },
  {
    value: "USA",
    name_en: "United States of America",
    name_ja: "アメリカ",
    name_ko: "미국",
    name_cn: "美国",
    name_tw: "美國",
    name_hk: "美國"
  },
  {
    value: "URY",
    name_en: "Uruguay",
    name_ja: "ウルグアイ",
    name_ko: "우루과이",
    name_cn: "乌拉圭",
    name_tw: "烏拉圭",
    name_hk: "烏拉圭"
  },
  {
    value: "UZB",
    name_en: "Uzbekistan",
    name_ja: "ウズベキスタン",
    name_ko: "우즈베키스탄",
    name_cn: "乌兹别克斯坦",
    name_tw: "烏茲別克斯坦",
    name_hk: "烏茲別克斯坦"
  },
  {
    value: "VUT",
    name_en: "Vanuatu",
    name_ja: "バヌアツ",
    name_ko: "바누아투",
    name_cn: "瓦努阿图",
    name_tw: "瓦努阿圖",
    name_hk: "瓦努阿圖"
  },
  {
    value: "VEN",
    name_en: "Venezuela",
    name_ja: "ベネズエラ",
    name_ko: "베네수엘라",
    name_cn: "委内瑞拉",
    name_tw: "委內瑞拉",
    name_hk: "委內瑞拉"
  },
  {
    value: "VNM",
    name_en: "Vietnam",
    name_ja: "ベトナム",
    name_ko: "베트남",
    name_cn: "越南",
    name_tw: "越南",
    name_hk: "越南"
  },
  {
    value: "VGB",
    name_en: "Virgin Islands (UK)",
    name_ja: "バージン諸島（英国）",
    name_ko: "버진 아일랜드 (영국)",
    name_cn: "维尔京群岛（英国）",
    name_tw: "維爾京群島（英國）",
    name_hk: "維爾京群島（英國）"
  },
  {
    value: "VIR",
    name_en: "Virgin Islands (USA)",
    name_ja: "バージン諸島（米国）",
    name_ko: "버진 아일랜드 (미국)",
    name_cn: "维尔京群岛（美国）",
    name_tw: "維爾京群島（美國）",
    name_hk: "維爾京群島（美國）"
  },
  {
    value: "WLF",
    name_en: "Wallis and Futuna",
    name_ja: "ウォリスとフツナ",
    name_ko: "월리스 푸투나",
    name_cn: "瓦利斯和富图纳群岛",
    name_tw: "瓦利斯和富圖納群島",
    name_hk: "瓦利斯和富圖納群島"
  },
  {
    value: "ESH",
    name_en: "Western Sahara",
    name_ja: "西サハラ",
    name_ko: "서부 사하라",
    name_cn: "撒哈拉沙漠西部",
    name_tw: "撒哈拉沙漠西部",
    name_hk: "撒哈拉沙漠西部"
  },
  {
    value: "YEM",
    name_en: "Yemen",
    name_ja: "イエメン",
    name_ko: "예멘",
    name_cn: "也门",
    name_tw: "也門",
    name_hk: "也門"
  },
  {
    value: "ZMB",
    name_en: "Zambia",
    name_ja: "ザンビア",
    name_ko: "잠비아",
    name_cn: "赞比亚",
    name_tw: "贊比亞",
    name_hk: "贊比亞"
  },
  {
    value: "ZWE",
    name_en: "Zimbabwe",
    name_ja: "ジンバブエ",
    name_ko: "짐바브웨",
    name_cn: "津巴布韦",
    name_tw: "津巴布韋",
    name_hk: "津巴布韋"
  },
  {
    value: "ALA",
    name_en: "Åland Islands",
    name_ja: "オーランド諸島",
    name_ko: "올란드 제도",
    name_cn: "奥兰群岛",
    name_tw: "奧蘭群島",
    name_hk: "奧蘭群島"
  }
];

export default countries;
