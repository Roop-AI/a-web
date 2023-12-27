import { Button, Box, Flex, Stack, Text } from "@chakra-ui/react";
import DataDisplay from "../dataDisplay";
import { useState } from "react";
import aiGeneratedArtData from "@/data/aiGeneratedArtData";

interface UserActivityData {
  id: string;
  rating: number;
  users: number;
  generatedImages: number;
}

interface ArtworkMenuProps {
  userActivityData: UserActivityData[];
}
const ArtworkMenu: React.FC<ArtworkMenuProps> = ({ userActivityData }) => {
  const [selectedButton, setSelectedButton] = useState<number | null>(0);

  const aiGeneratedArtNames = ["Art", "Realistic", "Anime"];

  const handleButtonClick = (buttonIndex: number) => {
    setSelectedButton(buttonIndex);
  };

  const formatNumber = (number: number) => {
    if (number >= 1000) {
      const flooredNumber = Math.floor(number / 1000);
      return flooredNumber + "K+";
    }
    return number;
  };

  return (
    <Box pt={"41px"}>
      <Flex gap={{ sm: "10px", md: "81px" }} justify={"center"}>
        {aiGeneratedArtNames.map((data, index) => (
          <Button
            key={index}
            onClick={() => handleButtonClick(index)}
            bg={"transparent"}
            color={selectedButton === index ? "#F44EDD" : "#ffffff"}
            borderWidth={selectedButton === index ? "1px" : ""}
            borderColor={selectedButton === index ? "#F44EDD" : "none"}
            fontFamily="Poppins"
            fontWeight={600}
            fontSize={{ base: "14px", lg: "22px" }}
            _hover={{
              bgColor: "transparent",
            }}
          >
            {data}
          </Button>
        ))}
      </Flex>

      <Box
        display={{ base: "grid", md: "flex" }}
        justifyContent={"center"}
        gap={"20px"}
        pt={"49px"}
      >
        {selectedButton !== null &&
          aiGeneratedArtData[selectedButton].images.map(
            (imageData: any, index: any) => (
              <DataDisplay key={index} image={imageData.image} />
            )
          )}
      </Box>

      {userActivityData && (
        <Flex
          color={"white"}
          justify={{ lg: "flex-end" }}
          gap={"6%"}
          mt={"80px"}
        >
          <Stack>
            <Text
              fontFamily={"poppins"}
              fontSize={{ base: "25px", sm: "49px" }}
              fontWeight={600}
            >
              {formatNumber(userActivityData[0]?.users)}
            </Text>
            <Text
              fontFamily={"poppins"}
              fontSize={{ base: "12px", sm: "18px" }}
            >
              Users
            </Text>
          </Stack>
          <Stack>
            <Text
              fontFamily={"poppins"}
              fontSize={{ base: "25px", sm: "49px" }}
              fontWeight={600}
            >
              {formatNumber(userActivityData[0]?.generatedImages)}
            </Text>
            <Text
              fontFamily={"poppins"}
              fontSize={{ base: "12px", sm: "18px" }}
            >
              Images Generated
            </Text>
          </Stack>
          {/* <Stack>
            <Text
              fontFamily={"poppins"}
              fontSize={{ base: "25px", sm: "49px" }}
              fontWeight={600}
            >
              {formatNumber(userActivityData[0].rating)}
            </Text>
            <Text
              fontFamily={"poppins"}
              fontSize={{ base: "12px", sm: "18px" }}
            >
              Rating
            </Text>
          </Stack> */}
        </Flex>
      )}
    </Box>
  );
};

export default ArtworkMenu;
