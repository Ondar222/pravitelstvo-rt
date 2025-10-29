import React from "react";
import { useA11y } from "../context/A11yContext.jsx";
import { useI18n } from "../context/I18nContext.jsx";
import Link from "./Link.jsx";
import { useData } from "../context/DataContext.jsx";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Space } from "antd";

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null); // 'region' | 'news' | 'gov' | 'auth'
  const [mobileSection, setMobileSection] = React.useState(null);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setSheetOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const handleBurger = () => {
    if (window.innerWidth >= 960) {
      setSheetOpen(true);
    } else {
      setMobileOpen(true);
    }
  };

  const onNavOpen = React.useCallback((e) => {
    if (e && e.preventDefault) e.preventDefault();
    setSheetOpen(true);
  }, []);
  const { cycleMode } = useA11y();
  const { lang, setLang } = useI18n();

  React.useEffect(() => {
    const onHash = () => setSheetOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  React.useEffect(() => {
    const anyOpen = mobileOpen || sheetOpen;
    const prev = document.body.style.overflow;
    document.body.style.overflow = anyOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [mobileOpen, sheetOpen]);

  const { news } = useData();
  const newsCategories = React.useMemo(
    () => [
      "Актуальные новости",
      "Все новости",
      "Медиа",
      "—",
      ...Array.from(new Set(news.map((n) => n.category))),
    ],
    [news]
  );

  return (
    <>
      <header className="site-header">
        <div className="container topbar">
          <a href="#/feedback">Прием обращений</a>
          <a href="#/press">Пресс-служба</a>
          <a href="#/activity">Деятельность</a>
          <a href="#/docs">Документы</a>
          <a href="#/contacts">Контакты</a>
        </div>
        <div className="container row">
          <div className="row">
            <div className="brand">
              <a
                href="/"
                className="logo"
                aria-label="На главную"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_arms_of_Tuva.svg"
                  alt=""
                  width={42}
                  height={42}
                />
              </a>
              <div className="brand-text">
                <a href="/" style={{ textDecoration: "none" }}>
                  <div
                    style={{ fontSize: 18, lineHeight: 1, color: "#6b7280" }}
                  >
                    ВЕРХОВНЫЙ ХУРАЛ
                  </div>
                  <div
                    style={{ fontSize: 22, lineHeight: 1.1, fontWeight: 800 }}
                  >
                    РЕСПУБЛИКИ ТЫВА
                  </div>
                </a>
              </div>
            </div>
          </div>

          <nav className="main-nav" onMouseLeave={() => setOpenMenu(null)}>
            <div
              className={`dropdown ${openMenu === "region" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("region")}
            >
              <Link to="/about">О регионе ▾</Link>
              <div className="dropdown__menu">
                <a href="#/region">Республика Тыва</a>
                <a href="#/region">Карта области</a>
                <a href="#/region">Летопись</a>
                <a href="#/priority/01">Приоритеты</a>
                <a href="#/achievements">Достопримечательности</a>
                <a href="#/region">Официальные символы</a>
              </div>
            </div>
            <div
              className={`dropdown ${openMenu === "news" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("news")}
            >
              <Link to="/news">Новости ▾</Link>
              <div className="dropdown__menu">
                {newsCategories.map((c, i) =>
                  c === "—" ? (
                    <hr key={`hr-${i}`} />
                  ) : (
                    <a key={c} href="#/news">
                      {c}
                    </a>
                  )
                )}
              </div>
            </div>
            <div
              className={`dropdown ${openMenu === "gov" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("gov")}
            >
              <Link to="/government">Правительство ▾</Link>
              <div className="dropdown__menu">
                <a href="#/government">Губернатор</a>
                <a href="#/government">Состав Правительства</a>
                <a href="#/government">Исполнительные органы</a>
                <a href="#/government">Пресс‑служба</a>
              </div>
            </div>
            <div
              className={`dropdown ${openMenu === "auth" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("auth")}
            >
              <Link to="/authorities">Органы власти ▾</Link>
              <div className="dropdown__menu">
                <a href="#/authorities">Местное самоуправление</a>
                <a href="#/authorities">Законодательное Собрание</a>
                <a href="#/authorities">Территориальные отделения</a>
              </div>
            </div>
            <Link to="/wifi">Карта WiFi</Link>
          </nav>

          <div className="header-actions">
            <button
              className="icon-btn"
              aria-label="Версия для слабовидящих"
              onClick={cycleMode}
            >
              👁️
            </button>
            <button
              className="icon-btn"
              aria-label="Сменить язык"
              onClick={() => setLang(lang === "ru" ? "ty" : "ru")}
            >
              {lang.toUpperCase()}
            </button>
            <button className="icon-btn" aria-label="Поиск">
              🔍
            </button>
            <button
              className="icon-btn"
              aria-label="Меню"
              onClick={handleBurger}
            >
              <span className="burger">
                <span></span>
                <span></span>
                <span></span>
              </span>
            </button>
          </div>
        </div>

        {/* убрали старое узкое мегаменю */}
      </header>
      <div
        className={`sheet-backdrop ${sheetOpen ? "open" : ""}`}
        onClick={() => setSheetOpen(false)}
      ></div>
      <div
        className={`mega-sheet ${sheetOpen ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
      >
        <div className="sheet-header">
          <button className="icon-btn" aria-label="Версия для слабовидящих">
            👁️
          </button>
          <button className="icon-btn" aria-label="Поиск">
            🔍
          </button>
          <button
            className="icon-btn"
            onClick={() => setSheetOpen(false)}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        <div className="sheet-grid container">
          <div className="sheet-card">
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Space wrap size={16}>
                <Avatar
                  size={64}
                  icon={
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vladislav_Khovalyg_portrait.jpg/250px-Vladislav_Khovalyg_portrait.jpg" />
                  }
                />
              </Space>
              <div>
                <div style={{ fontWeight: 700 }}>
                  Социальные сети Главы Республики Тыва
                </div>
                <div style={{ color: "#6b7280", fontSize: 14 }}>
                  Подписывайтесь
                </div>
              </div>
            </div>
            <div className="sheet-meta">13:41 · 29 октября 2025, Среда</div>
          </div>
          <div className="sheet-col">
            <h3>О регионе</h3>
            <a href="#/region">Республика Тыва</a>
            <a href="#/region">Карта области</a>
            <a href="#/region">Летопись</a>
            <a href="#/region">Приоритеты</a>
            <a href="#/region">Достижения</a>
            <a href="#/region">Официальные символы</a>
          </div>
          <div className="sheet-col">
            <h3>Органы власти</h3>
            <a href="#/authorities">Местное самоуправление</a>
            <a href="#/authorities">Законодательное Собрание</a>
            <a href="#/authorities">Территориальные отделения</a>
            <a href="#/authorities">Руководители органов</a>
          </div>
          <div className="sheet-col">
            <h3>Деятельность</h3>
            <a href="#/government">Стратегия</a>
            <a href="#/government">Планы и прогнозы</a>
            <a href="#/government">Итоги и отчёты</a>
            <a href="#/government">Объявления</a>
            <a href="#/government">Противодействие коррупции</a>
          </div>
          <div className="sheet-col">
            <h3>Новости</h3>
            <a href="#/news">Актуальные новости</a>
            <a href="#/news">Все новости</a>
            <a href="#/news">Медиа</a>
          </div>
          <div className="sheet-col">
            <h3>Правительство</h3>
            <a href="#/government">Губернатор</a>
            <a href="#/government">Состав Правительства</a>
            <a href="#/government">Исполнительные органы</a>
            <a href="#/government">Пресс‑служба</a>
          </div>
          <div className="sheet-col">
            <h3>Документы</h3>
            <a href="#/documents">Все документы</a>
          </div>
          <div className="sheet-col">
            <h3>Обратная связь</h3>
            <a href="#/feedback">Приём обращений</a>
            <a href="#/wifi">Карта WiFi</a>
          </div>
        </div>
      </div>
      <div
        className={`drawer-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      ></div>
      <nav className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button className="icon-btn" aria-label="Поиск">
            🔍
          </button>
          <button
            className="icon-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Закрыть"
          >
            ✕
          </button>
        </div>
        {!mobileSection && (
          <>
            <button
              className="tile link"
              onClick={() => setMobileSection("auth")}
            >
              Органы власти →
            </button>
            <button
              className="tile link"
              onClick={() => setMobileSection("activity")}
            >
              Деятельность →
            </button>
            <button
              className="tile link"
              onClick={() => setMobileSection("news")}
            >
              Новости →
            </button>
            <button
              className="tile link"
              onClick={() => setMobileSection("gov")}
            >
              Правительство →
            </button>
            <Link
              to="/documents"
              onClick={() => setMobileOpen(false)}
              className="tile link"
            >
              Документы
            </Link>
            <Link
              to="/feedback"
              onClick={() => setMobileOpen(false)}
              className="tile link"
            >
              Обратная связь
            </Link>
            <Link
              to="/wifi"
              onClick={() => setMobileOpen(false)}
              className="tile link"
            >
              Карта WiFi
            </Link>
            <div className="sheet-card" style={{ marginTop: 12 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  marginBottom: 8,
                }}
              >
                <span>
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vladislav_Khovalyg_portrait.jpg/250px-Vladislav_Khovalyg_portrait.jpg"
                    alt=""
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                </span>
                <div style={{ fontWeight: 700 }}>Социальные сети Главы</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <a className="btn" href="#">
                  VK
                </a>
                <a className="btn" href="#">
                  TG
                </a>
              </div>
            </div>
          </>
        )}
        {mobileSection === "auth" && (
          <>
            <button className="btn" onClick={() => setMobileSection(null)}>
              ← Назад
            </button>
            <div style={{ color: "#6b7280", margin: "8px 0" }}>
              Органы власти
            </div>
            <a
              className="tile link"
              href="#/authorities"
              onClick={() => setMobileOpen(false)}
            >
              Местное самоуправление
            </a>
            <a
              className="tile link"
              href="#/authorities"
              onClick={() => setMobileOpen(false)}
            >
              Законодательное Собрание
            </a>
            <a
              className="tile link"
              href="#/authorities"
              onClick={() => setMobileOpen(false)}
            >
              Территориальные отделения
            </a>
            <a
              className="tile link"
              href="#/authorities"
              onClick={() => setMobileOpen(false)}
            >
              Руководители органов
            </a>
          </>
        )}
        {mobileSection === "activity" && (
          <>
            <button className="btn" onClick={() => setMobileSection(null)}>
              ← Назад
            </button>
            <div style={{ color: "#6b7280", margin: "8px 0" }}>
              Деятельность
            </div>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Стратегия
            </a>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Планы и прогнозы
            </a>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Итоги и отчёты
            </a>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Объявления
            </a>
          </>
        )}
        {mobileSection === "news" && (
          <>
            <button className="btn" onClick={() => setMobileSection(null)}>
              ← Назад
            </button>
            <div style={{ color: "#6b7280", margin: "8px 0" }}>Новости</div>
            <a
              className="tile link"
              href="#/news"
              onClick={() => setMobileOpen(false)}
            >
              Актуальные новости
            </a>
            <a
              className="tile link"
              href="#/news"
              onClick={() => setMobileOpen(false)}
            >
              Все новости
            </a>
            <a
              className="tile link"
              href="#/news"
              onClick={() => setMobileOpen(false)}
            >
              Медиа
            </a>
          </>
        )}
        {mobileSection === "gov" && (
          <>
            <button className="btn" onClick={() => setMobileSection(null)}>
              ← Назад
            </button>
            <div style={{ color: "#6b7280", margin: "8px 0" }}>
              Правительство
            </div>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Губернатор
            </a>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Состав Правительства
            </a>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Исполнительные органы
            </a>
            <a
              className="tile link"
              href="#/government"
              onClick={() => setMobileOpen(false)}
            >
              Пресс‑служба
            </a>
          </>
        )}
      </nav>
    </>
  );
}
