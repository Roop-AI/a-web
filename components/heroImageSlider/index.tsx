import { Box, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const ImageSlider = (props: any) => {
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setOpacity(1);
  }, [props.sliderImage]);

  return (
    <Box key={props.index}>
      <Image
        alt="slide images"
        minH={{ base: "800px", xl: "100vh" }}
        objectFit={"cover"}
        src={props.sliderImage}
        height="100vh"
        width="100vw"
      />
    </Box>
  );
};

export default ImageSlider;
