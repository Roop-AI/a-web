import { Box, Container, Stack, Text } from "@chakra-ui/react";

const SmallFooter = () => {
  const year = new Date().getFullYear();
  return (
    <Box bg={"#1B1B1B"} color={"white"} borderTop={"1px solid #707070"}>
      <Container
        as={Stack}
        maxW={{ base: "95%", md: "84%" }}
        mx={"auto"}
        py={4}
        paddingInline={0}
        direction={{ base: "column", md: "row" }}
        spacing={4}
        justify={{ base: "center", md: "space-between" }}
        align={{ base: "center", md: "center" }}
      >
        <Text opacity={"80%"}>&copy; {year} All Rights Reserved</Text>
        <Stack
          direction={"row"}
          spacing={{ base: "20px", sm: "53px" }}
          fontFamily="Poppins"
          fontWeight={600}
          fontSize={"16px"}
          opacity={"60%"}
        >
          <Box as="a" href={"#"}>
            Terms and conditions
          </Box>
          <Box as="a" href={"#"}>
            Privacy policy
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default SmallFooter;
