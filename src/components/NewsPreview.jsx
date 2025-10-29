import React from "react";

const NEWS = [
  {
    title: 'Более 60 студентов приняли участие в Дне ОЭЗ "Кулибин"',
    tag: "Образование",
    image:
      "https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: 'Выскa поборется за звание "Город молодёжи"',
    tag: "Молодёжная политика",
    image:
      "https://images.unsplash.com/photo-1517059224940-d4af9eec41e5?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "В Нижнем Новгороде прошло выездное совещание Секретаря Совбеза",
    tag: "Безопасность",
    image:
      "https://images.unsplash.com/photo-1557800636-894a64c1696f?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function NewsPreview() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>Новости</h2>
          <a className="link" href="#">
            Читать все новости →
          </a>
        </div>
        <div className="grid cols-3">
          {NEWS.map((n, i) => (
            <a
              key={i}
              className="tile"
              href="#"
              style={{ overflow: "hidden", padding: 0 }}
            >
              <div style={{ height: 180, overflow: "hidden" }}>
                <img
                  src={n.image}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <div
                  style={{
                    display: "inline-block",
                    background: "#eef2ff",
                    color: "#3730a3",
                    borderRadius: 8,
                    padding: "4px 10px",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  {n.tag}
                </div>
                <div style={{ marginTop: 10, fontSize: 18, fontWeight: 700 }}>
                  {n.title}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
