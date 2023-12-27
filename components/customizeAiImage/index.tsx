import AllImages from "@/allImages";
import {
  Grid,
  Flex,
  GridItem,
  Image,
} from "@chakra-ui/react";
import AboutAiImage from "../aboutAiImage";

const CustomizeAiImage = () => {
  return (
    <Grid
      templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2, 1fr)" }}
      gap={"99.5px"}
      pt={"149px"}
    >
      <GridItem w="100%">
        <Flex align={"center"} h={"100%"}>
          <AboutAiImage
            title="Customize Your AI Image"
            desc=" Lorem Ipsum Dolor Sit Amet, Consetetur Sadipscing Elitr, Sed Diam
            Nonumy Eirmod Tempor Invidunt Ut Labore Et Dolore Magna Aliquyam
            Erat, Sed Diam Voluptua. At Vero Eos Et Accusam Et Justo Duo
            Dolores Et Ea Rebum. Stet Clita Kasd Gubergren, No Sea Takimata
            Sanctus Est Lorem Ipsum Dolor Sit Amet. Lorem Ipsum Dolor Sit
            Amet, Consetetur Sadipscing Elitr, Sed Diam Nonumy Eirmod Tempor
            Invidunt Ut Labore Et Dolore Magna Aliquyam Erat, Sed Diam
            Voluptua. At Vero Eos Et Accusam Et Justo Duo Dolores Et Ea Rebum.
            Stet Clita Kasd Gubergren"
            descPT={"25.2px"}
            generatePT={"53.1px"}
          />
        </Flex>
      </GridItem>
      <GridItem color={"#F44EDD"} w="100%">
        <Image
          src={AllImages.groupImage?.src}
          h={"574px"}
          objectFit={"contain"}
          alt="group image"
        />
      </GridItem>
    </Grid>
  );
};

export default CustomizeAiImage;
