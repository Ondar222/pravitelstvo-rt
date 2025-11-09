import React from "react";

const DataContext = React.createContext({
  slides: [],
  news: [],
  events: [],
  deputies: [],
  government: [],
  authorities: [],
  documents: [],
  achievements: [],
  committees: [],
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
  const [government, setGovernment] = React.useState([]);
  const [authorities, setAuthorities] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);
  const [committees, setCommittees] = React.useState([]);

  React.useEffect(() => {
    fetchJson("/data/slides.json").then(setSlides);
    fetchJson("/data/news.json").then(setNews);
    fetchJson("/data/events.json").then(setEvents);
    fetchJson("/data/deputies.json").then(setDeputies);
    fetchJson("/data/government.json").then(setGovernment);
    fetchJson("/data/authorities.json").then(setAuthorities);
    fetchJson("/data/documents.json").then(setDocuments);
    fetchJson("/data/achievements.json").then(setAchievements);
    fetchJson("/data/committees.json").then(setCommittees);
  }, []);

  const value = React.useMemo(
    () => ({
      slides,
      news,
      events,
      deputies,
      government,
      authorities,
      documents,
      achievements,
      committees,
    }),
    [
      slides,
      news,
      events,
      deputies,
      government,
      authorities,
      documents,
      achievements,
      committees,
    ]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
