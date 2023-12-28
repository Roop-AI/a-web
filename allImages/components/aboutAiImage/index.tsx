import AllImages from "@/allImages";
import { Text, Flex, Image, Box } from "@chakra-ui/react";
interface AboutAiImageInterface {
  title: string;
  desc: string;
  descPT: string;
  generatePT: string;
}
const AboutAiImage: React.FC<AboutAiImageInterface> = (props) => {
  return (
    <Box>
      <Text
        color={"#F44EDD"}
        fontWeight={700}
        fontSize={{ base: "36px", lg: "52px" }}
      >
        {props.title}
      </Text>{" "}
      <Text
        color={"white"}
        fontFamily="Poppins"
        fontWeight={300}
        pt={props.descPT}
        fontSize={{ base: "14px", lg: "18px" }}
      >
        {props.desc}
      </Text>
      <Flex gap={"25px"} pt={props.generatePT}>
        <Text
          color={"#F44EDD"}
          fontSize={"22px"}
          fontFamily={"poppins"}
          fontWeight={600}
        >
          Generate AI Image
        </Text>
        <Image src={AllImages.arrowLeft?.src} alt="left arrow" />
      </Flex>
    </Box>
  );
};

export default AboutAiImage;
