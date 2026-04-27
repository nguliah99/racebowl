export const brand = {
  name: "RaceBowl",
  accent: "#ff6a00",
} as const;

export const navItems = [
  { href: "/", label: "Home", icon: "home" },
  { href: "/menu/customize", label: "Menu", icon: "utensils-crossed" },
  { href: "/order/RB-240518-27", label: "Order", icon: "clipboard-list" },
  { href: "/race-points", label: "Race Points", icon: "badge-cent" },
  { href: "/profile", label: "Profil", icon: "circle-user-round" },
] as const;
