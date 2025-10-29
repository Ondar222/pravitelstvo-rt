import React from "react";
import { useData } from "../context/DataContext.jsx";

export default function NewsBlock() {
  const { news } = useData();
  const [category, setCategory] = React.useState("Все");
  const categories = React.useMemo(
    () => ["Все", ...Array.from(new Set(news.map((n) => n.category)))],
    [news]
  );
  const filtered = React.useMemo(
    () =>
      (category === "Все"
        ? news
        : news.filter((n) => n.category === category)
      ).slice(0, 5),
    [news, category]
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Новости</h2>
          <a className="link" href="#/news">
            Архив новостей →
          </a>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 16,
          }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className="btn"
              style={{ background: c === category ? "#eef2ff" : "#fff" }}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="grid cols-3">
          {filtered.map((n) => (
            <a
              key={n.id}
              className="tile"
              href={`#/news?id=${n.id}`}
              style={{ overflow: "hidden" }}
            >
              <div style={{ fontWeight: 700, fontSize: 18 }}>{n.title}</div>
              <div style={{ color: "#6b7280", marginTop: 6 }}>
                {new Date(n.date).toLocaleDateString("ru-RU")}
              </div>
              <p>{n.excerpt}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
