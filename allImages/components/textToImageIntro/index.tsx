import {
  Flex,
  Box,
} from "@chakra-ui/react";
import AboutTextToImage from "../aboutTextToImage";

function TextToImageIntro() {
  return (
    <Flex w={"full"} h={"100%"} backgroundColor="#000000" pb={"148px"}>
      <Box maxW={{ base: "95%", md: "84%" }} mx={"auto"}>
        <AboutTextToImage />
      </Box>
    </Flex>
  );
}

export default TextToImageIntro;
