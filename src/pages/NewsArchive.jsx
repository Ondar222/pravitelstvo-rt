import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Select, Card, Space } from "antd";

export default function NewsArchive() {
  const { news } = useData();
  const [category, setCategory] = React.useState("Все");
  const [month, setMonth] = React.useState("Все");
  const [selected, setSelected] = React.useState(() => {
    const h = window.location.hash;
    const id = new URLSearchParams(h.split("?")[1]).get("id");
    return id || null;
  });
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const id = new URLSearchParams(h.split("?")[1]).get("id");
      setSelected(id || null);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

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

  if (selected) {
    const item = news.find((n) => n.id === selected);
    if (!item) return null;
    return (
      <section className="section">
        <div className="container">
          <a className="btn" href="#/news" style={{ marginBottom: 12 }}>
            ← К списку
          </a>
          <h1 style={{ marginBottom: 8 }}>{item.title}</h1>
          <div style={{ color: "#6b7280", marginBottom: 16 }}>
            {new Date(item.date).toLocaleDateString("ru-RU")} · {item.category}
          </div>
          <div className="card" style={{ padding: 16 }}>
            <p>{item.excerpt}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Архив новостей</h1>
        <Space size="middle" style={{ margin: "12px 0 20px" }} wrap>
          <Select
            value={category}
            onChange={setCategory}
            options={categories.map((c) => ({ value: c, label: c }))}
            style={{ minWidth: 200 }}
          />
          <Select
            value={month}
            onChange={setMonth}
            options={months.map((m) => ({ value: m, label: m }))}
            style={{ minWidth: 200 }}
          />
        </Space>
        <div className="grid">
          {filtered.map((n) => (
            <Card
              key={n.id}
              title={n.title}
              extra={new Date(n.date).toLocaleDateString("ru-RU")}
            >
              <div style={{ color: "#6b7280", marginBottom: 6 }}>
                {n.category}
              </div>
              <p>{n.excerpt}</p>
              <a className="link" href={`#/news?id=${n.id}`}>
                Читать полностью →
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
