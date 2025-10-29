import React from "react";
import { useData } from "../context/DataContext.jsx";

function AchievementModal({ open, onClose, item }) {
  if (!open || !item) return null;
  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal__close icon-btn"
          onClick={onClose}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <div className="modal__content">
          <h3 style={{ marginTop: 0 }}>{item.title}</h3>
          <div className="grid" style={{ marginTop: 10 }}>
            {(item.images || []).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                style={{ width: "100%", borderRadius: 12 }}
              />
            ))}
          </div>
          {item.desc ? <p style={{ marginTop: 12 }}>{item.desc}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  const { achievements } = useData();
  const rowRef = React.useRef(null);
  const [open, setOpen] = React.useState(null);
  const [selected, setSelected] = React.useState(() => {
    const h = window.location.hash;
    const id = new URLSearchParams(h.split("?")[1]).get("id");
    return id || null;
  });
  React.useEffect(() => {
    if (!selected) return;
    const it = achievements.find((a) => a.id === selected);
    if (it) setOpen(it);
  }, [selected, achievements]);
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const id = new URLSearchParams(h.split("?")[1]).get("id");
      setSelected(id || null);
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    let x = 0;
    const id = setInterval(() => {
      x += 2; // px per tick
      if (x > el.scrollWidth) x = 0;
      el.scrollTo({ left: x, behavior: "smooth" });
    }, 80);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1>Достопримечательности</h1>
        <div
          ref={rowRef}
          style={{
            display: "flex",
            gap: 12,
            overflowX: "auto",
            scrollSnapType: "x mandatory",
            paddingBottom: 6,
          }}
        >
          {achievements.map((a) => (
            <button
              key={a.id}
              className="tile"
              style={{
                width: 320,
                flex: "0 0 auto",
                padding: 0,
                scrollSnapAlign: "start",
                overflow: "hidden",
              }}
              onClick={() => setOpen(a)}
            >
              <div style={{ height: 180, overflow: "hidden" }}>
                <img
                  src={(a.images && a.images[0]) || ""}
                  alt=""
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 16 }}>
                <div style={{ fontWeight: 800 }}>{a.title}</div>
                {a.desc ? (
                  <div style={{ color: "#6b7280", marginTop: 6 }}>{a.desc}</div>
                ) : null}
              </div>
            </button>
          ))}
        </div>

        <AchievementModal
          open={!!open}
          onClose={() => setOpen(null)}
          item={open}
        />
      </div>
    </section>
  );
}
