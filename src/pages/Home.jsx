import React from "react";
import HeroCarousel from "../components/HeroCarousel.jsx";
import Priorities from "../components/Priorities.jsx";
import Achievements from "../components/Achievements.jsx";
import Resources from "../components/Resources.jsx";
import NewsBlock from "../components/NewsBlock.jsx";
import CalendarWidget from "../components/CalendarWidget.jsx";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Priorities />
      <NewsBlock />
      <CalendarWidget />
      <Achievements />
      <Resources />
      {/* Удалён дублирующий блок новостей */}
    </>
  );
}
