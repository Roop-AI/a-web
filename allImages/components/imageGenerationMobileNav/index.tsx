import {
  Box,
  Button,
  Flex,
  Link,
  Stack,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import ImageGenerationMobileNavItem from "../imageGenerationMobileNavItem";
import IMAGEGENERATION_NAV_ITEMS from "@/data/imageGenerationNavItem";
const NAV_ITEMS = [
  {
    label: 'AI TOOLS',
    children: [
      {
        label: 'Anime',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'Reface',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
      {
        label: 'Image Enhance',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'Remix / Painting',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
      {
        label: 'Anime',
        subLabel: 'Trending Design to inspire you',
        href: '#',
      },
      {
        label: 'Image Enhance',
        subLabel: 'Up-and-coming Designers',
        href: '#',
      },
    ],
  },
  
  {
    label: 'Generate',
    href: '#',
  },
  {
    label: 'Inspirations',
    href: '#',
  },
  {
    label: 'My Creation',
    href: '#',
  },
]
interface MobileNavProps {
  isOpen: boolean;
  toggleOpen: () => void;
}
const ImageGenerationMobileNav: React.FC<MobileNavProps> = ({
  isOpen,
  toggleOpen,
}) => {
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
      overflowY={"auto"}
    >
      <Stack gap={"20px"} mx={"auto"} pt={"11vh"}>
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
              onClick={toggleOpen} // Call the toggleOpen function when CloseIcon is clicked
            />
          )}
        </Flex>

        <Box>
          {NAV_ITEMS.map((navItem, index) => (
            <ImageGenerationMobileNavItem
              key={index}
              uniqueKey={index}
              {...navItem}
            />
          ))}
        </Box>
        <Flex justify={"center"}>
          <Link href={"#"}>
            <Button
              fontSize={"sm"}
              w={"151px"}
              h={"52px"}
              fontWeight={600}
              color={"white"}
              border={"1px solid #707070"}
              borderRadius={"29px"}
              bg={"transparent"}
              _hover={{
                bg: "transparent",
              }}
            >
              Log Out
            </Button>
          </Link>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default ImageGenerationMobileNav;
