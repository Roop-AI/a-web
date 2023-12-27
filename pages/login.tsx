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
  InputGroup,
  InputRightElement,
  useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import LoginWithGoogle from "../components/loginWithGoogle";
import AllImages from "@/allImages";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { doc, getDoc, getFirestore } from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { setCookie } from "cookies-next";

interface FirebaseConfig {
  apiKey: any;
  authDomain: any;
  projectId: any;
  storageBucket: any;
  messagingSenderId: any;
  appId: any;
  measurementId: any;
}

interface FormData {
  email: string;
  password: string;
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

const Login: React.FC<{ fireconfig: FirebaseConfig }> = ({ fireconfig }) => {
  const app = initializeApp(fireconfig);
  const auth = getAuth(app);
  const loginWithGoogle = LoginWithGoogle(fireconfig);
  const handleGoogleLogin = loginWithGoogle.handleGoogleLogin;
  const currentUserEmail = auth.currentUser?.email;
  const router = useRouter();
  const toast = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [credentialsErrorMessage, setCredentialsErrorMessage] =
    useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const signInMethods = [
    {
      text: "Sign In With Google",
      icon: AllImages.googleIcon,
      handleClick: handleGoogleLogin,
    },
    { text: "Sign In With Facebook", icon: AllImages.fbIcon },
    { text: "Sign In With Discord", icon: AllImages.discordIcon },
  ];

  const fetchUserCredits = async () => {
    if (currentUserEmail) {
      try {
        const db = getFirestore(app);
        const userRef = doc(db, "users", currentUserEmail);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          // User document exists, fetch credits
          const userCredits = userDoc.data().credits;
        }
      } catch (error) {
        console.error("Error fetching user credits:", error);
      }
    }
  };

  // Fetch user's credits when the component mounts
  useEffect(() => {
    fetchUserCredits();
  }, [currentUserEmail]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const handleLogin = async (loginData: FormData) => {
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginData.email,
        loginData.password
      );
      const user: any = userCredential.user;
      setCookie("userToken", user.accessToken);
      setCookie("userId", user.uid);

      router.push("/imageGeneration");
    } catch (error: any) {
      console.error("Login failed:", error.message);

      if (error.code === "auth/invalid-login-credentials") {
        setCredentialsErrorMessage("Wrong email/password. Try again");
      }
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };
  const handleError = (errors: any) => {};

  const registerOptions = {
    email: {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email format",
      },
    },
    password: {
      required: "Password is required",
    },
  };

  return (
    <Flex
      align={"center"}
      justify={"center"}
      h={{ base: "100vh" }}
      bgGradient="linear(to-bl, #F9B6BB, #6F4AD5)"
    >
      <Box
        maxW={{ base: "90%", md: "32%", "2xl": "33%" }}
        borderRadius={"30px"}
        bg={"rgba(255,255,255,0.56)"}
        pt={"2%"}
        pb={"1.3%"}
        px={"2.1%"}
        boxShadow={"0 25px 31px rgba(0, 0, 0, 0.2)"}
      >
        <Box borderBottom={"0.5px solid rgba(70, 70, 70, 0.6)"} pb={"11px"}>
          <Link href={"/"}>
            <Image
              src={AllImages.addictoLogoBlackText.src}
              h={"5vh"}
              w={"30%"}
              alt="addicto logo"
            />
          </Link>
        </Box>
        <Text
          color={"#242A37"}
          fontFamily="Poppins"
          fontSize={{ "2xl": "28px" }}
          pt={"5%"}
          fontWeight={600}
        >
          SIGN IN to ADICTO
        </Text>
        <Stack
          gap={"2vh"}
          pt={"4%"}
          pb={"5%"}
          borderBottom={"0.5px solid rgba(70, 70, 70, 0.6)"}
        >
          {signInMethods.map((data, index) => (
            <Button h={"6vh"} key={index} onClick={data.handleClick}>
              <Flex
                gap={"4%"}
                align={"center"}
                maxW={{ base: "70%", "2xl": "280px" }}
                minW={{ "2xl": "320px" }}
              >
                <Image
                  w={"7%"}
                  h={"3vh"}
                  objectFit={"contain"}
                  src={data.icon.src}
                  alt="signInMethods logo"
                />
                <Text
                  fontFamily="Poppins"
                  fontSize={{ sm: "12px", "2xl": "21px" }}
                  fontWeight={600}
                >
                  {data.text}
                </Text>
              </Flex>
            </Button>
          ))}
        </Stack>
        <form onSubmit={handleSubmit(handleLogin, handleError)}>
          <Stack gap={"1.68vh"} pt={"1.77vh"}>
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
                {credentialsErrorMessage && credentialsErrorMessage}
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

                <InputRightElement h={"5.23vh"} mr={"2.36%"} cursor={"pointer"}>
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
              </Text>
            </FormControl>
          </Stack>

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
              {isLoading ? (
                <Box className="loader"></Box>
              ) : (
                <Text
                  fontFamily="Poppins"
                  fontSize={{ base: "12px", "2xl": "21px" }}
                  color={"#FFFFFF"}
                  fontWeight={600}
                >
                  Sign In
                </Text>
              )}
            </Flex>
          </Button>
        </form>
        <Text
          fontFamily="Poppins"
          fontSize={{ sm: "10px", "2xl": "16px" }}
          fontWeight={500}
          pt={"6%"}
          pb={"8%"}
          borderBottom={"0.5px solid rgba(70, 70, 70, 0.6)"}
        >
          By signing in, you agree to the&nbsp;
          <Link
            style={{ textDecoration: "underline" }}
            href="https://sites.google.com/view/adicto-ai-art-generator/home"
          >
            Terms of Service
          </Link>
          &nbsp;and&nbsp;
          <Link
            style={{ textDecoration: "underline" }}
            href="https://sites.google.com/view/picatoaiartgen/home"
          >
            Privacy Policy.
          </Link>
        </Text>
        <Text
          textAlign={"center"}
          pt={"4%"}
          fontFamily="Poppins"
          fontSize={{ sm: "10px", "2xl": "16px" }}
          fontWeight={500}
        >
          Don’t have an account? <Link href={"/signUp"}> Sign up</Link>
        </Text>
      </Box>
    </Flex>
  );
};

export default Login;
