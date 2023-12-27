import AllImages from "@/allImages";
import { Box, Flex, Grid, Image, Stack, Text } from "@chakra-ui/react";

const GeneratedImagesHistory: React.FC<{
  latestGeneratedImages: any;
  handleLatestImageClick: (latestImagesData: any, index: number) => void;
}> = ({ latestGeneratedImages, handleLatestImageClick }) => {
  let cumulativeHeight = 0;
  console.log("props.latestGeneratedImages", latestGeneratedImages);

  return (
    <Stack
      spacing={"0.6vh"}
      px="1.8vw"
      style={{
        maxHeight: "calc(100vh - 240px)",
      }}
    >
      {latestGeneratedImages.map((latestImagesData: any, index: any) => {
        const imagesArray = Array.isArray(latestImagesData.images)
          ? latestImagesData.images
          : [latestImagesData.images];

        return (
          <Grid gap={"0.52vh"} key={index} height={"100%"}>
            {index > 0 && (
              <Box
                h={(cumulativeHeight += 80)}
                w={"100%"}
                key={`gap-${index}`}
              ></Box>
            )}

            {imagesArray.map((image: string, imageIndex: number) => {
              if (imageIndex < 2) {
                cumulativeHeight += 5;
              }

              return (
                <>
                  <Image
                    border={"2px solid #0A011A"}
                    key={`${index}-${imageIndex}`}
                    src={`data:image/jpeg;base64,${image}`}
                    borderRadius={"8px"}
                    mx={"auto"}
                    alt={`generated image ${imageIndex + 1}`}
                    onClick={() =>
                      handleLatestImageClick(latestImagesData, index)
                    }
                    style={{
                      position: "absolute",
                      top: `${cumulativeHeight}px`,
                      zIndex: `${index * imagesArray.length + imageIndex}`,
                    }}
                  />
                  {imageIndex === imagesArray.length - 1 && (
                    <Flex
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: "50%",
                        transform: "translateX(-50%)",
                        zIndex: 999,
                      }}
                    >
                      <Flex
                        w={"24px"}
                        h={"24px"}
                        borderRadius={"50%"}
                        bg={"black"}
                        align={"center"}
                        justify={"center"}
                      >
                        <Text fontSize="15px" color="white" textAlign="center">
                          {imagesArray.length}
                        </Text>
                      </Flex>
                    </Flex>
                  )}
                </>
              );
            })}
          </Grid>
        );
      })}
    </Stack>
  );
};

export default GeneratedImagesHistory;
