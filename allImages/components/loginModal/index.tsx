import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  Text,
  Image,
  Box,
  Stack,
  Flex,
} from "@chakra-ui/react";
import Link from "next/link";
import AllImages from "@/allImages";
interface LoginModalInterface {
  onClose?: any;
  isOpen?: any;
}
const LoginModal: React.FC<LoginModalInterface> = (props) => {
  const signInMethods = [
    { text: "Sign In With Google", icon: AllImages.googleIcon },
    { text: "Sign In With Facebook", icon: AllImages.fbIcon },
    { text: "Sign In With Discord", icon: AllImages.discordIcon },
  ];
  return (
    <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
      <ModalOverlay bgGradient="linear(to-bl, #F9B6BB, #6F4AD5)" />
      <ModalContent
        maxW={{ base: "80%", lg: "35%", xl: "25%" }}
        borderRadius={"30px"}
        bg="#FFFFFF"
        pt={"2%"}
        pb={"1.3%"}
        px={"2.1%"}
        boxShadow={"0 25px 31px rgba(0, 0, 0, 0.2)"}
      >
        <ModalCloseButton display={{ md: "none" }} />
        <ModalBody pt={0} pb={0} paddingInline={0}>
          <Box borderBottom={"0.5px solid #464646"} pb={"11px"}>
            <Image
              src={AllImages.addictoLogoBlackText.src}
              alt="addicto logo"
            />
          </Box>
          <Text
            color={"#242A37"}
            fontFamily="Poppins"
            fontSize={"28px"}
            pt={"10%"}
            fontWeight={600}
          >
            SIGN IN to ADICTO
          </Text>
          <Stack
            gap={"2vh"}
            pt={"7%"}
            borderBottom={"0.5px solid #464646"}
            pb={"9%"}
          >
            {signInMethods.map((data, index) => (
              <Button h={"68px"} key={index}>
                <Flex gap={"21.7px"} minW={"280px"}>
                  <Image src={data.icon.src} alt="signInMethods logo" />
                  <Text fontFamily="Poppins" fontSize={"21px"} fontWeight={600}>
                    {data.text}
                  </Text>
                </Flex>
              </Button>
            ))}
          </Stack>
          <Button
            h={"68px"}
            w={"100%"}
            mt={"6%"}
            bgGradient="linear(to-r, #497BFD, #5D89F9)"
          >
            <Flex h={"68px"} gap={"24.5px"} align={"center"} justify={"center"}>
              <Text
                fontFamily="Poppins"
                fontSize={"24px"}
                color={"#FFFFFF"}
                fontWeight={600}
              >
                Continue With Email
              </Text>
              <Image
                src={AllImages.buttonArrowLeft.src}
                alt="signInMethods logo"
              />
            </Flex>
          </Button>
          <Text
            fontFamily="Poppins"
            fontSize={"16px"}
            fontWeight={500}
            pt={"6%"}
            borderBottom={"0.5px solid #464646"}
            pb={"9%"}
          >
            By signing in, you agree to the&nbsp;
            <Link
              style={{ textDecoration: "underline" }}
              href="https://chakra-ui.com"
            >
              Terms of Service
            </Link>
            &nbsp;and&nbsp;
            <Link
              style={{ textDecoration: "underline" }}
              href="https://chakra-ui.com"
            >
              Privacy Policy.
            </Link>
          </Text>
          <Text
            textAlign={"center"}
            pt={"4%"}
            fontFamily="Poppins"
            fontSize={"16px"}
            fontWeight={500}
          >
            Don’t have an account? <Link href={"/signUp"}> Sign up</Link>
          </Text>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default LoginModal;
