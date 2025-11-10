import React from "react";
import Header from "./components/Header.jsx";
import Router from "./Router.jsx";
import Home from "./pages/Home.jsx";
import Region from "./pages/Region.jsx";
import News from "./pages/News.jsx";
import NewsArchive from "./pages/NewsArchive.jsx";
import Government from "./pages/Government.jsx";
import Authorities from "./pages/Authorities.jsx";
import Wifi from "./pages/Wifi.jsx";
import Committee from "./pages/Committee.jsx";
import {
  Feedback,
  Press,
  Activity,
  Docs,
  Contacts,
} from "./pages/TopbarStubs.jsx";
import Priority01 from "./pages/priorities/Priority01.jsx";
import Priority02 from "./pages/priorities/Priority02.jsx";
import Priority03 from "./pages/priorities/Priority03.jsx";
import Priority04 from "./pages/priorities/Priority04.jsx";
import Priority05 from "./pages/priorities/Priority05.jsx";
import Footer from "./components/Footer.jsx";
import DataProvider from "./context/DataContext.jsx";
import I18nProvider from "./context/I18nContext.jsx";
import A11yProvider from "./context/A11yContext.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import About from "./pages/About.jsx";
import Documents from "./pages/Documents.jsx";
import Deputies from "./pages/Deputies.jsx";
import Appeals from "./pages/Appeals.jsx";
import AchievementsPage from "./pages/Achievements.jsx";
import { ConfigProvider, theme } from "antd";
import CookieBanner from "./components/CookieBanner.jsx";
import Apparatus from "./pages/Apparatus.jsx";
import SectionPage from "./pages/Section.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import DocsPage from "./pages/docs/DocsPage.jsx";

export default function App() {
  return (
    <I18nProvider>
      <A11yProvider>
        <ConfigProvider
          theme={{
            algorithm: theme.defaultAlgorithm,
            token: {
              colorPrimary: "#003366",
              colorInfo: "#003366",
              colorWarning: "#FFD700",
              colorTextBase: "#111827",
              colorBgBase: "#ffffff",
              borderRadius: 8,
            },
          }}
        >
          <DataProvider>
            <div className="layout">
              <Header />
              <main className="main-content">
                <Breadcrumbs />
                <Router
                  routes={{
                    "/": Home,
                    "/region": Region,
                    "/about": About,
                    "/news": NewsArchive,
                    "/achievements": AchievementsPage,
                    "/calendar": CalendarPage,
                    "/documents": Documents,
                    "/docs/laws": DocsPage,
                    "/docs/resolutions": DocsPage,
                    "/docs/initiatives": DocsPage,
                    "/docs/civic": DocsPage,
                    "/docs/constitution": DocsPage,
                    "/docs/bills": DocsPage,
                    "/committee": Committee,
                    "/apparatus": Apparatus,
                    "/section": SectionPage,
                    "/deputies": Deputies,
                    "/appeals": Appeals,
                    "/government": Government,
                    "/authorities": Authorities,
                    "/wifi": Wifi,
                    "/feedback": Feedback,
                    "/press": Press,
                    "/activity": Activity,
                    "/docs": Docs,
                    "/contacts": Contacts,
                    "/priority/01": Priority01,
                    "/priority/02": Priority02,
                    "/priority/03": Priority03,
                    "/priority/04": Priority04,
                    "/priority/05": Priority05,
                  }}
                />
              </main>
              <Footer />
              <CookieBanner />
            </div>
          </DataProvider>
        </ConfigProvider>
      </A11yProvider>
    </I18nProvider>
  );
}
