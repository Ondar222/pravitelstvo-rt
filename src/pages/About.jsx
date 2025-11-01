import React from "react";

function InfoModal({ open, onClose, title, content }) {
  if (!open) return null;
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
          <h3 style={{ marginTop: 0 }}>{title}</h3>
          <p>{content}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const [modal, setModal] = React.useState(null);
  const items = [
    {
      key: "history",
      title: "История",
      text: "Ключевые этапы развития парламентаризма в Туве: становление институтов власти, принятие первой Конституции и эволюция современного парламента.",
    },
    {
      key: "symbols",
      title: "Символика",
      text: "Официальные символы Верховного Хурала — герб, флаг, орденские знаки и иные регалии, используемые на торжественных заседаниях.",
    },
    {
      key: "video",
      title: "Видео",
      text: "Записи сессий и важных мероприятий. Трансляции заседаний доступны в пресс-службе и на официальных страницах в соцсетях.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h1>О Верховном Хурале (парламенте) Республики Тыва</h1>
        <p>
          Верховный Хурал — законодательный орган государственной власти
          Республики Тыва. Здесь размещаются сведения об истории, структуре,
          функциях и деятельности парламента.
        </p>
        <div className="grid cols-3">
          {items.map((it) => (
            <button
              key={it.key}
              className="tile"
              onClick={() => setModal(it)}
              style={{ textAlign: "left" }}
            >
              <h3>{it.title}</h3>
              <p>{it.text}</p>
              <span className="link">Подробнее →</span>
            </button>
          ))}
        </div>

        <InfoModal
          open={!!modal}
          onClose={() => setModal(null)}
          title={modal?.title}
          content={modal?.text}
        />
      </div>
    </section>
  );
}
