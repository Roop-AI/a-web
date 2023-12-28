import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Image,
  Skeleton,
  Center,
  Button,
  Flex,
  Grid,
  Text,
  MenuItem,
  MenuList,
  Menu,
  MenuButton,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { useState } from "react";
import Slider from "react-slick";
import AllImages from "@/allImages";

const settings = {
  dots: false,
  arrows: false,
  fade: true,
  infinite: false,
  autoplay: false,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
interface GeneratedImagesCarauselInterface {
  initialLoad: boolean;
  loading: boolean;
  responseDataImages: [];
  onImageGenerated: any;
  handleRemoveBackground: any;
  handleUpscale: any;
  ClarifyHandsInImage: any;
  isInspiration: boolean;
  latestSelectedImages?: string[];
  showLatestImage: boolean;
}
const GeneratedImagesCarausel: React.FC<GeneratedImagesCarauselInterface> = (
  props
) => {
  const [slider, setSlider] = useState<any>(null);
  const top = useBreakpointValue({ lg: "50%" });
  const side = useBreakpointValue({ lg: "0.59%" });
  const shouldRenderArrows =
    props.responseDataImages.length > 1 ||
    (props.latestSelectedImages && props.latestSelectedImages.length > 1);
  console.log("props.latestSelectedImages", props.latestSelectedImages);

  return (
    <Box position={"relative"} overflow={"hidden"}>
      {/* CSS files for react-slick */}
      {/* <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      /> */}
      {/* {shouldRenderArrows && (
        <>
          <Flex
            justify={"center"}
            align={"center"}
            w={"33px"}
            h={"33px"}
            borderRadius={"50%"}
            cursor={"pointer"}
            aria-label="left-arrow"
            position="absolute"
            left={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickPrev()}
            bg={"#FFFFFF"}
          >
            <Image src={AllImages.rightIcon?.src} h={"15px"} alt="prev" />
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            w={"33px"}
            h={"33px"}
            borderRadius={"50%"}
            cursor={"pointer"}
            aria-label="right-arrow"
            position="absolute"
            right={side}
            top={top}
            transform={"translate(0%, -50%)"}
            zIndex={2}
            onClick={() => slider?.slickNext()}
            bg={"#FFFFFF"}
          >
            <Image src={AllImages.leftIcon?.src} alt="prev" />
          </Flex>
        </>
      )} */}

      {props.initialLoad ? (
        <>
          <Image
            mt={"13vh"}
            w={"32vw"}
            h={"39vh"}
            src={AllImages.genImages.src}
            alt="gen images"
            objectFit={"contain"}
          />
        </>
      ) : props.loading ? (
        <Skeleton
          mt={"13vh"}
          w={"32vw"}
          h={"39vh"}
          startColor="#3D3E41"
          endColor="#2B2C2F"
        />
      ) : props.showLatestImage ? (
        <Flex w={"70vw"} mx={"auto"} justify={"center"}>
          <Wrap spacing={"12px"}>
            {props.latestSelectedImages?.map((images, index) => {
              return (
                <WrapItem key={index}>
                  <Grid
                    mt={"5.7vh"}
                    maxW={"25vw"}
                    borderRadius="20px"
                    p={"15px 15px 3px 15px"}
                    border="1px solid #303030"
                    background="rgba(25, 19, 36, 0.70)"
                  >
                    <Image
                      src={`data:image/jpeg;base64,${images}`}
                      objectFit={"contain"}
                      borderRadius={"10px"}
                      mx={"auto"}
                      maxW={"20vw"}
                      h={"53vh"}
                      alt="generated image"
                    />
                    <Flex py={"22px"} justify={"center"} gap={"31px"}>
                      <Menu>
                        <MenuButton
                          px={0}
                          bg={"#393E4B"}
                          _hover={{
                            bg: "#393E4B",
                          }}
                          border={"1px solid rgba(112, 112, 112, 0.2)"}
                          h={"44px"}
                          w={"9vw"}
                          color={"white"}
                          as={Button}
                        >
                          <Flex align={"center"} justify={"center"} gap={"9px"}>
                            <Image
                              objectFit={"cover"}
                              src={AllImages.magicEdit.src}
                              alt="magic"
                            />
                            <Text
                              fontFamily="Poppins"
                              fontSize={"13px"}
                              fontWeight={500}
                            >
                              Magic Edit
                            </Text>
                          </Flex>
                        </MenuButton>
                        <MenuList
                          bg={"rgba(57, 62, 75, 0.5)"}
                          backdropFilter={"blur(50px) brightness(4)"}
                          border={"0.2px solid rgba(112, 112, 112, 0.2)"}
                          color={"white"}
                          fontSize={"12px"}
                          fontFamily={"poppins"}
                          fontWeight={500}
                        >
                          <MenuItem
                            bg={"none"}
                            onClick={() => props.handleRemoveBackground(images)}
                          >
                            Remove Background
                          </MenuItem>
                          <MenuItem
                            bg={"none"}
                            onClick={() =>
                              props.handleUpscale(
                                images,
                                "latest Images Upscale",
                                index
                              )
                            }
                          >
                            Upscale
                          </MenuItem>
                          <MenuItem
                            bg={"none"}
                            onClick={() =>
                              props.ClarifyHandsInImage("Clarify Hands")
                            }
                          >
                            Hand
                          </MenuItem>
                        </MenuList>
                      </Menu>
                      <Button
                        bg={"#4362B0"}
                        _hover={{
                          bg: "#4362B0",
                        }}
                        _active={{
                          bg: "#4362B0",
                        }}
                        h={"44px"}
                        w={"9vw"}
                        px={0}
                        color={"white"}
                        onClick={() => props.onImageGenerated(images)}
                      >
                        <Flex align={"center"} gap={"9px"}>
                          <Image
                            objectFit={"cover"}
                            src={AllImages.downloadHd.src}
                            alt="download"
                          />
                          <Text
                            fontFamily="Poppins"
                            fontSize={"13px"}
                            fontWeight={500}
                          >
                            Download
                          </Text>
                        </Flex>
                      </Button>
                    </Flex>
                  </Grid>
                </WrapItem>
              );
            })}
          </Wrap>
        </Flex>
      ) : props.responseDataImages.length > 0 ? (
        props.responseDataImages.map((images, index) => {
          return (
            <Grid
              key={index}
              mt={"5.7vh"}
              borderRadius="20px"
              p={"15px 15px 3px 15px"}
              border="1px solid #303030"
              background="rgba(25, 19, 36, 0.70)"
            >
              <Image
                src={
                  props.isInspiration
                    ? images
                    : `data:image/jpeg;base64,${images}`
                }
                objectFit={"contain"}
                borderRadius={"10px"}
                mx={"auto"}
                w={"100%"}
                h={"53vh"}
                alt="generated image"
              />
              {/* {props.onImageGenerated && props.onImageGenerated(images)} */}
              <Flex py={"22px"} justify={"center"} gap={"31px"}>
                <Menu>
                  <MenuButton
                    px={0}
                    bg={"#393E4B"}
                    _hover={{
                      bg: "#393E4B",
                    }}
                    border={"1px solid rgba(112, 112, 112, 0.2)"}
                    h={"44px"}
                    w={"152px"}
                    color={"white"}
                    as={Button}
                  >
                    <Flex align={"center"} justify={"center"} gap={"9px"}>
                      <Image
                        objectFit={"cover"}
                        src={AllImages.magicEdit.src}
                        alt="magic"
                      />
                      <Text
                        fontFamily="Poppins"
                        fontSize={"13px"}
                        fontWeight={500}
                      >
                        Magic Edit
                      </Text>
                    </Flex>
                  </MenuButton>
                  <MenuList
                    bg={"rgba(57, 62, 75, 0.5)"}
                    backdropFilter={"blur(50px) brightness(4)"}
                    border={"0.2px solid rgba(112, 112, 112, 0.2)"}
                    color={"white"}
                    fontSize={"12px"}
                    fontFamily={"poppins"}
                    fontWeight={500}
                  >
                    <MenuItem
                      bg={"none"}
                      onClick={() => props.handleRemoveBackground(images)}
                    >
                      Remove Background
                    </MenuItem>
                    {/* <MenuItem bg={"none"}>Cleanup Imperfections</MenuItem> */}
                    <MenuItem
                      bg={"none"}
                      onClick={() => props.handleUpscale(images)}
                    >
                      Upscale
                    </MenuItem>
                    {/* <MenuItem bg={"none"}>Crop</MenuItem> */}
                    {/* <MenuItem bg={"none"}>Replace Background</MenuItem> */}
                    <MenuItem
                      bg={"none"}
                      onClick={() => props.ClarifyHandsInImage("Clarify Hands")}
                    >
                      Hand
                    </MenuItem>
                  </MenuList>
                </Menu>
                <Button
                  bg={"#4362B0"}
                  _hover={{
                    bg: "#4362B0",
                  }}
                  _active={{
                    bg: "#4362B0",
                  }}
                  h={"44px"}
                  w={"152px"}
                  px={0}
                  color={"white"}
                  onClick={() => props.onImageGenerated(images)}
                >
                  <Flex align={"center"} gap={"9px"}>
                    <Image
                      objectFit={"cover"}
                      src={AllImages.downloadHd.src}
                      alt="download"
                    />
                    <Text
                      fontFamily="Poppins"
                      fontSize={"13px"}
                      fontWeight={500}
                    >
                      Download
                    </Text>
                  </Flex>
                </Button>
              </Flex>
            </Grid>
          );
        })
      ) : (
        <Center mt={"13vh"} w={"32vw"} h={"39vh"} color="white">
          No data found to display
        </Center>
      )}
    </Box>
  );
};

export default GeneratedImagesCarausel;
