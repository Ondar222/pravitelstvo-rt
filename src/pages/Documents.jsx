import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Input, Select } from "antd";

export default function Documents() {
  const { documents } = useData();
  const [q, setQ] = React.useState("");
  const [cat, setCat] = React.useState("Все");
  const cats = React.useMemo(
    () => ["Все", ...Array.from(new Set(documents.map((d) => d.category)))],
    [documents]
  );
  const filtered = React.useMemo(
    () =>
      documents.filter(
        (d) =>
          (cat === "Все" || d.category === cat) &&
          (q === "" ||
            (d.title + " " + d.number + " " + d.text)
              .toLowerCase()
              .includes(q.toLowerCase()))
      ),
    [documents, cat, q]
  );

  return (
    <section className="section">
      <div className="container">
        <h1>Документы</h1>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            margin: "12px 0 20px",
          }}
        >
          <Input.Search
            placeholder="Поиск по названию, номеру, тексту"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{ minWidth: 280, maxWidth: 520 }}
          />
          <Select
            value={cat}
            onChange={setCat}
            options={cats.map((c) => ({ value: c, label: c }))}
            style={{ minWidth: 200 }}
          />
        </div>
        <div className="law-list">
          {filtered.map((d) => (
            <div key={d.id} className="law-item card">
              <div className="law-left">
                <div className="law-ico">📄</div>
                <div>
                  <div className="law-title">{d.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
