import AllImages from "@/allImages";
import HeroSlideData from "@/data/heroSlideData";
import { useTypewriter } from "@/hooks/useTypewriter";
import {
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Image,
  Tooltip,
} from "@chakra-ui/react";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ArtGeneratorInput: React.FC<{
  firebaseConfig: any;
  currentUserToken: string;
}> = ({ firebaseConfig, currentUserToken }) => {
  const router = useRouter();
  const [inputValue, setInputValue] = useState(
    "brown elk in a forest meadow minimal ink doodle art"
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  const [buttonTransform, setButtonTransform] = useState("");
  const [boxShadow, setBoxShadow] = useState("");
  const [generateBtnColor, setGenerateBtnColor] = useState("#000000");

  const app = initializeApp(firebaseConfig);
  const [defaultText, setDefaultText] = useState(
    HeroSlideData[currentIndex].text
  );

  const [buttonColor, setButtonColor] = useState("#19F4D4"); // Initial button color
  useEffect(() => {
    // Check if this is the first load by seeing if our object exists in local storage
    setIsFirstLoad(true);
  }, []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % HeroSlideData.length);
      setDefaultText(
        HeroSlideData[(currentIndex + 1) % HeroSlideData.length].text
      );
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentIndex]);
  useEffect(() => {
    const transformInterval = setInterval(() => {
      // Apply the transform
      setButtonTransform("scale(0.9)");
      setBoxShadow("0px 2px 16px #19F4D4");
      setGenerateBtnColor("#ffffff");
      // Reset transform after 2 seconds
      setTimeout(() => {
        setButtonTransform("");
      }, 1000);
      setTimeout(() => {
        setBoxShadow("");
        setGenerateBtnColor("#000000");
      }, 1700);
    }, 4500);

    // Clear the interval when the component unmounts
    return () => clearInterval(transformInterval);
  }, [currentIndex]);
  const displayText = useTypewriter(defaultText, 10);

  useEffect(() => {
    setInputValue(displayText);
  }, [displayText]);
  const handleGenerateClick = () => {
    if (currentUserToken) {
      router.push({
        pathname: "/imageGeneration",
        query: { urlText: inputValue },
      });
    } else {
      router.push("/login");
    }
  };
  return (
    <InputGroup>
      <Input
        className={`artGeneratorInput-background`}
        pr={"200px"}
        pl={"23px"}
        type={"text"}
        border={"1px solid #286F64"}
        _hover={{
          borderColor: "#286F64",
        }}
        focusBorderColor={"#286F64"}
        paddingInlineStart={0}
        h={"79px"}
        borderRadius={"30.36px"}
        color={"white"}
        fontSize="16px"
        placeholder=""
        sx={{
          "::placeholder": {
            fontSize: "16px",
            fontFamily: "poppins",
            fontStyle: "italic",
            fontWeight: "500",
            color: "white",
          },
        }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        autoFocus
      />
      <InputRightElement h={"100%"} w={"auto"} pr={"7.4px"}>
        <Tooltip label="Coming Soon" fontSize="14px">
          <Button
            borderRadius={"20px"}
            h={"60px"}
            w={"159px"}
            paddingInlineStart={0}
            paddingInlineEnd={0}
            bgGradient={`linear(to right, ${buttonColor}, #4658AE)`}
            color={generateBtnColor}
            fontSize={{ lg: "18px" }}
            fontWeight={700}
            fontFamily={"poppins"}
            _hover={{
              bgGradient: "linear(to right, #19F4D4, #4658AE)",
            }}
            transform={buttonTransform}
            transition="transform 0.8s ease-in-out"
            boxShadow={boxShadow}
            // onClick={handleGenerateClick}
          >
            Generate
          </Button>
        </Tooltip>
      </InputRightElement>
    </InputGroup>
  );
};

export default ArtGeneratorInput;
