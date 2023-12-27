import { Button, Flex, Grid, Image, Stack } from "@chakra-ui/react";
import { NAV_ITEMS } from "@/data/navItemsData";
import MobileNavItem from "../mobileNavItem";
import { CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { socialIconsData } from "@/data/socialIconsData";

interface MobileNavProps {
  isOpen: boolean;
  toggleOpen: () => void;
}
const MobileNav: React.FC<MobileNavProps> = ({ isOpen, toggleOpen }) => {
  return (
    <Flex
      p={4}
      bg={"#0E0E0F"}
      color={"white"}
      position={"fixed"}
      top={0}
      zIndex={30}
      w={"100%"}
      h={"100vh"}
      sx={{
        "@media (max-width: 1300px)": {
          display: "flex",
        },
        "@media (min-width: 1301px)": {
          display: "none",
        },
      }}
      justify={"center"}
      align={"center"}
    >
      <Stack gap={"20px"} mx={"auto"} justifyContent={"center"}>
        <Flex
          justify={"flex-end"}
          align={"center"}
          h={"11vh"}
          pos={"absolute"}
          maxW={"84%"}
          minW={"84%"}
          top={"0"}
          sx={{
            "@media (max-width: 768px)": {
              right: "5%",
            },
            "@media (min-width: 769px)": {
              right: "8%",
            },
          }}
        >
          {isOpen && (
            <CloseIcon
              w={5}
              h={5}
              color={"white"}
              _hover={{
                color: "white",
              }}
              onClick={toggleOpen}
            />
          )}
        </Flex>

        <Grid gap={"30px"}>
          {NAV_ITEMS.map((navItem, index) => (
            <MobileNavItem key={index} uniqueKey={index} {...navItem} />
          ))}
        </Grid>
        <Flex gap={"21px"}>
          {socialIconsData.map((data, index) => (
            <Link href={data.href} key={index}>
              <Flex
                w={"40px"}
                h={"40px"}
                bg={"#ffffff"}
                borderRadius={"50%"}
                align={"center"}
                justify={"center"}
              >
                <Image src={data.icon?.src} alt={"social icons"} />
              </Flex>
            </Link>
          ))}
        </Flex>
      </Stack>
    </Flex>
  );
};

export default MobileNav;
