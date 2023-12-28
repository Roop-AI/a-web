import AllImages from "@/allImages";
import MobileRestriction from "@/components/mobileRestriction";
import IsDisplayEnabled from "@/isDisplayEnable";
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import { deleteCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Login: React.FC = () => {
  const isDisplayEnabled = IsDisplayEnabled();
  const router = useRouter();

  const handleContinueClick = () => {
    // Delete the "isNewUser" cookie
    deleteCookie("isNewUser");

    // Navigate to the imageGeneration page
    router.push("/imageGeneration");
  };

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      // Check if the user is leaving the page without clicking "Continue"
      if (!event.currentTarget.performance.navigationType) {
        // User is navigating away without clicking "Continue", delete the cookie
        deleteCookie("isNewUser");
      }
    };

    // Attach the "beforeunload" event listener
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      // Remove the event listener when the component is unmounted
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <>
      {isDisplayEnabled ? (
        <Flex
          align={"center"}
          justify={"center"}
          h={"100vh"}
          bgGradient="linear(to-bl, #F9B6BB, #6F4AD5)"
        >
          <Box
            minH={"50vh"}
            maxH={"50vh"}
            minW={"45vw"}
            maxW={"45vw"}
            bg={"#ECEDF5"}
            borderRadius={"30px"}
            boxShadow={"0 18px 30px rgba(0, 0, 0, 0.18)"}
          >
            <Image
              src={AllImages.reward.src}
              mx={"auto"}
              h={"21vh"}
              alt="reward image"
              pos={"relative"}
              top={"-64px"}
            />
            <Grid marginTop={"-65px"} pt={"2.7vh"}>
              <Flex justify={"center"}>
                <Text
                  w={"20vw"}
                  textAlign={"center"}
                  fontSize={{ lg: "18px", "2xl": "26px" }}
                  fontWeight={700}
                  fontFamily={"poppins"}
                >
                  Awarded 10 Credits as a Welcome Bonus.
                </Text>{" "}
              </Flex>
              <Flex justify={"center"} pt={"2.7vh"}>
                <Text
                  w={{ lg: "34vw", "2xl": "24.6vw" }}
                  fontSize={{ lg: "10px", xl: "12px" }}
                  fontFamily={"poppins"}
                  textAlign={"center"}
                >
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
                  diam nonumy eirmod tempor invidunt ut labore et dolore magna
                  aliquyam erat, sed diam voluptua. At vero eos et
                </Text>
              </Flex>
              <Link
                href={"/imageGeneration"}
                onClick={handleContinueClick}
                style={{ marginTop: "3.95vh" }}
              >
                <Flex justify={"center"}>
                  <Button
                    w={"244px"}
                    bgGradient={"linear(to right, #CF3FAC, #4658AE)"}
                    _hover={{
                      bgGradient: "linear(to right, #CF3FAC, #4658AE)",
                    }}
                    borderRadius={"29px"}
                    boxShadow={"0 6px 10px rgba(230, 111, 213, 0.15)"}
                    color={"white"}
                    fontSize={{ lg: "14px", "2xl": "18px" }}
                    fontWeight={600}
                    fontFamily={"poppins"}
                  >
                    Continue
                  </Button>
                </Flex>
              </Link>
            </Grid>
          </Box>
        </Flex>
      ) : (
        <MobileRestriction />
      )}
    </>
  );
};

export default Login;
