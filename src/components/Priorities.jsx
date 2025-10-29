import React from "react";

const PRIORITIES = [
  { id: "01", title: "Благосостояние жителей", color: "#0f172a" },
  { id: "02", title: "ИТ и инновации", color: "#0a1f44" },
  { id: "03", title: "Технологический суверенитет", color: "#111827" },
  { id: "04", title: "Туристическое разнообразие", color: "#0f766e" },
  { id: "05", title: "Открытый диалог", color: "#1f2937" },
];

export default function Priorities() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Приоритеты</h2>
          <a className="link" href="#">
            Открыть все приоритеты →
          </a>
        </div>
        <div className="grid">
          {PRIORITIES.map((p) => (
            <div
              key={p.id}
              className="tile"
              style={{
                background: `linear-gradient(135deg, ${p.color}, rgba(0,0,0,0.75)), url(/img/slide-2.svg) center/cover`,
                color: "#fff",
                padding: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ fontSize: 28, fontWeight: 800 }}>{p.title}</div>
                <div
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    borderRadius: 8,
                    padding: "4px 8px",
                    fontWeight: 800,
                  }}
                >
                  {p.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
