import React from "react";
import { useData } from "../context/DataContext.jsx";

function useQuery() {
  const [q, setQ] = React.useState(() => {
    const h = window.location.hash;
    return new URLSearchParams(h.split("?")[1]);
  });
  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      setQ(new URLSearchParams(h.split("?")[1]));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  return q;
}

export default function SectionPage() {
  const q = useQuery();
  const titleParam = q.get("title");
  const { committees, factions, commissions, councils } = useData();

  // Detail stub when title is provided
  if (titleParam) {
    let title = titleParam;
    try {
      title = decodeURIComponent(titleParam);
    } catch {}
    return (
      <section className="section">
        <div className="container">
          <h1>{title}</h1>
          <p>Здесь будет содержимое страницы «{title}».</p>
        </div>
      </section>
    );
  }

  // Structure diagram view (as on the picture)
  return (
    <section className="section">
      <div className="container">
        <h1>Структура Верховного Хурала (парламента) Республики Тыва</h1>
        <div className="org org--khural">
          <div className="org__row org__row--center">
            <div className="org__item org__item--blue org__item--xl">
              Председатель Верховного Хурала (парламента) Республики Тыва
            </div>
          </div>
          {/* Factions row */}
          <div className="org__row org__row--center">
            {(factions || []).map((f) => (
              <a
                key={f}
                className="org__item org__item--blue"
                href={`#/deputies?faction=${encodeURIComponent(f)}`}
              >
                Фракция
                <br />
                {f}
              </a>
            ))}
          </div>
          {/* Three column zone: committees on the left, commissions/councils on right */}
          <div className="org__row">
            <div className="org__col">
              {(committees || []).map((c) => (
                <a
                  key={c.id}
                  className="org__item org__item--green"
                  href={`#/committee?id=${encodeURIComponent(c.id)}`}
                >
                  {c.title}
                </a>
              ))}
            </div>
            <div className="org__col">
              {(commissions || []).map((t, idx) => (
                <a
                  key={idx}
                  className="org__item org__item--blue"
                  href={`#/section?title=${encodeURIComponent(t)}`}
                >
                  {t}
                </a>
              ))}
            </div>
            <div className="org__col">
              {(councils || []).map((t, idx) => (
                <a
                  key={idx}
                  className="org__item org__item--blue"
                  href={`#/section?title=${encodeURIComponent(t)}`}
                >
                  {t}
                </a>
              ))}
            </div>
          </div>
          <div className="org__row org__row--center">
            <a
              className="org__item org__item--xl org__item--green"
              href="#/apparatus"
            >
              Аппарат Верховного Хурала (парламента) Республики Тыва
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
