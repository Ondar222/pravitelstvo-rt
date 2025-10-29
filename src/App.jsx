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
import Priority01 from "./pages/priorities/Priority01.jsx";
import Priority02 from "./pages/priorities/Priority02.jsx";
import Priority03 from "./pages/priorities/Priority03.jsx";
import Priority04 from "./pages/priorities/Priority04.jsx";
import Priority05 from "./pages/priorities/Priority05.jsx";
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
          "/priority/01": Priority01,
          "/priority/02": Priority02,
          "/priority/03": Priority03,
          "/priority/04": Priority04,
          "/priority/05": Priority05,
        }}
      />
      <Footer />
    </div>
  );
}
