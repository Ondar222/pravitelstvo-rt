import React from "react";

export function useHashRoute() {
  const [route, setRoute] = React.useState(
    () => window.location.hash.replace(/^#/, "") || "/"
  );
  React.useEffect(() => {
    const onHash = () =>
      setRoute(window.location.hash.replace(/^#/, "") || "/");
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
  const Component = routes[route] || routes["/"];
  return <Component />;
}
