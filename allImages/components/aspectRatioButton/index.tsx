import { Flex, Image, MenuItem, Text } from "@chakra-ui/react";
import { AspectRatioButtonInterface } from "./aspectRatioButtonInterface";
import AllImages from "@/allImages";

const AspectRatioButton: React.FC<AspectRatioButtonInterface> = (props) => {
  return (
    <MenuItem
      key={props.uniqueKey}
      className="aspectRatio-background menuItemStyling"
      color={"white"}
      p={0}
      h={"51px"}
      onClick={() => {
        !props.isPro && props.uniqueKey && props.onButtonClick();
        props.isPro &&
          props.handleAspectRatioChange(
            props.uniqueKey,
            props.width,
            props.height,
            props.ratio,
            props.imgSrc
          );
      }}
    >
      <Flex
        justify={"space-between"}
        align={"center"}
        h={"fill-available"}
        w={"100%"}
        margin="4px"
        borderRadius="8px"
        px={"12px"}
        py={"11px"}
        _hover={{
          margin: "4px",
          bg: "#1A1228",
          borderRadius: "8px",
        }}
      >
        <Text fontFamily={"poppins"} fontWeight={500} fontSize={"12px"}>
          {props.ratio}
        </Text>
        <Flex gap={"10px"}>
          {props.uniqueKey !== 0 && !props.isPro && (
            <Image
              src={AllImages.premiumVector.src}
              objectFit={"contain"}
              alt="premium"
            />
          )}
          <Image src={props.imgSrc.src} alt="premium" />
        </Flex>
      </Flex>
    </MenuItem>
  );
};

export default AspectRatioButton;
