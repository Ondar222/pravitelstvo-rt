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
    more: "Ынчээр",
    news: "Чугаалар",
    calendar: "Календарь",
    documents: "Документтер",
    deputies: "Депутаттар",
    appeals: "Кежиглелдер",
    search: "Изедир",
    category: "Категориа",
    month: "Ай",
    region: "Аймак тухай",
    government: "Чөргүл",
    authorities: "Билеелел органдар",
    docs: "Документтер",
    feedback: "Кежиглелдерни алуу",
    press: "Пресс-служба",
    activity: "Иштээли",
    contacts: "Байланыш",
    login: "Кирүү",
    register: "Катталга",
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
      if (saved === "ru" || saved === "ty") return saved;
    } catch {}
    const docLang =
      typeof document !== "undefined" ? document.documentElement.lang : "";
    if (docLang === "ty" || docLang === "ru") return docLang;
    const nav =
      (typeof navigator !== "undefined" && navigator.language) || "ru";
    return nav.startsWith("ty") ? "ty" : "ru";
  });
  React.useEffect(() => {
    try {
      localStorage.setItem("site_lang", lang);
    } catch {}
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
      document.documentElement.setAttribute("data-lang", lang);
    }
  }, [lang]);
  const t = React.useCallback(
    (key) => (dict[lang] && dict[lang][key]) || key,
    [lang]
  );
  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
