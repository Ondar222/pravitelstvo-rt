import React from "react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="cols">
          <div>
            <div className="brand" style={{ color: "#fff" }}>
              <div
                className="logo"
                style={{ borderColor: "#fff", color: "#fff" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_arms_of_Tuva.svg"
                  alt=""
                  width={30}
                  height={30}
                />
              </div>
              <div>
                <div style={{ fontSize: 14, lineHeight: 1, opacity: 0.8 }}>
                  ВЕРХОВНЫЙ ХУРАЛ
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.1, fontWeight: 800 }}>
                  РЕСПУБЛИКИ ТЫВА
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16, color: "#cbd5e1" }}>
              © 2002—2025 Правительство Нижегородской области
            </div>
          </div>

          <div>
            <strong>О регионе</strong>
            <a href="#">Правительство</a>
            <a href="#">Обратная связь</a>
            <a href="#">Карта сайта</a>
          </div>
          <div>
            <strong>Новости</strong>
            <a href="#">Актуальные</a>
            <a href="#">Все новости</a>
          </div>
          <div>
            <strong>Документы</strong>
            <a href="#">Политика обработки ПДн</a>
            <a href="#">Лицензия</a>
          </div>
          <div>
            <strong>Соцсети</strong>
            <a href="#">ВКонтакте</a>
            <a href="#">Одноклассники</a>
            <a href="#">RuTube</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
