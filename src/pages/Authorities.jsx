import React from "react";
import { useData } from "../context/DataContext.jsx";

export default function Authorities() {
  const { authorities } = useData();
  const [selected, setSelected] = React.useState(() => {
    const h = window.location.hash;
    const id = new URLSearchParams(h.split("?")[1]).get("id");
    return id || null;
  });
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const id = new URLSearchParams(h.split("?")[1]).get("id");
      setSelected(id || null);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  if (selected) {
    const item = authorities.find((a) => a.id === selected);
    if (!item) return null;
    return (
      <section className="section">
        <div className="container">
          <a className="btn" href="#/authorities" style={{ marginBottom: 12 }}>
            ← К списку
          </a>
          <h1 style={{ marginBottom: 8 }}>{item.title}</h1>
          <div style={{ color: "#6b7280", marginBottom: 16 }}>{item.type}</div>
          <div className="card" style={{ padding: 16 }}>
            <p>{item.desc}</p>
            {item.site ? (
              <p>
                Официальный сайт:{" "}
                <a
                  className="link"
                  href={item.site}
                  target="_blank"
                  rel="noreferrer"
                >
                  {item.site}
                </a>
              </p>
            ) : null}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1>Органы власти</h1>
        <div className="grid cols-3">
          {authorities.map((a) => (
            <a key={a.id} className="tile" href={`#/authorities?id=${a.id}`}>
              <div style={{ color: "#6b7280", fontSize: 13 }}>{a.type}</div>
              <div style={{ fontWeight: 800, marginTop: 6 }}>{a.title}</div>
              <div style={{ marginTop: 8 }}>{a.desc}</div>
              <div className="link" style={{ marginTop: 10 }}>
                Подробнее →
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
