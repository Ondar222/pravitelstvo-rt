import React from "react";

const dict = {
  ru: {
    more: "Подробнее",
    news: "Новости",
    calendar: "Календарь",
    documents: "Документы",
    deputies: "Депутаты",
    appeals: "Обращения",
    search: "Поиск",
    category: "Категория",
    month: "Месяц",
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
  },
  ty: {
    more: "Оон ыңай",
    news: "Чугаалар",
    calendar: "Календарь",
    documents: "Документилер",
    deputies: "Депутаттар",
    appeals: "Кежиглелдер",
    search: "Диледир",
    category: "Категория",
    month: "Ай",
    region: "Кожуун дугайында",
    government: "Күрүне",
    authorities: "Билеелел органдар",
    docs: "Документтер",
    feedback: "Дилеглерни хүлээп алыры",
    press: "Парлалга албаны",
    activity: "Ажыл-чорудулга",
    contacts: "Харылзажыр улус",
    login: "Кирер чер",
    register: "Регистрация",
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
