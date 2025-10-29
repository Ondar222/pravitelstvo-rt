import React from "react";

const LINKS = [
  "Портал государственных услуг Нижегородской области",
  "АНО Региональный центр поддержки цифровых технологий",
  "Единая платформа предоставления субсидий",
  "Оценка регулирующего воздействия",
  "Военный комиссариат Нижегородской области",
  "Финансовая грамотность. Нижегородская область",
  "Портал помощи в переезде и поиске работы",
];

export default function Resources() {
  return (
    <section className="section">
      <div className="container">
        <h2>Полезные ресурсы</h2>
        <div
          className="grid"
          style={{ gridTemplateColumns: "2fr 1fr", gap: 24 }}
        >
          <div className="grid cols-3">
            {LINKS.map((t, i) => (
              <a key={i} className="tile link" href="#" style={{ height: 120 }}>
                <span style={{ maxWidth: 260 }}>{t}</span>
                <span>→</span>
              </a>
            ))}
          </div>
          <div className="grid" style={{ gap: 24 }}>
            <a
              className="tile"
              href="#"
              style={{ overflow: "hidden", padding: 0 }}
            >
              <img
                src="/img/banner.svg"
                alt="баннер"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: 240, objectFit: "cover" }}
              />
            </a>
            <a
              className="tile"
              href="#"
              style={{ overflow: "hidden", padding: 0 }}
            >
              <img
                src="/img/banner.svg"
                alt="баннер"
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: 180, objectFit: "cover" }}
              />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
