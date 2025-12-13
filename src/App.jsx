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
import { Feedback, Press, Docs } from "./pages/TopbarStubs.jsx";
import Contacts from "./pages/Contacts.jsx";
import ActivityPage from "./pages/Activity.jsx";
import Footer from "./components/Footer.jsx";
import DataProvider from "./context/DataContext.jsx";
import AuthProvider from "./context/AuthContext.jsx";
import I18nProvider from "./context/I18nContext.jsx";
import A11yProvider from "./context/A11yContext.jsx";
import CalendarPage from "./pages/Calendar.jsx";
import About from "./pages/About.jsx";
import Documents from "./pages/Documents.jsx";
import Deputies from "./pages/Deputies.jsx";
import Appeals from "./pages/Appeals.jsx";
import MapPage from "./pages/Map.jsx";
import { ConfigProvider, theme } from "antd";
import CookieBanner from "./components/CookieBanner.jsx";
import Apparatus from "./pages/Apparatus.jsx";
import SectionPage from "./pages/Section.jsx";
import Commission from "./pages/Commission.jsx";
import Breadcrumbs from "./components/Breadcrumbs.jsx";
import DocsPage from "./pages/docs/DocsPage.jsx";
import ActivitySectionPage from "./pages/activity/ActivitySection.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Admin from "./pages/Admin.jsx";

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
          <AuthProvider>
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
                      "/calendar": CalendarPage,
                      "/documents": Documents,
                      "/docs/laws": DocsPage,
                      "/docs/resolutions": DocsPage,
                      "/docs/initiatives": DocsPage,
                      "/docs/civic": DocsPage,
                      "/docs/constitution": DocsPage,
                      "/docs/bills": DocsPage,
                      "/activity/plan": ActivitySectionPage,
                      "/activity/national-projects": ActivitySectionPage,
                      "/activity/reports": ActivitySectionPage,
                      "/activity/sessions": ActivitySectionPage,
                      "/activity/statistics": ActivitySectionPage,
                      "/activity/schet_palata": ActivitySectionPage,
                      "/committee": Committee,
                      "/commission": Commission,
                      "/apparatus": Apparatus,
                      "/section": SectionPage,
                      "/deputies": Deputies,
                      "/appeals": Appeals,
                      "/government": Government,
                      "/authorities": Authorities,
                      "/wifi": Wifi,
                      "/map": MapPage,
                      "/admin": Admin,
                      "/admin/news": Admin,
                      "/admin/deputies": Admin,
                      "/admin/documents": Admin,
                      "/feedback": Feedback,
                      "/press": Press,
                      "/activity": ActivityPage,
                      "/docs": Docs,
                      "/contacts": Contacts,
                      "/login": Login,
                      "/register": Register,
                    }}
                  />
                </main>
                <Footer />
                <CookieBanner />
              </div>
            </DataProvider>
          </AuthProvider>
        </ConfigProvider>
      </A11yProvider>
    </I18nProvider>
  );
}
