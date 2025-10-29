import React from "react";
import Header from "./components/Header.jsx";
import Router from "./Router.jsx";
import Home from "./pages/Home.jsx";
import Region from "./pages/Region.jsx";
import News from "./pages/News.jsx";
import Government from "./pages/Government.jsx";
import Authorities from "./pages/Authorities.jsx";
import Wifi from "./pages/Wifi.jsx";
import {
  Feedback,
  Press,
  Activity,
  Docs,
  Contacts,
} from "./pages/TopbarStubs.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <Router
        routes={{
          "/": Home,
          "/region": Region,
          "/news": News,
          "/government": Government,
          "/authorities": Authorities,
          "/wifi": Wifi,
          "/feedback": Feedback,
          "/press": Press,
          "/activity": Activity,
          "/docs": Docs,
          "/contacts": Contacts,
        }}
      />
      <Footer />
    </div>
  );
}
