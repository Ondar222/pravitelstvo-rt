import React from "react";
import { useData } from "../context/DataContext.jsx";

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
  const { slides: dataSlides } = useData();
  const [active, setActive] = React.useState(0);

  React.useEffect(() => {
    const id = setInterval(() => {
      setActive(
        (i) =>
          (i + 1) %
          (dataSlides && dataSlides.length ? dataSlides.length : SLIDES.length)
      );
    }, 6000);
    return () => clearInterval(id);
  }, [dataSlides]);

  const slides = dataSlides && dataSlides.length ? dataSlides : SLIDES;

  return (
    <section className="hero" aria-label="Главные события">
      <div className="slides" aria-hidden>
        {slides.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === active ? "active" : ""}`}
            style={{ backgroundImage: `url(${s.image})` }}
          />
        ))}
        <div className="overlay" />
      </div>
      <div className="caption center">
        <h1 className="title center">{slides[active].title}</h1>
      </div>
      <div className="social-left" aria-hidden>
        <a
          className="sbtn sbtn--vk"
          href="https://vk.com"
          target="_blank"
          rel="noreferrer"
          aria-label="VK"
        >
          vk
        </a>
        <a
          className="sbtn sbtn--ok"
          href="https://ok.ru"
          target="_blank"
          rel="noreferrer"
          aria-label="OK"
        >
          ok
        </a>
        <a
          className="sbtn sbtn--tg"
          href="https://t.me"
          target="_blank"
          rel="noreferrer"
          aria-label="Telegram"
        >
          tg
        </a>
        <a className="sbtn sbtn--mx" href="#" aria-label="MAX">
          mx
        </a>
      </div>
      <div className="dots center">
        {slides.map((_, i) => (
          <div
            key={i}
            className={`dot ${i === active ? "active" : ""}`}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </section>
  );
}
