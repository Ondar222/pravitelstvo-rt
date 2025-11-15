import React from "react";
import { useI18n } from "../context/I18nContext.jsx";

export default function Footer() {
  const { t } = useI18n();
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
                  width={42}
                  height={42}
                />
              </div>
              <div>
                <div style={{ fontSize: 14, lineHeight: 1, opacity: 0.8 }}>
                  ВЕРХОВНЫЙ ХУРАЛ <br /> (парламент)
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.1, fontWeight: 800 }}>
                  РЕСПУБЛИКИ ТЫВА
                </div>
              </div>
            </div>
            <div style={{ marginTop: 16, color: "#cbd5e1" }}>
              © 2025 Верховный Хурал РТ
            </div>
          </div>

          <div>
            <strong>{t("region")}</strong>
            <a href="#/government">{t("government")}</a>
            <a href="#/feedback">{t("feedback")}</a>
            <a href="#">Sitemap</a>
          </div>
          <div>
            <strong>{t("news")}</strong>
            <a href="#/news">{t("news")}</a>
            <a href="#/news">{t("news")}</a>
          </div>
          <div>
            <strong>{t("docs")}</strong>
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
