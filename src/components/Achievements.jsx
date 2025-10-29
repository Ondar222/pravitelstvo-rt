import React from "react";

const ACH = [
  {
    title:
      'Нижегородская область завоевала четыре награды федеральной премии "Социальные лидеры России"',
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
        <div
          className="grid cols-3"
          style={{ gridTemplateColumns: "2fr 1fr 1fr" }}
        >
          {ACH.map((a, i) => (
            <a
              key={i}
              href="#"
              className="tile"
              style={{ padding: 0, overflow: "hidden" }}
            >
              <div style={{ position: "relative", height: 280 }}>
                <img
                  src={a.image}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.0), rgba(0,0,0,0.5))",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: 20,
                    right: 20,
                    bottom: 20,
                    color: "#fff",
                    fontSize: 24,
                    fontWeight: 800,
                  }}
                >
                  {a.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
