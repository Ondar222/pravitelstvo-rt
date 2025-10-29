import React from "react";
import { useData } from "../context/DataContext.jsx";

export default function NewsArchive() {
  const { news } = useData();
  const [category, setCategory] = React.useState("Все");
  const [month, setMonth] = React.useState("Все");

  const categories = React.useMemo(
    () => ["Все", ...Array.from(new Set(news.map((n) => n.category)))],
    [news]
  );
  const months = React.useMemo(
    () => ["Все", ...Array.from(new Set(news.map((n) => n.date.slice(0, 7))))],
    [news]
  );

  const filtered = React.useMemo(
    () =>
      news.filter(
        (n) =>
          (category === "Все" || n.category === category) &&
          (month === "Все" || n.date.startsWith(month))
      ),
    [news, category, month]
  );

  return (
    <section className="section">
      <div className="container">
        <h1>Архив новостей</h1>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            margin: "12px 0 20px",
          }}
        >
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>
        <div className="grid">
          {filtered.map((n) => (
            <a key={n.id} className="tile" href={`#/news?id=${n.id}`}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>{n.title}</div>
              <div style={{ color: "#6b7280", marginTop: 6 }}>
                {new Date(n.date).toLocaleDateString("ru-RU")} · {n.category}
              </div>
              <p>{n.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
