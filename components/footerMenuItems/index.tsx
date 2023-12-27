import React from "react";
import Link from "next/link";
import { Text } from "@chakra-ui/react";
interface MenuItem {
  key?: number;
  uniqueKey?: any;
  label?: string;
  href?: any;
}
const FooterMenuItems: React.FC<MenuItem> = (props) => {
  return (
    <Link key={props.uniqueKey} href={props.href! ?? ''}>
      <Text
        fontFamily="Poppins"
        fontWeight={600}
        fontSize={{ base: "18px", lg: "22px" }}
      >
        {props.label}
      </Text>
    </Link>
  );
};

export default FooterMenuItems;
