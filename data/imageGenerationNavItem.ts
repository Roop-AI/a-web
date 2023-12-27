interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}
const IMAGEGENERATION_NAV_ITEMS: Array<NavItem> = [
  {
    label: "Generate",
    href: "/imageGeneration",
  },
  {
    label: "Inspiration",
    href: "/inspiration",
  },
  {
    label: "My Creation",
    href: "#",
  },
];

export default IMAGEGENERATION_NAV_ITEMS;
