import React from "react";

export default function SectionPage() {
  const [title, setTitle] = React.useState(() => {
    const h = window.location.hash;
    const sp = new URLSearchParams(h.split("?")[1]);
    const t = sp.get("title") || "Раздел";
    try {
      return decodeURIComponent(t);
    } catch {
      return t;
    }
  });

  React.useEffect(() => {
    const onHash = () => {
      const h = window.location.hash;
      const sp = new URLSearchParams(h.split("?")[1]);
      const t = sp.get("title") || "Раздел";
      setTitle(() => {
        try {
          return decodeURIComponent(t);
        } catch {
          return t;
        }
      });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <section className="section">
      <div className="container">
        <h1>{title}</h1>
        <p>Здесь будет содержимое страницы «{title}».</p>
      </div>
    </section>
  );
}
