import React from "react";
import { useData } from "../context/DataContext.jsx";
import { Modal } from "antd";

function getMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const start = new Date(first);
  start.setDate(1 - ((first.getDay() + 6) % 7));
  return Array.from({ length: 42 }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    return d;
  });
}

export default function CalendarWidget() {
  const { events } = useData();
  const [cursor, setCursor] = React.useState(() => {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), 1);
  });
  const y = cursor.getFullYear();
  const m = cursor.getMonth();
  const grid = getMonthGrid(y, m);
  const map = React.useMemo(() => {
    const mp = new Map();
    for (const e of events) {
      const key = e.date;
      if (!mp.has(key)) mp.set(key, []);
      mp.get(key).push(e);
    }
    return mp;
  }, [events]);

  const [selected, setSelected] = React.useState(null);

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Календарь</h2>
          <a className="link" href="#/calendar">
            Открыть в разделе →
          </a>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 8,
            background: "#fff",
            borderRadius: 16,
            boxShadow: "var(--shadow)",
            padding: 12,
          }}
        >
          {["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"].map((h) => (
            <div key={h} style={{ textAlign: "center", color: "#6b7280" }}>
              {h}
            </div>
          ))}
          {grid.map((d, i) => {
            const key = d.toISOString().slice(0, 10);
            const inMonth = d.getMonth() === m;
            const has = map.has(key);
            return (
              <button
                key={i}
                className="tile"
                style={{
                  padding: 10,
                  opacity: inMonth ? 1 : 0.4,
                  border: has ? `2px solid var(--gold)` : undefined,
                  cursor: has ? "pointer" : "default",
                }}
                onClick={() => has && setSelected(key)}
              >
                <div style={{ fontWeight: 700 }}>{d.getDate()}</div>
                {has && (
                  <div style={{ color: "#6b7280" }}>
                    {map.get(key).length} событ.
                  </div>
                )}
              </button>
            );
          })}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 12,
          }}
        >
          <button
            className="btn"
            onClick={() => setCursor(new Date(y, m - 1, 1))}
          >
            ←
          </button>
          <strong>
            {cursor.toLocaleString("ru-RU", { month: "long", year: "numeric" })}
          </strong>
          <button
            className="btn"
            onClick={() => setCursor(new Date(y, m + 1, 1))}
          >
            →
          </button>
        </div>
        <Modal
          open={!!selected}
          onCancel={() => setSelected(null)}
          footer={null}
          title={
            selected
              ? `События ${new Date(selected).toLocaleDateString("ru-RU")}`
              : ""
          }
        >
          <div className="grid">
            {(selected ? map.get(selected) || [] : []).map((e) => (
              <div key={e.id} className="tile">
                <div style={{ fontWeight: 700 }}>{e.title}</div>
                <div style={{ color: "#6b7280" }}>
                  {e.time} · {e.place}
                </div>
                <p>{e.desc}</p>
              </div>
            ))}
          </div>
        </Modal>
      </div>
    </section>
  );
}
