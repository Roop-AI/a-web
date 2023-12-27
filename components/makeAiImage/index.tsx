import AllImages from "@/allImages";
import {
  Flex,
  Grid,
  Box,
  GridItem,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import AboutAiImage from "../aboutAiImage";

const MakeAiImage = () => {
  const shouldDisplayImage = useBreakpointValue({ base: false, lg: true });
  return (
    <Flex
      w={"full"}
      h={"100%"}
      border={"1px solid rgba(112, 112, 112, 0.5)"}
      borderRadius={"10px"}
      mt={"157px"}
    >
      <Grid templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}>
        <GridItem
          color={"#F44EDD"}
          w="100%"
          backgroundColor="#000000"
          py={"6%"}
          px={"4%"}
          pos={"relative"}
          borderRadius={"10px"}
          zIndex={10}
        >
          {shouldDisplayImage && (
            <Box>
              <Image
                src={AllImages.makeAiImageMaskTop?.src}
                alt="purpleMask"
                pos={"absolute"}
                top={0}
                left={"0"}
                w={"468px"}
                overflow={"hidden"}
                zIndex={20}
              />
              <Image
                src={AllImages.makeAiImageMaskBottomRight?.src}
                alt="orangeMask"
                pos={"absolute"}
                bottom={0}
                w={"468px"}
                right={0}
                zIndex={20}
              />
            </Box>
          )}
          <Grid gap={6} mx={"auto"} w={"100%"}>
            <Grid templateColumns="repeat(1, 1fr)" gap={6}>
              <GridItem w="100%" h={"346px"} justifySelf={"center"}>
                <Image
                  src={AllImages.TalentSearch1?.src}
                  borderRadius={"24px"}
                  objectFit={"cover"}
                  h={"346px"}
                  mx={"auto"}
                  alt="group image"
                />
              </GridItem>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" gap={6} mx={"auto"}>
              <GridItem h={{ xl: "367px" }}>
                <Image
                  src={AllImages.TalentSearch?.src}
                  borderRadius={"24px"}
                  h={"100%"}
                  w={"100%"}
                  objectFit={"cover"}
                  mx={"auto"}
                  alt="group image"
                />
              </GridItem>

              <GridItem h={{ xl: "367px" }}>
                <Image
                  src={AllImages.TalentSearch4?.src}
                  borderRadius={"24px"}
                  objectFit={"cover"}
                  h={"100%"}
                  w={"100%"}
                  mx={"auto"}
                  alt="group image"
                />
              </GridItem>
            </Grid>
          </Grid>
        </GridItem>
        <GridItem
          w="100%"
          backgroundColor="#000000"
          pos={"relative"}
          borderRadius={"10px"}
        >
          {shouldDisplayImage && (
            <Box>
              <Image
                src={AllImages.makeAiImageMaskTop2?.src}
                alt="purpleMask"
                pos={"absolute"}
                top={0}
                left={"0"}
                overflow={"hidden"}
              />
            </Box>
          )}
          <Flex align={"center"} h={"100%"} px={"7%"}>
            <AboutAiImage
              title="Making AI images is Easy and Safe"
              desc="Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata Sanctus Est Lorem Ipsum Dolor Sit Amet"
              descPT={"8%"}
              generatePT={"8%"}
            />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default MakeAiImage;
