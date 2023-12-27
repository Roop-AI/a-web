import {
  Box,
  Button,
  Flex,
  Stack,
  Text,
  Image,
  FormControl,
  FormLabel,
  Input,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import AllImages from "@/allImages";
import { initializeApp } from "firebase/app";
import LoginWithGoogle from "@/components/loginWithGoogle";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";
import { doc, getDoc, getFirestore, setDoc } from "@firebase/firestore";

interface FirebaseConfig {
  apiKey: any;
  authDomain: any;
  projectId: any;
  storageBucket: any;
  messagingSenderId: any;
  appId: any;
  measurementId: any;
}
export async function getServerSideProps() {
  const fireconfig: FirebaseConfig = {
    apiKey: process.env.NEXT_APP_APIKEY,
    authDomain: process.env.NEXT_APP_AUTHDOMAIN,
    projectId: process.env.NEXT_APP_PROJECT_ID,
    storageBucket: process.env.NEXT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_APP_MESSAGINGSENDERID,
    appId: process.env.NEXT_APP_APPID,
    measurementId: process.env.NEXT_APP_MEASUREMENTID,
  };
  return {
    props: {
      fireconfig,
    },
  };
}
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  agree: string;
}
const SignUp: React.FC<{ fireconfig: FirebaseConfig }> = ({ fireconfig }) => {
  const app = initializeApp(fireconfig);
  const auth = getAuth(app);
  const db = getFirestore();
  const loginWithGoogle = LoginWithGoogle(fireconfig);
  const handleGoogleLogin = loginWithGoogle.handleGoogleLogin;
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState<string>("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const router = useRouter();
  const toast = useToast();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const signUpMethods = [
    {
      text: "Sign Up With Google",
      icon: AllImages.googleIcon,
      handleClick: handleGoogleLogin,
    },
    { text: "Sign Up With Facebook", icon: AllImages.fbIcon },
    { text: "Sign Up With Discord", icon: AllImages.discordIcon },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const handleRegistration = async (registerData: FormData) => {
    try {
      const app = initializeApp(fireconfig);

      const auth = getAuth(app);

      if (registerData.password.length < 8) {
        setPasswordErrorMessage("Password must have at least 8 characters. ");
        return;
      }

      if (!/[a-z]/.test(registerData.password)) {
        setPasswordErrorMessage("At least one lowercase letter is required. ");
        return;
      }

      if (!/[A-Z]/.test(registerData.password)) {
        setPasswordErrorMessage("At least one uppercase letter is required. ");
        return;
      }

      if (!/\d/.test(registerData.password)) {
        setPasswordErrorMessage("At least one number is required. ");
        return;
      }

      if (!/[!@#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]/.test(registerData.password)) {
        setPasswordErrorMessage("At least one special character is required. ");
        return;
      }
      if (passwordErrorMessage !== "") {
        setPasswordErrorMessage("");
      }

      const loadingToastId = toast({
        title: "Creating account...",
        status: "info",
        position: "top-right",
        duration: null,
        isClosable: true,
      });
      const userCredential: any = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      const userDocRef = doc(db, "users", userCredential.user.uid);

      // Check if the user already exists in the 'users' collection
      const userDocSnapshot = await getDoc(userDocRef);

      if (!userDocSnapshot.exists()) {
        // User is not found in the collection, meaning they are new
        setCookie("isNewUser", "true");
        setCookie("userToken", userCredential.user.accessToken);
        setCookie("userId", userCredential.user.uid);
        const userData = {
          credits: 10,
          firstName: registerData.firstName,
          lastName: registerData.lastName,
          email: registerData.email,
        };

        await setDoc(userDocRef, userData);
        router.push("/success");
        toast.close(loadingToastId);
        toast({
          title: "Account created.",
          description: "We've created your account for you.",
          status: "success",
          position: "top-right",
          duration: null,
          isClosable: true,
        });
        return;
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setErrorMessage("That username is taken. Try another");
      }
    }
  };
  const handleError = (errors: any) => {};

  const registerOptions = {
    firstName: {
      required: "First name is required",
      maxLength: {
        value: 30,
        message: "First name cannot exceed 30 characters",
      },
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: "firstName is invalid",
      },
    },
    lastName: {
      required: "Last name is required",
      maxLength: {
        value: 30,
        message: "Last name cannot exceed 30 characters",
      },
      pattern: {
        value: /^[a-zA-Z]+$/,
        message: "lastName is invalid",
      },
    },
    email: {
      required: "Email is required",
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Please enter a valid email",
      },
    },
    password: {
      required: "Password is required",
    },
    agree: {
      required: "You must agree to the terms.",
    },
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      maxH={"100vh"}
      minH={"100vh"}
      bgGradient="linear(to-bl, #F9B6BB, #6F4AD5)"
    >
      <Grid
        h={{ base: "auto", lg: "95vh", xl: "auto" }}
        templateColumns={{ base: "repeat(1, 1fr)", lg: "repeat(2,1fr)" }}
        w={{ base: "95vw", sm: "64vw", "2xl": "64vw" }}
        boxShadow={"0 25px 31px #333333"}
        borderRadius={"30px"}
      >
        <GridItem
          height={{ base: "auto", lg: "95vh", xl: "auto" }}
          w="100%"
          px={"3.68vw"}
          py={"3.32vh"}
          bg="#FFFFFF"
          borderRadius={{
            base: "15px",
            lg: "30px 0 0 30px",
            "2xl": "30px 0 0 30px",
          }}
        >
          <Text
            fontFamily={"poppins"}
            fontSize={{ base: "16px", "2xl": "30px" }}
            fontWeight={{ base: 600, "2xl": 700 }}
            w={{ lg: "20vw" }}
          >
            Please sign up first to continue further
          </Text>
          <Stack
            gap={"1.55vh"}
            pt={"2.08vh"}
            borderBottom={"0.5px solid rgba(70, 70, 70, 0.2)"}
            pb={"2.2vh"}
          >
            {signUpMethods.map((data, index) => (
              <Button
                key={index}
                h={"6vh"}
                bg={"#F4F5F6"}
                _hover={{
                  bg: "#F4F5F6",
                }}
                border={"0.5px solid rgba(180, 180, 180, 0.3)"}
                borderRadius={{ base: "9px", "2xl": "16px" }}
                onClick={data.handleClick}
              >
                <Flex
                  gap={{ base: "5vw", sm: "0.84vw" }}
                  w={{ md: "140px", "2xl": "280px" }}
                  align={"center"}
                >
                  <Image
                    h={"2.5vh"}
                    src={data.icon.src}
                    alt="signInMethods logo"
                  />
                  <Text
                    fontFamily="Poppins"
                    fontSize={{ base: "10px", "2xl": "18px" }}
                    fontWeight={600}
                  >
                    {data.text}
                  </Text>
                </Flex>
              </Button>
            ))}
          </Stack>
          <form onSubmit={handleSubmit(handleRegistration, handleError)}>
            <Stack gap={"1.68vh"} pt={"1.77vh"}>
              <FormControl>
                <FormLabel
                  fontFamily="Poppins"
                  fontSize={{ base: "10px", "2xl": "18px" }}
                  fontWeight={600}
                >
                  First Name
                </FormLabel>
                <Input
                  px={"7%"}
                  h={"6vh"}
                  bg={"#EFEFEF"}
                  border={"0.5px solid rgba(180, 180, 180, 0.3)"}
                  borderRadius={{ base: "9px", "2xl": "16px" }}
                  focusBorderColor="rgba(180, 180, 180, 0.3)"
                  fontSize={{ base: "10px", "2xl": "16px" }}
                  _hover={{
                    bg: "#EFEFEF",
                  }}
                  _placeholder={{
                    color: "rgba(36, 42, 55, 0.8)",
                    fontSize: {
                      base: "10px",
                      "2xl": "16px",
                    },
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                  type="text"
                  {...register("firstName", registerOptions.firstName)}
                  placeholder="Enter Your First Name"
                />
                <Text fontSize={{ base: "10px", "2xl": "16px" }} color={"red"}>
                  {errors?.firstName && errors.firstName.message}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily="Poppins"
                  fontSize={{ base: "10px", "2xl": "18px" }}
                  fontWeight={600}
                >
                  Last Name
                </FormLabel>
                <Input
                  px={"7%"}
                  h={"6vh"}
                  bg={"#EFEFEF"}
                  border={"0.5px solid rgba(180, 180, 180, 0.3)"}
                  borderRadius={{ base: "9px", "2xl": "16px" }}
                  focusBorderColor="rgba(180, 180, 180, 0.3)"
                  fontSize={{ base: "10px", "2xl": "16px" }}
                  _hover={{
                    bg: "#EFEFEF",
                  }}
                  _placeholder={{
                    color: "rgba(36, 42, 55, 0.8)",
                    fontSize: {
                      base: "10px",
                      "2xl": "16px",
                    },
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                  type="text"
                  {...register("lastName", registerOptions.lastName)}
                  placeholder="Enter Your Last Name"
                />
                <Text fontSize={{ base: "10px", "2xl": "16px" }} color={"red"}>
                  {errors?.lastName && errors.lastName.message}
                </Text>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontFamily="Poppins"
                  fontSize={{ base: "10px", "2xl": "18px" }}
                  fontWeight={600}
                >
                  Email address
                </FormLabel>
                <Input
                  px={"7%"}
                  h={"6vh"}
                  bg={"#EFEFEF"}
                  border={"0.5px solid rgba(180, 180, 180, 0.3)"}
                  borderRadius={{ base: "9px", "2xl": "16px" }}
                  focusBorderColor="rgba(180, 180, 180, 0.3)"
                  fontSize={{ base: "10px", "2xl": "16px" }}
                  _hover={{
                    bg: "#EFEFEF",
                  }}
                  _placeholder={{
                    color: "rgba(36, 42, 55, 0.8)",
                    fontSize: {
                      base: "10px",
                      "2xl": "16px",
                    },
                    fontWeight: 500,
                    fontFamily: "Poppins",
                  }}
                  type="email"
                  {...register("email", registerOptions.email)}
                  placeholder="Enter Your Email"
                />
                <Text fontSize={{ base: "10px", "2xl": "16px" }} color={"red"}>
                  {errors?.email && errors.email.message}
                  {errorMessage && errorMessage}
                </Text>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    px={"7%"}
                    h={"6vh"}
                    bg={"#EFEFEF"}
                    border={"0.5px solid rgba(180, 180, 180, 0.3)"}
                    borderRadius={"16px"}
                    focusBorderColor="rgba(180, 180, 180, 0.3)"
                    fontSize={{ base: "10px", "2xl": "16px" }}
                    _hover={{
                      bg: "#EFEFEF",
                    }}
                    _placeholder={{
                      color: "rgba(36, 42, 55, 0.8)",
                      fontSize: {
                        base: "10px",
                        "2xl": "16px",
                      },
                      fontWeight: 500,
                      fontFamily: "Poppins",
                    }}
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    {...register("password", registerOptions.password)}
                  />

                  <InputRightElement
                    h={"5.23vh"}
                    mr={"2.36%"}
                    cursor={"pointer"}
                  >
                    <Flex align={"center"} onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <Image
                          h={"2.5vh"}
                          src={AllImages.eyeIcon.src}
                          alt="eye-icon"
                        />
                      ) : (
                        <Image
                          h={"2.5vh"}
                          src={AllImages.eyeIcon.src}
                          alt="eye-icon"
                        />
                      )}
                    </Flex>
                  </InputRightElement>
                </InputGroup>
                <Text
                  fontSize={{ base: "10px", "2xl": "16px" }}
                  color={"red"}
                  className="text-danger"
                >
                  {errors?.password && errors.password.message}
                  {passwordErrorMessage && passwordErrorMessage}
                </Text>
              </FormControl>
            </Stack>
            <Checkbox
              mt={"2.39vh"}
              value="naruto"
              color={"#A0A0A0"}
              _checked={{
                "& .chakra-checkbox__control": { background: "#497BFD" },
              }}
              _focus={{
                borderColor: "rgba(180, 180, 180, 0.3)",
              }}
              {...register("agree", {
                required: "You must agree to the terms.",
              })}
            >
              <Text
                fontSize={{ base: "10px", "2xl": "15px" }}
                fontWeight="medium"
                fontFamily="poppins"
              >
                By signing up, I agree to
                <Link
                  href={
                    "https://sites.google.com/view/adicto-ai-art-generator/home"
                  }
                  target="_blank"
                  className="link"
                  style={{
                    color: "#497BFD",
                    fontWeight: "medium",
                    fontFamily: "Poppins",
                  }}
                >
                  Terms of Use
                </Link>
                &&nbsp;
                <Link
                  href={"https://sites.google.com/view/picatoaiartgen/home"}
                  target="_blank"
                  className="link"
                  style={{
                    color: "#497BFD",
                    fontWeight: "medium",
                    fontFamily: "poppins",
                  }}
                >
                  Privacy Policy
                </Link>
              </Text>
            </Checkbox>
            <Text fontSize={{ base: "10px", "2xl": "16px" }} color={"red"}>
              {errors?.agree && errors.agree.message}
            </Text>
            <Button
              h={"6vh"}
              w={"100%"}
              mt={"1.26vh"}
              bgGradient="linear(to-r, #497BFD, #5D89F9)"
              _hover={{
                bgGradient: "linear(to-r, #497BFD, #5D89F9)",
              }}
              borderRadius={{ base: "9px", "2xl": "16px" }}
              type="submit"
            >
              <Flex align={"center"} justify={"center"}>
                <Text
                  fontFamily="Poppins"
                  fontSize={{ base: "12px", "2xl": "21px" }}
                  color={"#FFFFFF"}
                  fontWeight={600}
                >
                  Sign Up
                </Text>
              </Flex>
            </Button>
          </form>
        </GridItem>
        <GridItem
          w="100%"
          height={{ base: "auto", lg: "95vh", xl: "auto" }}
          borderRadius={"0 30px 30px 0"}
          display={{ base: "none", lg: "grid" }}
        >
          <Flex pos={"relative"} h={"100%"}>
            <Image
              w={"100%"}
              height={{ base: "auto", lg: "95vh", xl: "auto" }}
              borderRadius={"0 30px 30px 0"}
              src={AllImages.signUp.src}
              alt="sign up"
              objectFit={"cover"}
            />
            <Box
              pos={"absolute"}
              top={0}
              left={0}
              w={"100%"}
              h={"100%"}
              bgGradient={
                "linear(to bottom left , rgba(249, 182, 187, 0.7), rgba(111, 74, 213, 0.7))"
              }
              borderRadius={"0 30px 30px 0"}
            ></Box>
            <Image
              src={AllImages.addictoLogo.src}
              w={"12.61vw"}
              pos={"absolute"}
              left={"1.99vw"}
              bottom={"1.98vw"}
              alt="addicto-logo"
            />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
};

export default SignUp;
