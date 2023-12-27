import { Stack, Flex, Text, VStack } from "@chakra-ui/react";
import ArtworkMenu from "../artworkMenu";
import CustomizeAiImage from "../customizeAiImage";
import MakeAiImage from "../makeAiImage";

const AiGeneratedArt: React.FC<{ userActivityData: any[] }> = ({
  userActivityData,
}) => {
  
  return (
    <Flex
      w={"full"}
      h={"100%"}
      bgImage={[
        "radial-gradient(4px 4px, rgba(255, 255, 255, 0.4)-100%, transparent 81%)",
      ]}
      bgSize="42px 29px"
      backgroundColor="#000000"
      sx={{
        "@media (max-width: 1300px)": {
          paddingTop: "",
        },
        "@media (min-width: 1301px) and (max-width: 1600px)": {
          paddingTop: "52%",
        },
        "@media (min-width: 1601px)": {
          paddingTop: "32%",
        },
      }}
      pb={"148px"}
    >
      <VStack
        w={"full"}
        align={"center"}
        gap={0}
        maxW={{ base: "95%", md: "84%" }}
        mx={"auto"}
      >
        <Stack textAlign={"center"} gap={0} align={"center"}>
          <Text
            pt={"13px"}
            color={"#F44EDD"}
            fontWeight={700}
            fontSize={{ base: "36px", lg: "52px" }}
          >
            Our AI-Generated Art
          </Text>
          <Text
            color={"white"}
            fontFamily="Poppins"
            w={{ lg: "727.12px" }}
            fontSize={{ base: "14px", lg: "18px" }}
          >
            Create Awe-Inspiring Masterpieces Effortlessly And Explore The
            Endless Possibilities Of AI Generated Art. Enter A Prompt, Choose A
            Style, And Watch Imagine - AI Art Generator Bring Your Ideas To
            Life!
          </Text>
        </Stack>
        <ArtworkMenu userActivityData={userActivityData} />
        <CustomizeAiImage />
        <MakeAiImage />
      </VStack>
    </Flex>
  );
};

export default AiGeneratedArt;
