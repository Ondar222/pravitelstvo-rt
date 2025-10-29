import React from "react";
import HeroCarousel from "../components/HeroCarousel.jsx";
import Priorities from "../components/Priorities.jsx";
import Achievements from "../components/Achievements.jsx";
import Resources from "../components/Resources.jsx";
import NewsPreview from "../components/NewsPreview.jsx";
import NewsBlock from "../components/NewsBlock.jsx";
import CalendarPreview from "../components/CalendarPreview.jsx";

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <Priorities />
      <NewsBlock />
      <CalendarPreview />
      <Achievements />
      <Resources />
      <NewsPreview />
    </>
  );
}
