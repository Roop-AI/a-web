import {
  Box,
  Flex,
  useColorModeValue,
  Image,
  Button,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import DesktopNav from "../desktopNav";
import MobileNav from "../mobileNav";
import AllImages from "@/allImages";
import { useState } from "react";
import Link from "next/link";
import { LiaUserSolid } from "react-icons/lia";

const Navbar: React.FC<{ currentUserToken: string }> = (currentUserToken) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box
        zIndex={999}
        pos={"fixed"}
        w={"100%"}
        sx={{
          "@media (min-width: 1024px)": {
            display: "grid",
          },
          "@media (max-width: 1023px)": {
            display: "none",
          },
        }}
      >
        <Box
          h={"80px"}
          borderRadius={"0 0 20px 20px"}
          className="blur-background"
        >
          <Flex
            px={"7.18vw"}
            h={"100%"}
            justify={"space-between"}
            align={"center"}
          >
            <Link href={"/"}>
              <Flex align={"center"}>
                <Image
                  src={AllImages.adictoGif.src}
                  h={"58px"}
                  w={"88px"}
                  objectFit={"contain"}
                  cursor={"pointer"}
                  alt="addicto gi"
                />
                <Text
                  fontFamily="Poppins"
                  fontSize={"20px"}
                  lineHeight={"30px"}
                  color={"#ffffff"}
                >
                  Adicto.AI
                </Text>
              </Flex>
            </Link>
            <Flex justify={{ base: "center", md: "start" }}>
              <Flex>
                <DesktopNav />
              </Flex>
            </Flex>

            <Stack
              flex={{ base: 1, md: 0 }}
              justify={"flex-end"}
              direction={"row"}
              spacing={"22px"}
            >
              {/* <Link
                href={
                  "https://play.google.com/store/apps/details?id=com.aiart.jemini.nft.creator"
                }
              > */}
              <Tooltip label="Coming Soon" fontSize="14px">
                <Button
                  w={"113px"}
                  h={"38px"}
                  fontSize={"14px"}
                  letterSpacing={"1.5px"}
                  fontFamily={"Poppins"}
                  fontWeight={600}
                  bg={"transparent"}
                  color={"#19F4D4"}
                  border={"1px solid #19F4D4"}
                  borderRadius={"10px"}
                  _hover={{
                    bgGradient: "linear(to right, #19F4D4, #4658AE)",
                    color: "#ffffff",
                    border: "none",
                  }}
                >
                  Login
                </Button>
              </Tooltip>
              {/* </Link> */}
            </Stack>
          </Flex>
        </Box>

        {/* {open && <MobileNav isOpen={open} toggleOpen={toggleOpen} />} */}
      </Box>
      <Box
        pos={"fixed"}
        zIndex={10}
        w={"100%"}
        sx={{
          "@media (min-width: 1024px)": {
            display: "none",
          },
        }}
      >
        <Flex
          px={"16px"}
          h={"80px"}
          borderRadius={"0 0 20px 20px"}
          bgGradient="linear(to-b, rgba(3, 1, 7, 0.6), rgba(3, 1, 7, 0))"
          justify={"space-between"}
          align={"center"}
        >
          <Flex align={"center"}>
            <Image
              src={AllImages.adictoGif.src}
              h={"58px"}
              w={"88px"}
              objectFit={"contain"}
              cursor={"pointer"}
              alt="addicto gi"
            />
            <Text
              fontFamily="Poppins"
              fontSize={"20px"}
              lineHeight={"30px"}
              color={"#ffffff"}
            >
              Adicto.AI
            </Text>
          </Flex>
          <Flex gap={"8px"} align={"center"}>
            <Flex
              onClick={toggleOpen}
              w={"40px"}
              h={"40px"}
              borderRadius={"12px"}
              bg={"#2d2c31"}
              align={"center"}
              justify={"center"}
            >
              {!open && (
                <HamburgerIcon
                  w={6}
                  h={6}
                  color={"white"}
                  _hover={{
                    color: "white",
                  }}
                />
              )}
            </Flex>
            {/* <Link
              href={
                "https://play.google.com/store/apps/details?id=com.aiart.jemini.nft.creator"
              }
            > */}
            <Tooltip label="Coming Soon" fontSize="14px">
              <Button
                w={"113px"}
                h={"38px"}
                fontSize={"14px"}
                letterSpacing={"1.5px"}
                fontFamily={"Poppins"}
                fontWeight={600}
                bg={"transparent"}
                color={"#19F4D4"}
                border={"1px solid #19F4D4"}
                borderRadius={"20px"}
                _hover={{
                  bg: "linear(to right, #19F4D4, #4658AE)",
                }}
              >
                Login
              </Button>
            </Tooltip>
            {/* </Link> */}
          </Flex>
        </Flex>
      </Box>
      {open && <MobileNav isOpen={open} toggleOpen={toggleOpen} />}
    </>
  );
};

export default Navbar;
