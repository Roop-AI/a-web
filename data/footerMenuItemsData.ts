interface MenuItem {
  key?: number;
  uniqueKey?: any;
  label: string;
  href: string;
}
const MenuItems: MenuItem[] = [
  { label: "Home", href: "#" },
  { label: "AI Tools", href: "#" },
  { label: "About Us", href: "#" },
  { label: "Generate", href: "#" },
];

export default MenuItems;