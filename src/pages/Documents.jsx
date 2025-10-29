import React from "react";
import { useData } from "../context/DataContext.jsx";

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
          <input
            placeholder="Поиск по названию, номеру, тексту"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            style={{
              flex: "1 1 280px",
              padding: 10,
              borderRadius: 10,
              border: "1px solid #e5e7eb",
            }}
          />
          <select value={cat} onChange={(e) => setCat(e.target.value)}>
            {cats.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="grid">
          {filtered.map((d) => (
            <div key={d.id} className="tile">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <h3 style={{ margin: 0 }}>{d.title}</h3>
                <span style={{ color: "#6b7280" }}>{d.date}</span>
              </div>
              <div style={{ color: "#6b7280" }}>
                {d.category} · № {d.number}
              </div>
              <p>{d.text}</p>
              <div>
                <a className="btn" href="#">
                  Открыть PDF
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
