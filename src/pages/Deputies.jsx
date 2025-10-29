import React from "react";
import { useData } from "../context/DataContext.jsx";

export default function Deputies() {
  const { deputies } = useData();
  const [district, setDistrict] = React.useState("Все");
  const [convocation, setConvocation] = React.useState("Все");
  const [faction, setFaction] = React.useState("Все");

  const districts = React.useMemo(
    () => ["Все", ...Array.from(new Set(deputies.map((d) => d.district)))],
    [deputies]
  );
  const convocations = React.useMemo(
    () => ["Все", ...Array.from(new Set(deputies.map((d) => d.convocation)))],
    [deputies]
  );
  const factions = React.useMemo(
    () => ["Все", ...Array.from(new Set(deputies.map((d) => d.faction)))],
    [deputies]
  );

  const filtered = React.useMemo(
    () =>
      deputies.filter(
        (d) =>
          (district === "Все" || d.district === district) &&
          (convocation === "Все" || d.convocation === convocation) &&
          (faction === "Все" || d.faction === faction)
      ),
    [deputies, district, convocation, faction]
  );

  return (
    <section className="section">
      <div className="container">
        <h1>Депутаты</h1>
        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            margin: "12px 0 20px",
          }}
        >
          <select
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            {districts.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <select
            value={convocation}
            onChange={(e) => setConvocation(e.target.value)}
          >
            {convocations.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
          <select value={faction} onChange={(e) => setFaction(e.target.value)}>
            {factions.map((x) => (
              <option key={x} value={x}>
                {x}
              </option>
            ))}
          </select>
        </div>
        <div className="grid cols-3">
          {filtered.map((d) => (
            <div key={d.id} className="tile">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                }}
              >
                <h3 style={{ margin: 0 }}>{d.name}</h3>
                <span style={{ color: "#6b7280" }}>{d.convocation}</span>
              </div>
              <div style={{ color: "#6b7280" }}>
                {d.district} · {d.faction}
              </div>
              <p>Приём граждан: {d.reception}</p>
              <div style={{ display: "flex", gap: 12 }}>
                <a className="btn" href={`tel:${d.contacts.phone}`}>
                  Позвонить
                </a>
                <a className="btn" href={`mailto:${d.contacts.email}`}>
                  Написать
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
