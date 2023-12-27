import AllImages from "@/allImages";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import AboutAiImage from "../aboutAiImage";

const AboutTextToImage = () => {
  const shouldDisplayImage = useBreakpointValue({ base: false, lg: true });

  return (
    <Flex
      w={"full"}
      h={"100%"}
      border={"1px solid rgba(112, 112, 112, 0.5)"}
      borderRadius={"10px"}
      backgroundSize={"cover"}
      backgroundPosition={"center center"}
    >
      <Grid templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(2, 1fr)" }}>
        <GridItem
          w="100%"
          px={"7%"}
          bg={"#1E1F22"}
          pos={"relative"}
          borderRadius={"10px 0 0 10px"}
          py={"7%"}
        >
          {shouldDisplayImage && (
            <Box>
              <Image
                src={AllImages.textToImageMask?.src}
                alt="purpleMask"
                pos={"absolute"}
                top={0}
                right={"0"}
                overflow={"hidden"}
              />
            </Box>
          )}
          <Flex align={"center"} h={"100%"}>
            <AboutAiImage
              title="Text To Image AI Generator Introduction"
              desc="Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet"
              descPT={"10%"}
              generatePT={"13%"}
            />
          </Flex>
        </GridItem>
        <GridItem
          color={"#F44EDD"}
          w="100%"
          px={"5%"}
          bg={"#1E1F22"}
          pos={"relative"}
          borderRadius={"0 10px 10px 0"}
          py={"7%"}
        >
          {shouldDisplayImage && (
            <>
              <Box>
                <Image
                  src={AllImages.textToImageMaskTopRight?.src}
                  alt="purpleMask"
                  pos={"absolute"}
                  top={0}
                  right={"0"}
                  overflow={"hidden"}
                />
              </Box>
              <Box>
                <Image
                  src={AllImages.textToImageMaskBottomRight?.src}
                  alt="purpleMask"
                  pos={"absolute"}
                  bottom={0}
                  right={"0"}
                  overflow={"hidden"}
                />
              </Box>
              <Box>
                <Image
                  src={AllImages.textToImageMaskBottomLeft?.src}
                  alt="purpleMask"
                  pos={"absolute"}
                  bottom={0}
                  left={"0"}
                  overflow={"hidden"}
                />
              </Box>
            </>
          )}
          <Grid
            templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
            gap={6}
            m={"auto"}
          >
            <GridItem borderRadius={"24px"}>
              <Image
                src={AllImages.TalentSearch3?.src}
                borderRadius={"24px"}
                objectFit={"contain"}
                h={{ lg: "710px" }}
                w={"100%"}
                alt="group image"
              />
            </GridItem>
            <GridItem borderRadius={"24px"}>
              <Image
                src={AllImages.sas?.src}
                borderRadius={"24px"}
                objectFit={"contain"}
                h={{ lg: "710px" }}
                w={"100%"}
                alt="group image"
              />
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default AboutTextToImage;
