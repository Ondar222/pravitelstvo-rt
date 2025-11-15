import React from "react";
import PriorityModal from "./PriorityModal.jsx";
import { useI18n } from "../context/I18nContext.jsx";

const PRIORITIES = [
  {
    id: "01",
    title: "Благосостояние жителей",
    color: "#0f172a",
    image: "https://ddn24.ru/upload/kostum/ton_kur/ton_kur.jpg",
    desc: "Социальная поддержка, жилищные сертификаты многодетным семьям, механизмы помощи и социальные контракты.",
    slug: "/priority/01",
  },
  {
    id: "02",
    title: "ИТ и инновации",
    color: "#0a1f44",
    image:
      "https://habrastorage.org/getpro/habr/upload_files/6d0/70f/9c1/6d070f9c1d463bd56c194b74728cf9a2.jpg",
    desc: "Рост научно‑производственного потенциала, развитие ИТ‑сектора и подготовка кадров.",
    slug: "/priority/02",
  },
  {
    id: "03",
    title: "Технологический суверенитет",
    color: "#111827",
    image: "https://issek.hse.ru/data/2024/11/30/1925171834/3titul.png",
    desc: "Импортонезависимость, локализация производства и собственные разработки.",
    slug: "/priority/03",
  },
  {
    id: "04",
    title: "Туристическое разнообразие",
    color: "#0f766e",
    image: "/img/slider2.jpg",
    desc: "Развитие инфраструктуры, событийный и экологический туризм, новые маршруты.",
    slug: "/priority/04",
  },
  {
    id: "05",
    title: "Открытый диалог",
    color: "#1f2937",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-D4hX4U25PD6eWyRv-xKRg5wIOkX1jhIsgg&s",
    desc: "Обратная связь с гражданами, цифровые сервисы и прозрачность решений.",
    slug: "/priority/05",
  },
];

export default function Priorities() {
  const { t } = useI18n();
  const [selected, setSelected] = React.useState(null);
  const onOpen = (item) => setSelected(item);
  const onKey = (e, item) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelected(item);
    }
  };
  return (
    <section className="section">
      <div className="container">
        <div className="section-head">
          <h2>{t("priorities")}</h2>
          <a className="link" href="#">
            {t("openAllPriorities")} →
          </a>
        </div>
        <div className="priorities-list">
          {PRIORITIES.map((p) => (
            <div
              key={p.id}
              className="priority"
              role="button"
              tabIndex={0}
              onClick={() => onOpen(p)}
              onKeyDown={(e) => onKey(e, p)}
            >
              <div
                className="bg"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${
                    p.color
                  }, rgba(0,0,0,0.65)), url(${p.image || "/img/slide-2.svg"})`,
                }}
              />
              <div className="overlay" />
              <div className="content">{p.title}</div>
              <div className="badge">{p.id}</div>
            </div>
          ))}
        </div>
      </div>
      <PriorityModal
        open={!!selected}
        onClose={() => setSelected(null)}
        item={selected}
      />
    </section>
  );
}
