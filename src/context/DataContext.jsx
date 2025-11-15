import React from "react";
import { tryApiFetch } from "../api/client.js";

const DataContext = React.createContext({
  slides: [],
  news: [],
  events: [],
  deputies: [],
  factions: [],
  districts: [],
  convocations: [],
  commissions: [],
  councils: [],
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
  const [factions, setFactions] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [convocations, setConvocations] = React.useState([]);
  const [commissions, setCommissions] = React.useState([]);
  const [councils, setCouncils] = React.useState([]);
  const [government, setGovernment] = React.useState([]);
  const [authorities, setAuthorities] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [achievements, setAchievements] = React.useState([]);
  const [committees, setCommittees] = React.useState([]);

  React.useEffect(() => {
    fetchJson("/data/slides.json").then(setSlides);
    // Try API for news first, fallback to local JSON
    (async () => {
      const apiBase = import.meta?.env?.VITE_API_BASE_URL || "";
      if (apiBase) {
        const apiNews = await tryApiFetch("/news", { auth: false });
        if (Array.isArray(apiNews) && apiNews.length) {
          const mapped = apiNews.map((n) => ({
            id: String(n.id ?? n.slug ?? Math.random().toString(36).slice(2)),
            title: n.title || "",
            category:
              (n.category && (n.category.name || n.category.title)) ||
              "Новости",
            date: n.publishedAt || n.createdAt || new Date().toISOString(),
            excerpt: n.shortDescription || "",
            content: Array.isArray(n.content)
              ? n.content
              : n.content
              ? [n.content]
              : [],
          }));
          setNews(mapped);
        } else {
          fetchJson("/data/news.json").then(setNews);
        }
      } else {
        fetchJson("/data/news.json").then(setNews);
      }
    })();
    fetchJson("/data/events.json").then(setEvents);
    // Try API for persons first, fallback to local JSON
    (async () => {
      const apiBase = import.meta?.env?.VITE_API_BASE_URL || "";
      if (apiBase) {
        const apiPersons = await tryApiFetch("/persons", { auth: false });
        if (Array.isArray(apiPersons) && apiPersons.length) {
          const mapped = apiPersons.map((p) => ({
            id: p.id ?? p.personId ?? Math.random().toString(36).slice(2),
            name: p.fullName || p.name || "",
            district: p.electoralDistrict || p.city || "",
            faction: p.faction || p.committee || "",
            convocation: p.convocation || "",
            reception: p.receptionSchedule || "",
            photo: (p.image && (p.image.link || p.image.url)) || p.photo || "",
            contacts: {
              phone: p.phoneNumber || p.phone || "",
              email: p.email || "",
            },
          }));
          setDeputies(mapped);
        } else {
          fetchJson("/data/deputies.json").then(setDeputies);
        }
        // Fetch filters from API if available
        const [apiFactions, apiDistricts, apiConvocations, apiCategories] =
          await Promise.all([
            tryApiFetch("/persons/factions/all", { auth: false }),
            tryApiFetch("/persons/districts/all", { auth: false }),
            tryApiFetch("/persons/convocations/all", { auth: false }),
            tryApiFetch("/persons/categories/all", { auth: false }),
          ]);
        if (Array.isArray(apiFactions) && apiFactions.length)
          setFactions(apiFactions);
        if (Array.isArray(apiDistricts) && apiDistricts.length)
          setDistricts(apiDistricts);
        if (Array.isArray(apiConvocations) && apiConvocations.length)
          setConvocations(apiConvocations);
        if (Array.isArray(apiCategories) && apiCategories.length) {
          setCommittees(
            apiCategories.map((c) => ({
              id: c.id ?? c.value ?? c.name ?? String(c),
              title: c.title || c.name || String(c),
              members: [],
            }))
          );
        }
      } else {
        fetchJson("/data/deputies.json").then(setDeputies);
      }
    })();
    // Structure-derived lists
    fetchJson("/data/structure.json").then((s) => {
      if (!factions.length) setFactions(s.factions || []);
      if (!districts.length) setDistricts(s.districts || []);
      if (!convocations.length) setConvocations(s.convocations || []);
      setCommissions(s.commissions || []);
      setCouncils(s.councils || []);
    });
    fetchJson("/data/government.json").then(setGovernment);
    fetchJson("/data/authorities.json").then(setAuthorities);
    fetchJson("/data/documents.json").then(setDocuments);
    fetchJson("/data/achievements.json").then(setAchievements);
    if (!committees.length)
      fetchJson("/data/committees.json").then(setCommittees);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const value = React.useMemo(
    () => ({
      slides,
      news,
      events,
      deputies,
      factions,
      districts,
      convocations,
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
      factions,
      districts,
      convocations,
      government,
      authorities,
      documents,
      achievements,
      committees,
    ]
  );
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}
