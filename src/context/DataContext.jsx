import React from "react";

const DataContext = React.createContext({
  slides: [],
  news: [],
  events: [],
  deputies: [],
  documents: [],
  achievements: [],
});
export function useData() {
  return React.useContext(DataContext);
}

async function fetchJson(path) {
  try {
    const res = await fetch(path, { cache: "no-cache" });
    if (!res.ok) throw new Error("Failed " + path);
    return await res.json();
  } catch (e) {
    console.warn("Data load error", path, e);
    return [];
  }
}

export default function DataProvider({ children }) {
  const [slides, setSlides] = React.useState([]);
  const [news, setNews] = React.useState([]);
  const [events, setEvents] = React.useState([]);
  const [deputies, setDeputies] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);

  React.useEffect(() => {
    fetchJson("/data/slides.json").then(setSlides);
    fetchJson("/data/news.json").then(setNews);
    fetchJson("/data/events.json").then(setEvents);
    fetchJson("/data/deputies.json").then(setDeputies);
    fetchJson("/data/documents.json").then(setDocuments);
    fetchJson("/data/achievements.json").then(setAchievements);
  }, []);

  const value = React.useMemo(
    () => ({ slides, news, events, deputies, documents, achievements }),
    [slides, news, events, deputies, documents, achievements]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
