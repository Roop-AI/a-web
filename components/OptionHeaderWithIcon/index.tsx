import AllImages from "@/allImages";
import { Flex, Image, Text } from "@chakra-ui/react";

const OptionHeaderWithIcon: React.FC<{
  title: string;
  stepsValue?: number;
}> = ({ title, stepsValue }) => {
  return (
    <Flex px={{ lg: "10px", "2xl": "25px" }} justify={"space-between"}>
      <Flex gap={"20px"} align={"center"}>
        <Text
          color={"#FFFFFF"}
          fontFamily="Poppins"
          fontWeight={500}
          fontSize={{ lg: "14px", "2xl": "16px" }}
        >
          {title}
        </Text>
        {stepsValue && (
          <Text color={"white"} textAlign={"right"}>
            {stepsValue}
          </Text>
        )}
      </Flex>
      <Image objectFit={"contain"} src={AllImages.impIcon.src} alt="imp icon" />
    </Flex>
  );
};

export default OptionHeaderWithIcon;
