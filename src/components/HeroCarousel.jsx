import React from "react";

const SLIDES = [
  {
    title:
      "Минцифры региона составило карту точек бесплатного Wi‑Fi в Республике Тыва",
    image: "/img/slide-1.svg",
  },
  {
    title: "Республика Тыва — регион возможностей",
    image: "/img/slider1.jpg",
  },
  {
    title: "Инновации, туризм и открытый диалог",
    image: "/img/slider2.jpg",
  },
];

export default function HeroCarousel() {
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="hero container" aria-label="Главные события">
      <div className="slides" aria-hidden>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === active ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="overlay" />
      </div>
      <div className="caption">
        <h1 className="title">{SLIDES[active].title}</h1>
      </div>
      <div className="arrows" aria-hidden>
        <button
          className="arrow"
          onClick={() =>
            setActive((active - 1 + SLIDES.length) % SLIDES.length)
          }
          aria-label="Предыдущий слайд"
        >
          ←
        </button>
        <button
          className="arrow"
          onClick={() => setActive((active + 1) % SLIDES.length)}
          aria-label="Следующий слайд"
        >
          →
        </button>
        <div className="dots">
          {SLIDES.map((_, i) => (
            <div
              key={i}
              className={`dot ${i === active ? "active" : ""}`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
