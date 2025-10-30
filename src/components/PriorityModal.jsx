import React from "react";
import { createPortal } from "react-dom";

export default function PriorityModal({ open, onClose, item }) {
  React.useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open || !item) return null;

  return createPortal(
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
          {item.image ? (
            <div style={{ marginTop: 8, overflow: "hidden", borderRadius: 12 }}>
              <img
                src={item.image}
                alt=""
                style={{
                  width: "100%",
                  height: 220,
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          ) : null}
          {item.desc ? <p style={{ marginTop: 12 }}>{item.desc}</p> : null}
          {item.slug ? (
            <a className="btn" href={`#${item.slug}`} onClick={onClose}>
              Подробнее →
            </a>
          ) : null}
        </div>
      </div>
    </div>,
    document.body
  );
}
