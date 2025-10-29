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

  const getImage = (i) => {
    const imgs = [
      "/img/news1.jpeg",
      "/img/news2.jpeg",
      "/img/news3.jpeg",
      "/img/news4.jpeg",
      "/img/news5.jpeg",
    ];
    return imgs[i % imgs.length];
  };

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>
            <a
              className="link"
              href="#/news"
              style={{ textDecoration: "none" }}
            >
              Новости
            </a>
          </h2>
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
          {filtered.map((n, i) => (
            <a
              key={n.id}
              className="tile"
              href={`#/news?id=${n.id}`}
              style={{ overflow: "hidden", padding: 0 }}
            >
              <div style={{ height: 180, overflow: "hidden" }}>
                <img
                  src={getImage(i)}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#eef2ff",
                    color: "#3730a3",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {n.category}
                </div>
                <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>
                  {n.title}
                </div>
                <div style={{ color: "#6b7280", marginTop: 6 }}>
                  {new Date(n.date).toLocaleDateString("ru-RU")}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
