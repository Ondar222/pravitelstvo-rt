import React from "react";

export default function About() {
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
          <div className="tile">
            <h3>История</h3>
            <p>Ключевые этапы развития парламентаризма в Туве.</p>
          </div>
          <div className="tile">
            <h3>Символика</h3>
            <p>Официальные символы и регалии.</p>
          </div>
          <div className="tile">
            <h3>Видео</h3>
            <p>Сессии и мероприятия (по желанию).</p>
          </div>
        </div>
      </div>
    </section>
  );
}
