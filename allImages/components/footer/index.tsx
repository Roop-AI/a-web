import {
  Box,
  Container,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import AllImages from "@/allImages";
import FooterMenuItems from "../footerMenuItems";
import menuItems from "@/data/footerMenuItemsData";
import Link from "next/link";
import SmallFooter from "../smallFooter";

const Footer = () => {
  return (
    <>
      <Box bg={"#13161A"} color={"white"}>
        <Container
          as={Stack}
          maxW={{ base: "95%", md: "84%" }}
          mx={"auto"}
          py={"58.3px"}
          paddingInline={0}
        >
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr" }}
            spacing={8}
          >
            <Stack spacing={6}>
              <Link href={"/"}>
                <Image cursor={"pointer"} src={AllImages.addictoLogo?.src} alt="addicto logo" />
              </Link>
              <Text
                fontFamily="Poppins"
                fontWeight={300}
                fontSize={{ base: "18px", lg: "20px" }}
                w={{ lg: "486px" }}
              >
                Create Awe-Inspiring Masterpieces Effortlessly And Explore The
                Endless Possibilities Of AI Generated Art.
              </Text>
            </Stack>
            <Stack align={"flex-start"} gap={"24px"}>
              {menuItems.map((item, index) => (
                <FooterMenuItems
                  key={index}
                  uniqueKey={index}
                  href={item.href}
                  label={item.label}
                />
              ))}
            </Stack>
            <Stack
              align={"flex-start"}
              fontFamily="Poppins"
              fontWeight={600}
              fontSize={{ base: "18px", lg: "22px" }}
              spacing={"32px"}
            >
              <Box opacity={"60%"}>Drop us a line</Box>
              <Box as="a" href={"#"}>
                Press
              </Box>
              <Box opacity={"60%"}>Call Us</Box>
              <Link href="tel:8238539902">(823)853-9902</Link>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
      <SmallFooter />
    </>
  );
};

export default Footer;
