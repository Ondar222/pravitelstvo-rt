import React from "react";

const dict = {
  ru: {
    home: "Главная",
    aboutVH: "О Верховном Хурале",
    structure: "Структура",
    committees: "Комитеты",
    commissions: "Комиссии",
    factions: "Депутатские фракции",
    senateRep: "Представительство в Совете Федерации",
    apparatus: "Аппарат",
    brandTop: "ВЕРХОВНЫЙ ХУРАЛ",
    brandParliament: "(парламент)",
    brandBottom: "РЕСПУБЛИКИ ТЫВА",
    more: "Подробнее",
    news: "Новости",
    calendar: "Календарь",
    calendarOpen: "Открыть в разделе",
    prevMonth: "Предыдущий месяц",
    nextMonth: "Следующий месяц",
    documents: "Документы",
    deputies: "Депутаты",
    appeals: "Обращения",
    media: "Медиа",
    sessions: "Сессии",
    legislation: "Законодательство",
    publicEvents: "Общественные мероприятия",
    workWithCitizens: "Работа с гражданами",
    allNews: "Все новости",
    hotNews: "Актуальные новости",
    search: "Поиск",
    category: "Категория",
    month: "Месяц",
    priorities: "Приоритеты",
    openAllPriorities: "Открыть все приоритеты",
    achievementsTitle: "Достижения региона",
    achievementsMore: "Больше достопримечательностей",
    region: "О регионе",
    government: "Правительство",
    authorities: "Органы власти",
    docs: "Документы",
    feedback: "Прием обращений",
    press: "Пресс‑служба",
    activity: "Деятельность",
    contacts: "Контакты",
    login: "Вход",
    register: "Регистрация",
    back: "← К списку",
    otherNews: "Другие новости",
    head: "Глава",
    deputiesAll: "Депутаты всех созывов",
    docsLaws: "Законы Республики Тыва",
    docsResolutions: "Постановления ВХ РТ",
    docsInitiatives: "Законодательные инициативы",
    docsCivic: "Инициатива гражданами",
    docsConstitution: "Поправки в Конституцию РФ",
    docsBills: "Законопроекты",
    wifiMap: "Карта WiFi",
    map: "Карта",
  },
  ty: {
    home: "Башкы",
    aboutVH: "Дээди Хурал дугайында",
    structure: "Структура",
    committees: "Комитеттер",
    commissions: "Комиссиялар",
    factions: "Депутаттык фракциялар",
    senateRep: "Федерация Советинде өкүлчүлүк",
    apparatus: "Аппарат",
    brandTop: "ДЭЭДИ ХУРАЛ",
    brandParliament: "(парламент)",
    brandBottom: "ТЫВА РЕСПУБЛИКАНЫН",
    more: "Оон ыңай",
    news: "Медээлер",
    calendar: "Календарь",
    calendarOpen: "Бөлүг-де ачыр",
    prevMonth: "Ылараа ай",
    nextMonth: "Келир ай",
    documents: "Документилер",
    deputies: "Депутаттар",
    appeals: "Кежиглелдер",
    media: "Медиа",
    sessions: "Сессиялар",
    legislation: "Канундар",
    publicEvents: "Көстүглэл‑чогаалдар",
    workWithCitizens: "Кижилер биле ажыл",
    allNews: "Бүткүл медээлер",
    hotNews: "Актуал медээлер",
    search: "Диледир",
    category: "Категория",
    month: "Ай",
    priorities: "Эң-не кол чүүлдер",
    openAllPriorities: "Бүткүл шенилдерни ачыр",
    achievementsTitle: "Регионалдыг чедиишкиннер",
    achievementsMore: "Достокчерилер азыраак",
    region: "Кожуун дугайында",
    government: "Күрүне",
    authorities: "Күрүне органнары",
    docs: "Документилер",
    feedback: "Дилеглерни хүлээп алыры",
    press: "Парлалга албаны",
    activity: "Ажыл-чорудулга",
    contacts: "Харылзажыр улус",
    login: "Кирер чер",
    register: "Регистрация",
    back: "← Хевири",
    otherNews: "Башка чугаалар",
    head: "Башкы",
    deputiesAll: "Депутаттарнын бүткүл созывтары",
    docsLaws: "Тыва Республиканын Канундары",
    docsResolutions: "ВХ РТ постановлениелери",
    docsInitiatives: "Законодательтик инициативалар",
    docsCivic: "Инициатива гражданчылары",
    docsConstitution: "РФ Конституциязынга поправкалар",
    docsBills: "Законопроекттер",
    wifiMap: "Wi‑Fi карта",
    map: "Карта",
  },
};

const I18nContext = React.createContext({
  lang: "ru",
  t: (k) => k,
  setLang: () => {},
});
export function useI18n() {
  return React.useContext(I18nContext);
}

export default function I18nProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try {
      const saved = localStorage.getItem("site_lang");
      if (saved === "ru" || saved === "ty" || saved === "tyv")
        return saved === "tyv" ? "ty" : saved;
    } catch {}
    const docLang =
      typeof document !== "undefined" ? document.documentElement.lang : "";
    if (docLang === "ty" || docLang === "ru" || docLang === "tyv")
      return docLang === "tyv" ? "ty" : docLang;
    const nav =
      (typeof navigator !== "undefined" && navigator.language) || "ru";
    return nav.startsWith("ty") ? "ty" : "ru";
  });
  React.useEffect(() => {
    try {
      localStorage.setItem("site_lang", lang === "ty" ? "tyv" : lang);
    } catch {}
    if (typeof document !== "undefined") {
      const htmlLang = lang === "ty" ? "tyv" : lang;
      document.documentElement.lang = htmlLang;
      document.documentElement.setAttribute("data-lang", htmlLang);
    }
  }, [lang]);
  const t = React.useCallback(
    (key) => (dict[lang] && dict[lang][key]) || key,
    [lang]
  );
  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
