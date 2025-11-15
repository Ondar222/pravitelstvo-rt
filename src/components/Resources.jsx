import React from "react";
import GosWidget from "./GosWidget.jsx";
import { useI18n } from "../context/I18nContext.jsx";

const LINKS = [
  "Портал государственных услуг Республики Тыва",
  "АНО Региональный центр поддержки цифровых технологий",
  "Единая платформа предоставления субсидий",
  "Оценка регулирующего воздействия",
  "Военный комиссариат Республики Тыва",
  "Финансовая грамотность. Республика Тыва",
  "Портал помощи в переезде и поиске работы",
];

export default function Resources() {
  const { t } = useI18n();
  return (
    <section className="section">
      <div className="container">
        <h2>{t("Порталы")}</h2>
        <div className="grid resources-grid" style={{ gap: 24 }}>
          <div className="grid cols-3">
            {LINKS.map((t, i) => (
              <a key={i} className="tile link" href="#" style={{ height: 120 }}>
                <span style={{ maxWidth: 260 }}>{t}</span>
                <span>→</span>
              </a>
            ))}
          </div>
          <div className="grid" style={{ gap: 24 }}>
            <GosWidget id="gos-widget-1" src="/js/gos_stub1.js" variant={1} />
            <GosWidget id="gos-widget-2" src="/js/gos_stub2.js" variant={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
