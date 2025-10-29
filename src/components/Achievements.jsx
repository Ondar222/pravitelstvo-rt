import React from "react";

const ACH = [
  {
    title: 'Сельское хозяйство"',
    image:
      "https://agroexpert.press/wp-content/uploads/2024/05/avrora-bch-zgykibafvyq-unsplash.jpg",
  },
  {
    title: "Республика Тыва по добывающему промышленности",
    image: "https://old.bigenc.ru/media/2016/10/27/1238808512/32647.jpg",
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
