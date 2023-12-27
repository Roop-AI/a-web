import IMAGEGENERATION_NAV_ITEMS from "@/data/imageGenerationNavItem";
import { Grid, Stack, Divider, Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ImageGenerationDesktopNav = () => {
  const [activeItem, setActiveItem] = useState(0);
  const router = useRouter();

  // Set active item based on the current path
  useEffect(() => {
    const activeIndex = IMAGEGENERATION_NAV_ITEMS.findIndex(
      (navItem) => navItem.href === router.asPath
    );

    if (activeIndex !== -1) {
      setActiveItem(activeIndex);
    } else {
      // If the current path is not found in the navigation items, set the default active item
      setActiveItem(0);
    }
  }, [router.asPath]);

  // Handle item click
  const handleItemClick = (index: number) => {
    setActiveItem(index);
  };

  // Handle item click

  return (
    <Stack direction={"row"} gap={0}>
      {IMAGEGENERATION_NAV_ITEMS.map((navItem, index) => (
        <Flex
          align={"center"}
          key={navItem.label}
          onClick={() => handleItemClick(index)}
        >
          <Link href={navItem.href ?? "#"}>
            <Grid
              fontFamily="Poppins"
              fontSize="15px"
              fontWeight={activeItem === index ? 600 : 300}
              color={"white"}
              _hover={{
                textDecoration: "none",
                color: "#ffffff",
              }}
            >
              <Flex>
                <Text
                  pb={"5px"}
                  borderBottom={
                    activeItem === index ? "1px solid #19F4D4" : "none"
                  }
                >
                  {navItem.label}
                </Text>

                <Stack
                  direction="row"
                  pr={{
                    lg:
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "14px"
                        : "0",
                    xl:
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "35px"
                        : "0",
                    "2xl":
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "71px"
                        : "0",
                  }}
                  pl={{
                    lg:
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "14px"
                        : "0",
                    xl:
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "35px"
                        : "0",
                    "2xl":
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "71px"
                        : "0",
                  }}
                >
                  <Divider
                    borderColor={
                      index !== IMAGEGENERATION_NAV_ITEMS.length - 1
                        ? "#ffffff"
                        : "rgba(3, 1, 7, 1)"
                    }
                    orientation="vertical"
                  />
                </Stack>
              </Flex>
            </Grid>
          </Link>
        </Flex>
      ))}
    </Stack>
  );
};

export default ImageGenerationDesktopNav;
