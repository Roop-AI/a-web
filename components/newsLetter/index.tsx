import {
  Box,
  Button,
  Flex,
  Grid,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Tooltip,
} from "@chakra-ui/react";

const Newsletter = () => {
  return (
    <Flex
      w={"100%"}
      alignItems={"center"}
      h={{ lg: "174px" }}
      py={{ base: "10px", lg: "0" }}
      bgGradient="linear(to-r,#F44EDD, #CD5DE4)"
    >
      <Box
        maxW={{ base: "95%", md: "84%" }}
        w={"100%"}
        mx={"auto"}
        display={{ base: "block", lg: "flex" }}
        justifyContent={{ base: "center", lg: "space-between" }}
        my={"auto"}
      >
        <Grid gap={0} pb={{ base: "25px", lg: "" }}>
          <Text
            color={"white"}
            fontFamily="Poppins"
            fontWeight={600}
            fontSize={{ base: "36px", lg: "46px" }}
          >
            Get Newsletter
          </Text>
          <Text
            color={"white"}
            fontFamily="Poppins"
            fontWeight={500}
            fontSize={{ base: "14px", lg: "20px" }}
          >
            Get updates with news tips & tricks.
          </Text>
        </Grid>
        <Flex align={"center"} w={{ lg: "588px" }}>
          <InputGroup size="md" borderRadius={"38px"}>
            <Input
              pr={{ base: "10.5rem", "2xl": "18.5rem" }}
              pl={"35.3px"}
              type={"text"}
              borderColor={"#FFFFFF"}
              _hover={{
                borderColor: "#FFFFFF",
              }}
              focusBorderColor={"#FFFFFF"}
              paddingInlineStart={0}
              h={"77px"}
              w={"100%"}
              borderWidth="2px"
              borderRadius={"38px"}
              color={"white"}
              placeholder="Your Email"
              _placeholder={{
                color: "white",
                fontSize: "20px",
                fontFamily: "Poppins",
              }}
            />
            <Tooltip label="Coming Soon" fontSize="14px">
              <InputRightElement
                h={"100%"}
                display={"flex"}
                alignItems={"center"}
                w={"auto"}
                pr={"7.4px"}
              >
                <Button
                  size="sm"
                  borderRadius={"30px"}
                  h={"60px"}
                  w={{ base: "120px", lg: "159px" }}
                  paddingInlineStart={0}
                  paddingInlineEnd={0}
                  bgPosition={"white"}
                  color={"#E66FD5"}
                  fontFamily="Poppins"
                  fontWeight={500}
                  fontSize={{ base: "14px", lg: "20px" }}
                >
                  Submit
                </Button>
              </InputRightElement>
            </Tooltip>
          </InputGroup>
        </Flex>
      </Box>
    </Flex>
  );
};

export default Newsletter;
