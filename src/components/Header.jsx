import React from "react";
import { useA11y } from "../context/A11yContext.jsx";
import { useI18n } from "../context/I18nContext.jsx";
import Link from "./Link.jsx";
import SearchModal from "./SearchModal.jsx";
import { useData } from "../context/DataContext.jsx";
// removed unused UI icon libs

export default function Header() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(null); // 'vh' | 'news' | 'docs'
  const [mobileSection, setMobileSection] = React.useState(null);
  const [searchOpen, setSearchOpen] = React.useState(false);

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
  const { lang, setLang, t } = useI18n();

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
          <a href="#/feedback">{t("feedback")}</a>
          <a href="#/press">{t("press")}</a>
          <a href="#/activity">{t("activity")}</a>
          <a href="#/docs">{t("docs")}</a>
          <a href="#/deputies">{t("deputies")}</a>
          <span style={{ marginLeft: "auto", display: "flex", gap: 12 }}>
            <a href="#/login">{t("login")}</a>
            <a href="#/register">{t("register")}</a>
          </span>
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
                  width={56}
                  height={56}
                />
              </a>
              <div className="brand-text">
                <a href="/" style={{ textDecoration: "none" }}>
                  <div
                    style={{ fontSize: 18, lineHeight: 1, color: "#6b7280" }}
                  >
                    ВЕРХОВНЫЙ ХУРАЛ <br /> (парламент)
                  </div>
                  <div
                    style={{ fontSize: 18, lineHeight: 1.1, fontWeight: 800 }}
                  >
                    РЕСПУБЛИКИ ТЫВА
                  </div>
                </a>
              </div>
            </div>
          </div>

          <nav className="main-nav">
            <div>
              <Link to="/">Главная</Link>
            </div>
            <div
              className={`dropdown ${openMenu === "vh" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("vh")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link to="/about">О Верховном Хурале ▾</Link>
              <div
                className="dropdown__menu"
                onMouseEnter={() => setOpenMenu("vh")}
              >
                <a href="#/about">О Верховном Хурале</a>
                <a href="#/section">Структура</a>
                <a href="#/committee">Комитеты</a>
                <a href={"#/section?title=" + encodeURIComponent("Комиссии")}>
                  Комиссии
                </a>
                <a
                  href={
                    "#/section?title=" +
                    encodeURIComponent("Депутатские фракции")
                  }
                >
                  Депутатские фракции
                </a>
                <a
                  href={
                    "#/section?title=" +
                    encodeURIComponent("Представительство в Совете Федерации")
                  }
                >
                  Представительство в Совете Федерации
                </a>
                <a href="#/apparatus">Аппарат</a>
                <a href="#/contacts">Контакты</a>
              </div>
            </div>
            <div>
              <Link to="/deputies">Депутаты</Link>
            </div>
            <div
              className={`dropdown ${openMenu === "docs" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("docs")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link to="/docs/laws">Документы ▾</Link>
              <div
                className="dropdown__menu"
                onMouseEnter={() => setOpenMenu("docs")}
              >
                <a href="#/docs/laws">Законы Республики Тыва</a>
                <a href="#/docs/resolutions">Постановления ВХ РТ</a>
                <a href="#/docs/initiatives">Законодательные инициативы</a>
                <a href="#/docs/civic">Законодательная инициатива гражданами</a>
                <a href="#/docs/constitution">
                  Реализация принятых поправок в Конституцию РФ
                </a>
                <a href="#/docs/bills">Законопроекты</a>
              </div>
            </div>
            <div
              className={`dropdown ${openMenu === "news" ? "open" : ""}`}
              onMouseEnter={() => setOpenMenu("news")}
              onMouseLeave={() => setOpenMenu(null)}
            >
              <Link to="/news">Новости ▾</Link>
              <div
                className="dropdown__menu"
                onMouseEnter={() => setOpenMenu("news")}
              >
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
            <div>
              <Link to="/appeals">Обращения граждан</Link>
            </div>
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
            <button
              className="icon-btn"
              aria-label="Поиск"
              onClick={() => setSearchOpen(true)}
            >
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
          <a
            href="/"
            className="logo"
            aria-label="На главную"
            onClick={() => setSheetOpen(false)}
            style={{
              marginRight: "auto",
              textDecoration: "none",
            }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_arms_of_Tuva.svg"
              alt=""
              width={44}
              height={44}
            />
          </a>
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
          <button
            className="icon-btn"
            aria-label="Поиск"
            onClick={() => setSearchOpen(true)}
          >
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
          <div className="sheet-card social-card">
            <div className="social-card__header">
              <img
                className="social-avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vladislav_Khovalyg_portrait.jpg/250px-Vladislav_Khovalyg_portrait.jpg"
                alt=""
              />
              <div>
                <div className="social-card__title">
                  Социальные сети Главы Республики Тыва
                </div>
                <div className="social-card__subtitle">Подписывайтесь</div>
              </div>
            </div>
            <div className="social-icons">
              <a
                className="sicon"
                href="https://vk.com"
                target="_blank"
                rel="noreferrer"
                aria-label="VK"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#1976d2"
                    d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z"
                  ></path>
                </svg>
              </a>

              <a
                className="sicon"
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="100"
                  height="100"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#29b6f6"
                    d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                  ></path>
                  <path
                    fill="#fff"
                    d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                  ></path>
                  <path
                    fill="#b0bec5"
                    d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
                  ></path>
                  <path
                    fill="#cfd8dc"
                    d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="sheet-col">
            <h3>О Верховном Хурале</h3>
            <a href="#/about">О Верховном Хурале</a>
            <a href="#/section">Структура</a>
            <a href="#/committee">Комитеты</a>
            <a href={"#/section?title=" + encodeURIComponent("Комиссии")}>
              Комиссии
            </a>
            <a
              href={
                "#/section?title=" + encodeURIComponent("Депутатские фракции")
              }
            >
              Депутатские фракции
            </a>
            <a
              href={
                "#/section?title=" +
                encodeURIComponent("Представительство в Совете Федерации")
              }
            >
              Представительство в Совете Федерации
            </a>
            <a href="#/apparatus">Аппарат</a>
            <a href="#/contacts">Контакты</a>
          </div>
          <div className="sheet-col">
            <h3>Депутаты</h3>
            <a href="#/deputies">Депутаты</a>
            <a href="#/deputies">Депутаты всех созывов</a>
          </div>
          <div className="sheet-col">
            <h3>Новости</h3>
            <a href="#/news">Актуальные новости</a>
            <a href="#/news">Все новости</a>
            <a href="#/news">Медиа</a>
          </div>
          <div className="sheet-col">
            <h3>Документы</h3>
            <a href="#/docs/laws">Законы Республики Тыва</a>
            <a href="#/docs/resolutions">Постановления ВХ РТ</a>
            <a href="#/docs/initiatives">Законодательные инициативы</a>
            <a href="#/docs/civic">Инициатива гражданами</a>
            <a href="#/docs/constitution">Поправки в Конституцию РФ</a>
            <a href="#/docs/bills">Законопроекты</a>
          </div>
          <div className="sheet-col">
            <h3>Обращения граждан</h3>
            <a href="#/appeals">Приём обращений</a>
            <a href="#/contacts">Контакты</a>
            <a href="#/wifi">Карта WiFi</a>
            <a href="#/map">Карта</a>
          </div>
        </div>
      </div>
      <div
        className={`drawer-backdrop ${mobileOpen ? "open" : ""}`}
        onClick={() => setMobileOpen(false)}
      ></div>
      <nav className={`mobile-drawer ${mobileOpen ? "open" : ""}`}>
        <div
          className="mobile-toolbar"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
          }}
        >
          <a
            href="/"
            className="logo"
            aria-label="На главную"
            onClick={() => setMobileOpen(false)}
            style={{ textDecoration: "none" }}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c3/Coat_of_arms_of_Tuva.svg"
              alt=""
              width={36}
              height={36}
            />
          </a>
          <button
            className="icon-btn"
            aria-label="Версия для слабовидящих"
            onClick={cycleMode}
          >
            👁️
          </button>
          <button
            className="icon-btn"
            aria-label="Поиск"
            onClick={() => setSearchOpen(true)}
          >
            🔍
          </button>
          {/* <button
            className="icon-btn"
            aria-label={t("login")}
            onClick={() => {
              setMobileOpen(false);
              window.location.hash = "/login";
            }}
          >
            🔐
          </button> */}
          {/* <button
            className="icon-btn"
            aria-label={t("register")}
            onClick={() => {
              setMobileOpen(false);
              window.location.hash = "/register";
            }}
          >
            ➕
          </button> */}
          <button
            className="icon-btn"
            aria-label="Сменить язык"
            onClick={() => setLang(lang === "ru" ? "ty" : "ru")}
          >
            {lang.toUpperCase()}
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
            <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
              <a
                className="btn"
                href="#/login"
                onClick={() => setMobileOpen(false)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#003366",
                  color: "#ffffff",

                  fontWeight: 700,
                  padding: "20px 20px",
                }}
              >
                {t("login")}
              </a>
              <a
                className="btn"
                href="#/register"
                onClick={() => setMobileOpen(false)}
                style={{
                  flex: 1,
                  textAlign: "center",
                  background: "#ffffff",
                  border: "1px solid #003366",

                  color: "#003366",
                  fontWeight: 700,
                  padding: "20px 20px",
                }}
              >
                {t("register")}
              </a>
            </div>
            <Link
              to="/"
              onClick={() => setMobileOpen(false)}
              className="tile link"
            >
              Главная
            </Link>
            <button
              className="tile link"
              onClick={() => setMobileSection("vh")}
            >
              О Верховном Хурале →
            </button>
            <Link
              to="/deputies"
              onClick={() => setMobileOpen(false)}
              className="tile link"
            >
              Депутаты
            </Link>
            <Link
              to="/appeals"
              onClick={() => setMobileOpen(false)}
              className="tile link"
            >
              Обращения граждан
            </Link>
            <button
              className="tile link"
              onClick={() => setMobileSection("docs")}
            >
              {t("docs")} →
            </button>
            <button
              className="tile link"
              onClick={() => setMobileSection("news")}
            >
              {t("news")} →
            </button>
            <div className="sheet-card social-card" style={{ marginTop: 12 }}>
              <div className="social-card__header">
                <img
                  className="social-avatar"
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Vladislav_Khovalyg_portrait.jpg/250px-Vladislav_Khovalyg_portrait.jpg"
                  alt=""
                />
                <div className="social-card__title">Социальные сети Главы</div>
              </div>
              <div className="social-icons">
                <a
                  className="sicon"
                  href="https://vk.com"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="VK"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#1976d2"
                      d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M35.937,18.041c0.046-0.151,0.068-0.291,0.062-0.416C35.984,17.263,35.735,17,35.149,17h-2.618 c-0.661,0-0.966,0.4-1.144,0.801c0,0-1.632,3.359-3.513,5.574c-0.61,0.641-0.92,0.625-1.25,0.625C26.447,24,26,23.786,26,23.199 v-5.185C26,17.32,25.827,17,25.268,17h-4.649C20.212,17,20,17.32,20,17.641c0,0.667,0.898,0.827,1,2.696v3.623 C21,24.84,20.847,25,20.517,25c-0.89,0-2.642-3-3.815-6.932C16.448,17.294,16.194,17,15.533,17h-2.643 C12.127,17,12,17.374,12,17.774c0,0.721,0.6,4.619,3.875,9.101C18.25,30.125,21.379,32,24.149,32c1.678,0,1.85-0.427,1.85-1.094 v-2.972C26,27.133,26.183,27,26.717,27c0.381,0,1.158,0.25,2.658,2c1.73,2.018,2.044,3,3.036,3h2.618 c0.608,0,0.957-0.255,0.971-0.75c0.003-0.126-0.015-0.267-0.056-0.424c-0.194-0.576-1.084-1.984-2.194-3.326 c-0.615-0.743-1.222-1.479-1.501-1.879C32.062,25.36,31.991,25.176,32,25c0.009-0.185,0.105-0.361,0.249-0.607 C32.223,24.393,35.607,19.642,35.937,18.041z"
                    ></path>
                  </svg>
                </a>

                <a
                  className="sicon"
                  href="https://t.me"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Telegram"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="100"
                    height="100"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#29b6f6"
                      d="M24 4A20 20 0 1 0 24 44A20 20 0 1 0 24 4Z"
                    ></path>
                    <path
                      fill="#fff"
                      d="M33.95,15l-3.746,19.126c0,0-0.161,0.874-1.245,0.874c-0.576,0-0.873-0.274-0.873-0.274l-8.114-6.733 l-3.97-2.001l-5.095-1.355c0,0-0.907-0.262-0.907-1.012c0-0.625,0.933-0.923,0.933-0.923l21.316-8.468 c-0.001-0.001,0.651-0.235,1.126-0.234C33.667,14,34,14.125,34,14.5C34,14.75,33.95,15,33.95,15z"
                    ></path>
                    <path
                      fill="#b0bec5"
                      d="M23,30.505l-3.426,3.374c0,0-0.149,0.115-0.348,0.12c-0.069,0.002-0.143-0.009-0.219-0.043 l0.964-5.965L23,30.505z"
                    ></path>
                    <path
                      fill="#cfd8dc"
                      d="M29.897,18.196c-0.169-0.22-0.481-0.26-0.701-0.093L16,26c0,0,2.106,5.892,2.427,6.912 c0.322,1.021,0.58,1.045,0.58,1.045l0.964-5.965l9.832-9.096C30.023,18.729,30.064,18.416,29.897,18.196z"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          </>
        )}
        {mobileSection === "vh" && (
          <>
            <button className="btn" onClick={() => setMobileSection(null)}>
              ← Назад
            </button>
            <div style={{ color: "#6b7280", margin: "8px 0" }}>
              О Верховном Хурале
            </div>
            <a
              className="tile link"
              href="#/about"
              onClick={() => setMobileOpen(false)}
            >
              О Верховном Хурале
            </a>
            <a
              className="tile link"
              href="#/section"
              onClick={() => setMobileOpen(false)}
            >
              Структура
            </a>
            <a
              className="tile link"
              href="#/committee"
              onClick={() => setMobileOpen(false)}
            >
              Комитеты
            </a>
            <a
              className="tile link"
              href={"#/section?title=" + encodeURIComponent("Комиссии")}
              onClick={() => setMobileOpen(false)}
            >
              Комиссии
            </a>
            <a
              className="tile link"
              href={
                "#/section?title=" + encodeURIComponent("Депутатские фракции")
              }
              onClick={() => setMobileOpen(false)}
            >
              Депутатские фракции
            </a>
            <a
              className="tile link"
              href={
                "#/section?title=" +
                encodeURIComponent("Представительство в Совете Федерации")
              }
              onClick={() => setMobileOpen(false)}
            >
              Представительство в Совете Федерации
            </a>
            <a
              className="tile link"
              href="#/apparatus"
              onClick={() => setMobileOpen(false)}
            >
              Аппарат
            </a>
            <a
              className="tile link"
              href="#/contacts"
              onClick={() => setMobileOpen(false)}
            >
              Контакты
            </a>
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
              Глава
            </a>
            <a
              className="tile link"
              href="#/deputies"
              onClick={() => setMobileOpen(false)}
            >
              Депутаты
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
              href="#/government?type=org"
              onClick={() => setMobileOpen(false)}
            >
              Структура
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
        {mobileSection === "docs" && (
          <>
            <button className="btn" onClick={() => setMobileSection(null)}>
              ← Назад
            </button>
            <div style={{ color: "#6b7280", margin: "8px 0" }}>Документы</div>
            <a
              className="tile link"
              href="#/docs/laws"
              onClick={() => setMobileOpen(false)}
            >
              Законы Республики Тыва
            </a>
            <a
              className="tile link"
              href="#/docs/resolutions"
              onClick={() => setMobileOpen(false)}
            >
              Постановления ВХ РТ
            </a>
            <a
              className="tile link"
              href="#/docs/initiatives"
              onClick={() => setMobileOpen(false)}
            >
              Законодательные инициативы
            </a>
            <a
              className="tile link"
              href="#/docs/civic"
              onClick={() => setMobileOpen(false)}
            >
              Законодательная инициатива гражданами
            </a>
            <a
              className="tile link"
              href="#/docs/constitution"
              onClick={() => setMobileOpen(false)}
            >
              Реализация поправок в Конституцию РФ
            </a>
            <a
              className="tile link"
              href="#/docs/bills"
              onClick={() => setMobileOpen(false)}
            >
              Законопроекты
            </a>
          </>
        )}
      </nav>
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
