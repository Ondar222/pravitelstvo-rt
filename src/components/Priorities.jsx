import React from "react";

const PRIORITIES = [
  {
    id: "01",
    title: "Благосостояние жителей",
    color: "#0f172a",
    desc: "Социальная поддержка, жилищные сертификаты многодетным семьям, механизмы помощи и социальные контракты.",
    slug: "/priority/01",
  },
  {
    id: "02",
    title: "ИТ и инновации",
    color: "#0a1f44",
    desc: "Рост научно‑производственного потенциала, развитие ИТ‑сектора и подготовка кадров.",
    slug: "/priority/02",
  },
  {
    id: "03",
    title: "Технологический суверенитет",
    color: "#111827",
    desc: "Импортонезависимость, локализация производства и собственные разработки.",
    slug: "/priority/03",
  },
  {
    id: "04",
    title: "Туристическое разнообразие",
    color: "#0f766e",
    desc: "Развитие инфраструктуры, событийный и экологический туризм, новые маршруты.",
    slug: "/priority/04",
  },
  {
    id: "05",
    title: "Открытый диалог",
    color: "#1f2937",
    desc: "Обратная связь с гражданами, цифровые сервисы и прозрачность решений.",
    slug: "/priority/05",
  },
];

export default function Priorities() {
  const [openId, setOpenId] = React.useState(null);
  const open = (id) => setOpenId((cur) => (cur === id ? null : id));
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Приоритеты</h2>
          <a className="link" href="#">
            Открыть все приоритеты →
          </a>
        </div>
        <div className="priorities-list">
          {PRIORITIES.map((p) => (
            <div
              key={p.id}
              className={`priority ${openId === p.id ? "open" : ""}`}
              role="button"
              tabIndex={0}
              onClick={() => open(p.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") open(p.id);
              }}
            >
              <div
                className="bg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${p.color}, rgba(0,0,0,0.85)), url(/img/slide-2.svg)`,
                }}
              />
              <div className="overlay" />
              <div className="content">{p.title}</div>
              <div className="badge">{p.id}</div>
              <div className="details">
                <p>{p.desc}</p>
                <a className="btn" href={`#${p.slug}`}>
                  Подробнее →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
