import React from "react";
import { useData } from "../context/DataContext.jsx";

const ACH = [
  {
    title: "Сельское хозяйство",
    image:
      "https://agroexpert.press/wp-content/uploads/2024/05/avrora-bch-zgykibafvyq-unsplash.jpg",
  },
  {
    title: "Добывающая промышленность",
    image: "https://old.bigenc.ru/media/2016/10/27/1238808512/32647.jpg",
  },
  {
    title: "Туризм и культура",
    image: "https://s12.stc.yc.kpcdn.net/share/i/12/13110450/de-1200x675.jpg",
  },
  {
    title: "Инфраструктурные проекты",
    image:
      "https://www.ituva.ru/uploads/invest_a2f98c05-6dc5-473f-8dea-68fc54c0318a.jpg",
  },
  {
    title: "Социальная поддержка",
    image: "https://sfr.gov.ru/files/branches/tuva/2025/Tyva.png",
  },
];

export default function Achievements() {
  const { achievements } = useData();
  const list = achievements.length
    ? achievements
    : ACH.map((a, i) => ({
        id: `a${i + 1}`,
        title: a.title,
        images: [a.image],
      }));

  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Достижения региона</h2>
          <a className="link" href="#/achievements">
            Больше достопримечательностей →
          </a>
        </div>
        <div className="ach-row">
          {list.slice(0, 5).map((a) => (
            <a
              key={a.id}
              className="tile"
              href={`#/achievements?id=${a.id}`}
              style={{ overflow: "hidden", padding: 0 }}
            >
              <div style={{ height: 180, overflow: "hidden" }}>
                <img
                  src={(a.images && a.images[0]) || ""}
                  alt=""
                  loading="lazy"
                  decoding="async"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ marginTop: 2, fontSize: 18, fontWeight: 700 }}>
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
