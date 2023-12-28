import {
  Box,
  Flex,
  Button,
  useColorModeValue,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Wrap,
  WrapItem,
  Text,
  Link,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import AllImages from "@/allImages";
import ImageGenerationDesktopNav from "../imageGenerationDesktopNav";
import imageGenerationMenuItemData from "@/data/imageGenerationMenuItemData";
import { useEffect, useState } from "react";
import useFireBaseAuth from "@/firebase/useAuth";
import PaymentModal from "../paymentModal";
import CreditsModal from "../creditsModal";
import {
  usePaymentModal,
  useSubscriptionModal,
} from "@/hooks/useSubscriptionModal";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { paidUserUnterface } from "@/interfaces/imageGenerationInterface";
import { imageGenerationNavbarProps } from "./imageGenerationNavbarInterface";

const ImageGenerationNavbar: React.FC<imageGenerationNavbarProps> = ({
  currentUserId,
  setRemainingCreditsUpdated,
  remainingCreditsUpdated,
  productPriceData,
  filteredPaidUsersData,
  stripeSecretKey,
  fireconfig,
}) => {
  let firebaseConfig = fireconfig;
  const [remainingCredits, setRemainingCredit] = useState<any>(null);
  const [loggedInUserFirstLetter, setLoggedInUserFirstLetter] = useState("");

  useEffect(() => {
    // Fetch paid users data or perform any other actions
    const fetchPaidUsers = async () => {
      try {
        const app = initializeApp(fireconfig);
        const firestore = getFirestore(app);

        const querySnapshot = await getDocs(collection(firestore, "users"));
        const fetchedPaidUsersData: paidUserUnterface[] = [];

        querySnapshot.forEach((doc) => {
          fetchedPaidUsersData.push({
            id: doc.id,
            ...doc.data(),
          });
        });

        const loggedInUserData =
          fetchedPaidUsersData &&
          fetchedPaidUsersData.filter((paidUser: paidUserUnterface) => {
            return paidUser.id === currentUserId;
          });
        setLoggedInUserFirstLetter(loggedInUserData[0].firstName!.charAt(0));

        let remainingCredits = loggedInUserData && loggedInUserData[0].credits;
        setRemainingCredit(remainingCredits); // Set the state with the fetched data

        // Reset the state variable after fetching data
        setRemainingCreditsUpdated!(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle the error
      }
    };

    // Trigger the fetchPaidUsers function when remaining credits are updated
    fetchPaidUsers();
  }, [remainingCreditsUpdated, currentUserId]);

  const [open, setOpen] = useState(false);
  const { logOut } = useFireBaseAuth({ firebaseConfig });

  const { isSubscriptionOpen, onSubscriptionOpen, onSubscriptionClose } =
    useSubscriptionModal();

  const { isCreditsOpen, onCreditsOpen, onCreditsClose } = usePaymentModal();

  const formatCredits = (credits: number) => {
    if (credits >= 1000) {
      // If credits are 1000 or more, format as "k"
      return (credits / 1000).toFixed(1) + "k";
    } else {
      // Otherwise, display the credits as is
      return credits;
    }
  };

  return (
    <Box zIndex={999} pos={"fixed"} w={"100%"}>
      <Box
        borderRadius={"0 0 20px 20px"}
        px={"3.1vw"}
        className="blur-background"
        h={"80px"}
        zIndex={20}
        w={"100%"}
      >
        <Flex h={"100%"} justify={"space-between"} w={"100%"}>
          <Flex align={"center"} w={{ lg: "35%", xl: "25%" }}>
            <Image
              src={AllImages.adictoGif.src}
              h={"58px"}
              w={"88px"}
              objectFit={"contain"}
              cursor={"pointer"}
              alt="addicto ai"
            />
            <Text
              fontFamily="Poppins"
              fontSize={"20px"}
              lineHeight={"30px"}
              color={"#ffffff"}
            >
              Adicto.AI
            </Text>
          </Flex>
          <Flex justify={"center"} w={"50%"}>
            <Flex alignItems={"center"}>
              <ImageGenerationDesktopNav />
            </Flex>
          </Flex>

          <Flex
            w={{ lg: "35%", xl: "25%" }}
            gap={"18px"}
            align={"center"}
            justify={"flex-end"}
          >
            {!filteredPaidUsersData?.isPro && (
              <>
                <Button
                  as={"a"}
                  minW={"113px"}
                  h={"38px"}
                  px={"17px"}
                  color={"white"}
                  bg={"transparent"}
                  _hover={{
                    bgGradient: "linear(to right, #19F4D4, #4658AE)",
                    color: "black",
                    border: "none",
                  }}
                  borderRadius={"20px"}
                  border={"1px solid #1CE9D1"}
                  href={"#"}
                  onClick={onSubscriptionOpen}
                >
                  <Flex align={"center"} h={"100%"}>
                    <Text
                      fontFamily={"Poppins"}
                      fontSize={"14px"}
                      fontWeight={700}
                    >
                      Upgrade
                    </Text>
                  </Flex>
                </Button>
                <PaymentModal
                  isSubscriptionOpen={isSubscriptionOpen}
                  onSubscriptionClose={onSubscriptionClose}
                  stripeSecretKey={stripeSecretKey}
                  productPriceData={productPriceData}
                />
              </>
            )}
            <Button
              as={"a"}
              minW={"165px"}
              h={"38px"}
              px={"17px"}
              color={"white"}
              bg={"transparent"}
              _hover={{
                bgGradient: "linear(to right, #19F4D4, #4658AE)",
                color: "black",
                border: "none",
              }}
              borderRadius={"20px"}
              border={"1px solid #1CE9D1"}
              href={"#"}
              onClick={onCreditsOpen}
            >
              <Flex align={"center"} justify={"center"} h={"100%"}>
                <Image h={"29px"} src={AllImages.dollar?.src} alt="dollar" />{" "}
                <Text fontFamily={"Poppins"} fontSize="14px" fontWeight={700}>
                  Get Credits:&nbsp;
                  {remainingCredits
                    ? formatCredits(remainingCredits && remainingCredits)
                    : "..."}
                </Text>
              </Flex>
            </Button>
            <CreditsModal
              isCreditsOpen={isCreditsOpen}
              onCreditsClose={onCreditsClose}
              fireconfig={fireconfig}
              stripeSecretKey={stripeSecretKey}
              productPriceData={productPriceData}
              isPro={filteredPaidUsersData?.isPro}
              isDesktop={true}
            />
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={"full"}
                  variant={"link"}
                  cursor={"pointer"}
                  minW={0}
                >
                  <Avatar
                    name={loggedInUserFirstLetter}
                    w={"38px"}
                    h={"38px"}
                    border={"1px solid #000000"}
                    _focus={{
                      border: "1px solid #000000",
                    }}
                    bgGradient="linear(to right, #19F4D4, #4658AE)"
                  />
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={logOut}>Sign Out</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default ImageGenerationNavbar;
