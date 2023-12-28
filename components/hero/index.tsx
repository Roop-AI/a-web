import {
  Stack,
  Flex,
  Text,
  VStack,
  Image,
  Grid,
  Box,
  Tooltip,
} from "@chakra-ui/react";
import Slider from "react-slick";
import ArtGeneratorInput from "../artGeneratorInput";
import AllImages from "@/allImages";
import AppDownloadButtons from "../appDownloadButtons";
import IsDisplayEnabled from "@/isDisplayEnable";
import ImageSlider from "../heroImageSlider";
import HeroSlideData from "@/data/heroSlideData";

const Hero: React.FC<{ firebaseConfig: any; currentUserToken: string }> = ({
  firebaseConfig,
  currentUserToken,
}) => {
  const shouldDisplay = IsDisplayEnabled();
  const settings = {
    dots: false,
    autoplay: true,
    arrows: false,
    fade: true,
    infinite: true,
    speed: 3000,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Box pos={"relative"} h={{ xl: "100vh" }} overflowY={{ xl: "hidden" }}>
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />

        <Slider {...settings}>
          {HeroSlideData.map((slide: any, index: number) => {
            return (
              <ImageSlider
                key={index}
                sliderImage={slide.image.src}
                sliderText={slide.text}
              />
            );
          })}
        </Slider>
        <Box
          pos={"absolute"}
          top={0}
          bottom={0}
          left={0}
          right={0}
          bg={"rgba(0, 0, 0, 0.7)"}
        ></Box>
        <Grid pos={"absolute"} top={0} w={"full"}>
          <Box w={{ base: "95%", lg: "866px" }} mx="auto">
            <Box h={"80px"}></Box>
            <VStack pt={"6.4vh"}>
              <Stack w={"100%"} textAlign={"center"} gap={0}>
                <Flex justify={"center"} align={"center"} gap={"22.5px"}>
                  <Image src={AllImages.flashIcon?.src} alt="flash icon" />
                  <Text
                    bgGradient="linear(to-r, #19F4D4, #5D89F9)"
                    bgClip="text"
                    fontSize={"18px"}
                    fontWeight={600}
                    fontFamily={"poppins"}
                  >
                    Turn Your Words Into Art
                  </Text>
                </Flex>
                <Stack w={{ md: "727px" }} mx={"auto"} spacing={"4.51vh"}>
                  <Text
                    color={"white"}
                    fontWeight={700}
                    fontSize={{ base: "36px", "2xl": "100px" }}
                    fontFamily={"poppins"}
                    lineHeight={{ base: 1, "2xl": 0.8 }}
                    bgGradient="linear(to-r, #19F4D4, #5D89F9)"
                    bgClip="text"
                    pt={"8.9vh"}
                  >
                    AI Art
                    <br />
                    <span
                      style={{
                        color: "#ffffff",
                      }}
                    >
                      Generator
                    </span>
                  </Text>
                  <Text
                    color={"white"}
                    textAlign={"center"}
                    fontFamily="Poppins"
                    fontWeight={300}
                    fontSize={{ base: "12px", sm: "14px", "2xl": "20px" }}
                  >
                    Adicto: Elevate creativity with this AI art generator. Input
                    vision, choose style, and unveil awe-inspiring masterpieces.
                    Explore artistic possibilities at the nexus of technology
                    and imagination.
                  </Text>
                </Stack>
                {shouldDisplay && (
                  <Flex justify={"center"} pt={"4vh"}>
                    <ArtGeneratorInput
                      firebaseConfig={firebaseConfig}
                      currentUserToken={currentUserToken}
                    />
                  </Flex>
                )}
                <Tooltip label="Coming Soon" fontSize="14px">
                  <Flex
                    className={`artGeneratorInput-background`}
                    mt={"5.16vh"}
                    gap={"9px"}
                    align={"center"}
                    mx={"auto"}
                    px={"10px"}
                    py={"4px"}
                    borderRadius={"10px"}
                    boxShadow={"0px 1px 5px #19F4D4"}
                    cursor={"pointer"}
                  >
                    <Image
                      src={AllImages.surpriseMe?.src}
                      h={"31px"}
                      alt="surprise me"
                    />

                    <Text
                      bgGradient="linear(to-r,#19F4D4, #5D89F9)"
                      bgClip="text"
                      fontSize={"14px"}
                      fontWeight={600}
                      fontFamily={"poppins"}
                    >
                      Surprise Me
                    </Text>
                  </Flex>
                </Tooltip>
                <Grid margin={"auto"} pt={"4.25vh"}>
                  <AppDownloadButtons />
                </Grid>
              </Stack>
            </VStack>
          </Box>
        </Grid>
      </Box>
    </>
  );
};

export default Hero;
