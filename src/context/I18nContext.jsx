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
  const [lang, setLang] = React.useState("ru");
  const t = React.useCallback(
    (key) => (dict[lang] && dict[lang][key]) || key,
    [lang]
  );
  const value = React.useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
