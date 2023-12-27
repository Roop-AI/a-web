interface NavItem {
  label?: string;
  active?: boolean;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}
export const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "#",
    active: true,
  },
  {
    label: "Tools",
    href: "#",
  },
  {
    label: "Blog",
    href: "#",
  },
  {
    label: "Pricing",
    href: "#",
  },
  {
    label: "Contact Us",
    href: "#",
  },
];
