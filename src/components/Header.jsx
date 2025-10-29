import React from "react";

export default function Header() {
  const [open, setOpen] = React.useState(false);
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

  return (
    <>
      <header className="site-header">
        <div className="container topbar">
          <a href="#">Прием обращений</a>
          <a href="#">Пресс-служба</a>
          <a href="#">Деятельность</a>
          <a href="#">Документы</a>
          <a href="#">Контакты</a>
        </div>
        <div className="container row">
          <div className="row">
            <div className="brand">
              <div className="logo">∷</div>
              <div>
                <div style={{ fontSize: 14, lineHeight: 1, color: "#6b7280" }}>
                  ПРАВИТЕЛЬСТВО
                </div>
                <div style={{ fontSize: 16, lineHeight: 1.1, fontWeight: 800 }}>
                  НИЖЕГОРОДСКОЙ ОБЛАСТИ
                </div>
              </div>
            </div>
          </div>

          <nav className="main-nav" onMouseLeave={() => setOpen(false)}>
            <a href="#" onMouseEnter={() => setOpen(false)}>
              О регионе
            </a>
            <a href="#" onMouseEnter={() => setOpen(false)}>
              Новости
            </a>
            <a
              href="#"
              onMouseEnter={() => setOpen(true)}
              aria-haspopup="true"
              aria-expanded={open}
            >
              Правительство
            </a>
            <a href="#" onMouseEnter={() => setOpen(false)}>
              Органы власти
            </a>
            <a href="#" onMouseEnter={() => setOpen(false)}>
              Карта WiFi
            </a>
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

        <div className={`mega ${open ? "open" : ""}`} role="menu">
          <div className="container cols">
            <div className="col">
              <h4>Правительство</h4>
              <a href="#">Губернатор</a>
              <a href="#">Состав Правительства</a>
              <a href="#">Исполнительные органы</a>
              <a href="#">Пресс-служба</a>
            </div>
            <div className="col">
              <h4>Деятельность</h4>
              <a href="#">Стратегия</a>
              <a href="#">Планы и прогнозы</a>
              <a href="#">Итоги и отчёты</a>
              <a href="#">Объявления</a>
            </div>
            <div className="col">
              <h4>О регионе</h4>
              <a href="#">Карта области</a>
              <a href="#">Приоритеты</a>
              <a href="#">Достижения</a>
              <a href="#">Документы</a>
            </div>
            <div className="col">
              <h4>Обратная связь</h4>
              <a href="#">Приём обращений граждан</a>
              <a href="#">Карта Wi‑Fi</a>
              <a href="#">Контакты</a>
            </div>
          </div>
        </div>
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
                  Социальные сети Губернатора Нижегородской области
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
            <a href="#">Нижегородская область</a>
            <a href="#">Карта области</a>
            <a href="#">Летопись</a>
            <a href="#">Приоритеты</a>
            <a href="#">Достижения</a>
            <a href="#">Официальные символы</a>
          </div>
          <div className="sheet-col">
            <h3>Органы власти</h3>
            <a href="#">Местное самоуправление</a>
            <a href="#">Законодательное Собрание</a>
            <a href="#">Территориальные отделения</a>
            <a href="#">Руководители органов</a>
          </div>
          <div className="sheet-col">
            <h3>Деятельность</h3>
            <a href="#">Стратегия</a>
            <a href="#">Планы и прогнозы</a>
            <a href="#">Итоги и отчёты</a>
            <a href="#">Объявления</a>
            <a href="#">Противодействие коррупции</a>
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
        <a href="#" onClick={() => setMobileOpen(false)}>
          О регионе
        </a>
        <a href="#" onClick={() => setMobileOpen(false)}>
          Новости
        </a>
        <a href="#" onClick={() => setMobileOpen(false)}>
          Правительство
        </a>
        <a href="#" onClick={() => setMobileOpen(false)}>
          Органы власти
        </a>
        <a href="#" onClick={() => setMobileOpen(false)}>
          Карта Wi‑Fi
        </a>
      </nav>
    </>
  );
}
