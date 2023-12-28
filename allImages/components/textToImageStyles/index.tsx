import {
  Box,
  Flex,
  GridItem,
  Image,
  Skeleton,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
interface TextToImageStylesInterface {
  key: number;
  uniqueKey: number;
  icon: string;
  setSelectedStyleImageIndex?: any;
  handleStyleClick: (
    uniqueKey: number,
    stylesTitle: string,
    stylesName: string
  ) => void;
  selectedStyleImageIndex: number;
  title: string;
  stylesName: string;
}
const TextToImagestyles: React.FC<TextToImageStylesInterface> = (props) => {
  // State to track whether the image has been loaded
  const [imageLoaded, setImageLoaded] = useState(false);
  // Function to be called when the image has finished loading
  useEffect(() => {
    const image = new window.Image();
    image.src = props.icon;

    if (image.complete) {
      // The image is already completely loaded
      setImageLoaded(true);
    } else {
      // The image is still loading
      image.onload = () => {
        setImageLoaded(true);
      };
    }
  }, [props.icon]);

  return (
    <>
      {!props.icon ? (
        <Skeleton
          startColor="#3D3E41"
          endColor="#2B2C2F"
          w={"87px"}
          h={"87px"}
        />
      ) : (
        <GridItem
          key={props.uniqueKey}
          onClick={() =>
            props.handleStyleClick(
              props.uniqueKey,
              props.title,
              props.stylesName
            )
          }
        >
          <Box pos={"relative"}>
            {imageLoaded ? (
              <Image
                src={props.icon}
                w={"87px"}
                h={"87px"}
                border={
                  props.selectedStyleImageIndex === props.uniqueKey
                    ? "1px solid #19F4D4"
                    : "1px solid rgba(25, 19, 36, 1)"
                }
                borderRadius={"10px"}
                cursor={"pointer"}
                alt="model"
              />
            ) : (
              <Skeleton
                startColor="#3D3E41"
                endColor="#2B2C2F"
                w={"87px"}
                h={"87px"}
              />
            )}
            <Box
              pos={"absolute"}
              top={0}
              left={0}
              w={"87px"}
              h={"87px"}
              bgGradient={
                "linear(to top, rgba(25, 19, 36, 1), rgba(25, 19, 36, 0))"
              }
              borderRadius={"10px"}
              // border={"1px solid #FF5CE9"}
            ></Box>
            {/* {imageLoaded && ( */}

            <Text
              pos={"absolute"}
              color={"#ffffff"}
              bottom={"3px"}
              w={"100%"}
              textAlign={"center"}
              fontFamily="Poppins"
              fontSize={"12px"}
              maxWidth="87px"
              fontWeight={500}
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
              title={props.title} // Add this line
            >
              {props.title}
            </Text>

            {/* )} */}
          </Box>
        </GridItem>
      )}
    </>
  );
};

export default TextToImagestyles;
