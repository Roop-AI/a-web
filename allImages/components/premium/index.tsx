import { Flex, Text } from "@chakra-ui/react";
import { premiumProps } from "./premium.interface";

const Premium: React.FC<premiumProps> = (props) => {
  return (
    <Flex
      justify={"center"}
      cursor={"pointer"}
      align={"center"}
      w={props.width}
      h={props.height}
      borderRadius={props.borderRadius}
      bgGradient={"linear(to right, #3A57E6, #5A73F5)"}
      pos={"absolute"}
      top={props.top}
      right={props.right}
    >
      <Text
        fontSize={props.fontSize}
        fontFamily={"poppins"}
        color={props.color}
        fontWeight={600}
      >
        PRO
      </Text>
    </Flex>
  );
};

export default Premium;
