import React from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

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

  React.useEffect(() => {
    const anyOpen = mobileOpen || sheetOpen;
    const prev = document.body.style.overflow;
    document.body.style.overflow = anyOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [mobileOpen, sheetOpen]);

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
              <div className="logo">∷</div>
              <div>
                <a href="/" style={{ textDecoration: "none" }}>
                  <div
                    style={{ fontSize: 14, lineHeight: 1, color: "#6b7280" }}
                  >
                    ХУРАЛ (ПРАВИТЕЛЬСТВО)
                  </div>
                  <div
                    style={{ fontSize: 16, lineHeight: 1.1, fontWeight: 800 }}
                  >
                    РЕСПУБЛИКИ ТЫВА
                  </div>
                </a>
              </div>
            </div>
          </div>

          <nav className="main-nav">
            <a href="#/region">О регионе</a>
            <a href="#/news">Новости</a>
            <a
              href="#/government"
              aria-haspopup="true"
              aria-expanded={sheetOpen}
            >
              Правительство
            </a>
            <a href="#/authorities">Органы власти</a>
            <a href="#/wifi">Карта WiFi</a>
          </nav>

          <div className="header-actions">
            <button className="icon-btn" aria-label="Версия для слабовидящих">
              👁️
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
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 14,
                  overflow: "hidden",
                  background: "#e5e7eb",
                }}
              ></div>
              <div>
                <div style={{ fontWeight: 700 }}>
                  Социальные сети Губернатора Республики Тыва
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
        </div>
      </div>
      <div
        className={`drawer-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      ></div>
      <nav className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <button
          className="icon-btn"
          onClick={() => setMobileOpen(false)}
          aria-label="Закрыть"
        >
          ✕
        </button>
        <a href="#/region" onClick={() => setMobileOpen(false)}>
          О регионе
        </a>
        <a href="#/news" onClick={() => setMobileOpen(false)}>
          Новости
        </a>
        <a href="#/government" onClick={() => setMobileOpen(false)}>
          Правительство
        </a>
        <a href="#/authorities" onClick={() => setMobileOpen(false)}>
          Органы власти
        </a>
        <a href="#/wifi" onClick={() => setMobileOpen(false)}>
          Карта Wi‑Fi
        </a>
      </nav>
    </>
  );
}
