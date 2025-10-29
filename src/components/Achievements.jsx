import React from "react";

const ACH = [
  {
    title:
      'Республика Тыва завоевала четыре награды федеральной премии "Социальные лидеры России"',
    image: "/img/tile.svg",
  },
  {
    title: "Республика Тыва по кибербезопасности госуправления",
    image: "/img/slide-1.svg",
  },
];

export default function Achievements() {
  return (
    <section className="section">
      <div className="container">
        <h2>Достижения региона</h2>
        <div className="achievements-grid">
          {ACH.map((a, i) => (
            <a key={i} href="#" className="tile achievement-card">
              <div className="achievement-image">
                <img src={a.image} alt="" loading="lazy" decoding="async" />
                <div className="achievement-overlay" />
                <div className="achievement-title">{a.title}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
