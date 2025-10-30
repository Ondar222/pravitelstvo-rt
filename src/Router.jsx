import React from "react";

// Remember last scroll position to avoid automatic jump to top
let lastScrollY = typeof window !== "undefined" ? window.scrollY : 0;

export function useHashRoute() {
  const [route, setRoute] = React.useState(
    () => window.location.hash.replace(/^#/, "") || "/"
  );
  React.useEffect(() => {
    const onHash = () => {
      // save current scroll before route updates
      lastScrollY = window.scrollY || window.pageYOffset || 0;
      setRoute(window.location.hash.replace(/^#/, "") || "/");
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);
  const navigate = (path) => {
    window.location.hash = path;
  };
  return { route, navigate };
}

export default function Router({ routes }) {
  const { route } = useHashRoute();
  const base = route.split("?")[0];
  const Component = routes[base] || routes["/"];
  React.useEffect(() => {
    // restore previous scroll after navigation/render
    const y = lastScrollY || 0;
    if (typeof window !== "undefined") {
      window.scrollTo({ top: y, behavior: "auto" });
    }
  }, [route]);
  return <Component />;
}
