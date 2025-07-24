
export const getPageTitle = (pathname: string): string => {
  const segments = pathname.split("/").filter(Boolean);
  const main = segments[0] || "home";

  // Custom logic for dynamic routes
  if (main === "garage" && segments[1]) {
    return "Garage Profile";
  }

  // Optional static route name overrides
  const customTitles: Record<string, string> = {
    home: "home",
  };

  return customTitles[main] || capitalize(main);
};

const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
