import React from "react";
import Header from "./components/Header.jsx";
import HeroCarousel from "./components/HeroCarousel.jsx";
import Priorities from "./components/Priorities.jsx";
import Achievements from "./components/Achievements.jsx";
import Resources from "./components/Resources.jsx";
import NewsPreview from "./components/NewsPreview.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div>
      <Header />
      <HeroCarousel />
      <Priorities />
      <Achievements />
      <Resources />
      <NewsPreview />
      <Footer />
    </div>
  );
}
