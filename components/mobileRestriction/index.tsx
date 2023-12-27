import {
  Box,
  Divider,
  Flex,
  Grid,
  GridItem,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import AppDownloadButtons from "../appDownloadButtons";
import AllImages from "@/allImages";

const MobileRestriction = () => {
  return (
    <Stack
      h={"100vh"}
      overflowY={"hidden"}
      bg={"#000000"}
      justify={"center"}
      align={"center"}
      display={{ base: "flex", lg: "none" }}
      pos={"relative"}
    >
      <Image
        src={AllImages.heroMobileBg.src}
        w={"100%"}
        h={"100%"}
        objectFit={"cover"}
        alt="mobile hero"
      />
      <Box
        pos={"absolute"}
        top={0}
        bottom={0}
        left={0}
        right={0}
        bg={"rgba(0, 0, 0, 0.7)"}
      ></Box>
      <Flex justify={"center"} align={"center"}>
        <Stack
          pos={"absolute"}
          top={"12vh"}
          align={"center"}
          justify={"center"}
          w={{ base: "100%", md: "52%" }}
          px={{ base: "22px", md: "0" }}
          gap={"0"}
        >
          <Image
            src={AllImages.adictoGif.src}
            w={"120px"}
            h={"120px"}
            objectFit={"cover"}
            alt="addicto gif"
          />
          <Text
            bgGradient="linear(to-r, #19F4D4, #5D89F9)"
            bgClip="text"
            fontSize={"45px"}
            fontWeight={700}
            fontFamily={"poppins"}
          >
            Adicto.Ai
          </Text>
          <Text
            textAlign={"center"}
            fontSize={"15px"}
            fontFamily={"poppins"}
            color={"white"}
            lineHeight={"20px"}
          >
            Adicto.ai web is only available on desktop. Sign in from your
            desktop to use adicto.ai web
          </Text>
          <Flex w={"100%"} gap={"6px"} align={"center"} pt={"47px"}>
            <Divider border={"1px solid #19F4D4"} orientation="horizontal" />

            <Flex
              color={"#ffffff"}
              fontSize={"15px"}
              fontFamily={"poppins"}
              w={"80px"}
              textAlign={"center"}
              mx={"auto"}
              lineHeight={"15px"}
            >
              Available on
            </Flex>

            <Divider border={"1px solid #19F4D4"} orientation="horizontal" />
          </Flex>
          <Grid margin={"auto"} pt={"42px"}>
            <AppDownloadButtons />
          </Grid>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default MobileRestriction;
