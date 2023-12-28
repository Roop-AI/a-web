import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Text,
  useBreakpointValue,
  Box,
  Flex,
  Image,
  Grid,
  Divider,
  Button,
} from "@chakra-ui/react";
import AllImages from "@/allImages";
import IsDisplayEnabled from "@/isDisplayEnable";

interface SampleArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

interface UserReview {
  imgSrc?: { src: string; alt: string };
  rating: number;
  comments: string;
  name: string;
}

interface TestimonialsProps {
  userReviewsData: UserReview[];
}
const SampleNextArrow: React.FC<
  SampleArrowProps & {
    currentSlide: number;
    setCurrentSlide: Function;
    slideDataLength: number;
    lg: boolean;
    xl: boolean;
  }
> = (props) => {
  const { onClick, currentSlide, setCurrentSlide, slideDataLength, lg, xl } =
    props;

  const hasForwardData = xl
    ? currentSlide + 1.5 < slideDataLength - 1
    : lg
    ? currentSlide + 1 < slideDataLength - 1
    : currentSlide < slideDataLength - 1;

  const buttonStyle = {
    backgroundColor: hasForwardData ? "#C5C5C4" : "transparent",
    border: "1px solid #FFFFFF",
    borderRadius: "50%",
  };

  const handleNext = (event: any) => {
    event.preventDefault();
    if (hasForwardData) {
      setCurrentSlide(currentSlide + 1);
      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <Button
      style={buttonStyle}
      w={"38px"}
      h={"38px"}
      pos={"absolute"}
      right={"160px"}
      top={"345px"}
      onClick={handleNext}
    >
      <Image
        src={
          hasForwardData ? AllImages.leftIcon.src : AllImages.nextIconWhite.src
        }
        alt="prev icon"
      />
    </Button>
  );
};

const SamplePrevArrow: React.FC<
  SampleArrowProps & { currentSlide: number; setCurrentSlide: Function }
> = (props) => {
  const { onClick, currentSlide, setCurrentSlide } = props;

  const hasPreviousData = currentSlide > 0;

  const buttonStyle = {
    backgroundColor: hasPreviousData ? "#C5C5C4" : "transparent",
    border: "1px solid #FFFFFF",
    borderRadius: "50%",
  };

  const handlePrev = (event: any) => {
    event.preventDefault();
    if (hasPreviousData) {
      setCurrentSlide(currentSlide - 1);
      if (onClick) {
        onClick(event);
      }
    }
  };

  return (
    <Button
      style={buttonStyle}
      w={"38px"}
      h={"38px"}
      pos={"absolute"}
      right={"217px"}
      top={"345px"}
      onClick={handlePrev}
    >
      <Image
        src={
          hasPreviousData
            ? AllImages.rightIcon.src
            : AllImages.prevIconWhite.src
        }
        alt="prev icon"
      />
    </Button>
  );
};

const Testimonials: React.FC<TestimonialsProps> = ({ userReviewsData }) => {
  const shouldDisplay = IsDisplayEnabled();

  const slidesToShow = useBreakpointValue({
    base: 1,
    lg: 2,
    "2xl": 2.5,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const isLG = slidesToShow === 2;
  const isXL = slidesToShow === 2.5;
  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    nextArrow: (
      <SampleNextArrow
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
        slideDataLength={userReviewsData.length}
        lg={isLG}
        xl={isXL}
      />
    ),
    prevArrow: (
      <SamplePrevArrow
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
    ),
  };

  return (
    <Box bg={"black"} pt={"105px"} pb={"192px"}>
      <Flex
        gap={"12.3px"}
        align={"center"}
        maxW={{ base: "95%", md: "84%" }}
        mx={"auto"}
        pb={"69.9px"}
      >
        <Image src={AllImages.testimonial?.src} alt="testimonial" />
        <Text
          color={"white"}
          fontFamily="Poppins"
          fontWeight={600}
          fontSize={"22px"}
        >
          TESTIMONIALS
        </Text>
      </Flex>
      {shouldDisplay ? (
        <Slider {...settings}>
          {userReviewsData.map((reviews, index) => (
            <Box key={index}>
              <Flex
                bg={"#1E1F22"}
                px={"8%"}
                py={"15px"}
                borderRadius={"0px 20px 20px 0px"}
                maxH={{ xl: "225px" }}
                minH={{ xl: "225px" }}
                mr={"7%"}
                position="relative"
                gap={{ base: "10px", md: "40.2px" }}
              >
                <Image
                  maxW="180px"
                  maxH={{ base: "180px", md: "252px" }}
                  bg={reviews.imgSrc ? "" : "#77919D"}
                  borderRadius="20px"
                  my="auto"
                  objectFit="cover"
                  src={
                    reviews.imgSrc
                      ? reviews.imgSrc.src
                      : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' margin='auto' viewBox='0 0 100 100'%3E%3Ctext x='35' y='60 ' font-size='40' font-weight='bold' fill='white'%3E${reviews.name[0]}%3C/text%3E%3C/svg%3E`
                  }
                  alt="reviewer"
                />
                <Grid>
                  <Divider
                    mt={"24.1px"}
                    width="50px"
                    h={"2px"}
                    borderColor="#497BFD"
                    orientation="horizontal"
                  />
                  <Text
                    color={"white"}
                    fontFamily="Poppins"
                    fontWeight={500}
                    fontSize={{ base: "20px", lg: "24px" }}
                  >
                    {reviews.name}
                  </Text>
                  <Text
                    color={"white"}
                    fontFamily="Poppins"
                    fontWeight={300}
                    fontSize={"14px"}
                  >
                    {reviews.comments}
                  </Text>
                  <Flex gap={"3.2px"}>
                    {Array.from({ length: reviews.rating }, (_, i) => (
                      <Image
                        key={i}
                        h={"18px"}
                        src={AllImages.starIcon?.src}
                        alt="reviewer"
                      />
                    ))}
                  </Flex>
                </Grid>
              </Flex>
            </Box>
          ))}
        </Slider>
      ) : (
        <Grid gap={"20px"} maxW={{ base: "95%", md: "84%" }} m={"auto"}>
          {userReviewsData.map((reviews, index) => (
            <Box key={index}>
              <Flex
                bg={"#1E1F22"}
                px={"8%"}
                py={"15px"}
                borderRadius={"20px"}
                position="relative"
                gap={{ base: "10px", md: "40.2px" }}
              >
                <Image
                  maxW={"180px"}
                  maxH={"180px"}
                  bg={reviews.imgSrc ? "" : "#77919D"}
                  borderRadius={{ base: "20px", md: "20px" }}
                  my={{ base: "auto", md: "" }}
                  objectFit={"cover"}
                  src={
                    reviews.imgSrc
                      ? reviews.imgSrc.src
                      : `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' margin='auto' viewBox='0 0 100 100'%3E%3Ctext x='35' y='60 ' font-size='40' font-weight='bold' fill='white'%3E${reviews.name[0]}%3C/text%3E%3C/svg%3E`
                  }
                  alt="reviewer"
                />
                <Grid gap={"20px"}>
                  <Divider
                    mt={"24.1px"}
                    width="50px"
                    h={"2px"}
                    borderColor="#497BFD"
                    orientation="horizontal"
                  />
                  <Text
                    color={"white"}
                    fontFamily="Poppins"
                    fontWeight={500}
                    fontSize={{ base: "20px", lg: "24px" }}
                  >
                    {reviews.name}
                  </Text>
                  <Text
                    color={"white"}
                    fontFamily="Poppins"
                    fontWeight={300}
                    fontSize={"14px"}
                  >
                    {reviews.comments}
                  </Text>
                  <Flex gap={"3.2px"}>
                    {Array.from({ length: reviews.rating }, (_, i) => (
                      <Image
                        key={i}
                        h={"18px"}
                        src={AllImages.starIcon?.src}
                        alt="reviewer"
                      />
                    ))}
                  </Flex>
                </Grid>
              </Flex>
            </Box>
          ))}{" "}
        </Grid>
      )}
    </Box>
  );
};

export default Testimonials;
