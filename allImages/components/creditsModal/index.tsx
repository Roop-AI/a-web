"use-client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  Button,
  useDisclosure,
  Flex,
  Image,
  Text,
  Grid,
  GridItem,
  Stack,
  Box,
} from "@chakra-ui/react";
import AllImages from "@/allImages";
import Stripe from "stripe";
import { getAuth } from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { initializeApp } from "firebase/app";

interface Credits {
  id: string;
  product: { id: string };
  unit_amount: number;
  amount: number;
}
interface CreditsModalProps {
  isDesktop?: boolean;
  stripeSecretKey: any;
  productPriceData: Credits[];
  isPro?: boolean;
  isCreditsOpen: boolean;
  onCreditsClose: () => void;
  fireconfig: any;
}

const CreditsModal: React.FC<CreditsModalProps> = (props) => {
  // const app = initializeApp(props.fireconfig);
  const db = getFirestore();
  const user = getAuth().currentUser;
  const loggedInUserEmail: any = user?.email;
  // const currentUserEmail: any = "dummy424@gmail.com";

  // Initialize credits state based on unit_amount conditions
  const [selectedPrice, setSelectedPrice] = useState<string>("");

  const [loadingUser, setLoadingUser] = useState(true);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(
    loggedInUserEmail
  );

  const handleSelectPrice = (priceId: string) => {
    setSelectedPrice(priceId);
  };

  const handleBuyNow = async () => {
    if (selectedPrice) {
      handleSubscription(selectedPrice);
    }
  };

  const stripe = new Stripe(props.stripeSecretKey, {
    apiVersion: "2023-10-16",
  });
  const createCheckoutSession = async (
    priceId: string,
    customerEmail: string
  ) => {
    try {
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        payment_intent_data: {
          metadata: {
            type: "credits",
            user_email: currentUserEmail,
          },
        },
        success_url: "http://localhost:3000/paymentSuccessful?type=payment",
        cancel_url: "http://localhost:3000/cancel",
        payment_method_types: ["card"],
        customer_email: customerEmail,
      });

      return session.url;
    } catch (error) {
      throw error;
    }
  };

  const handleSubscription = async (priceId: string) => {
    try {
      const url = await createCheckoutSession(priceId, currentUserEmail!);

      if (url && typeof url === "string") {
        window.location.assign(url);
      } else {
        console.error("Invalid or missing URL for redirect.");
      }
    } catch (error) {
      console.error("Error handling subscription:", error);
    }
  };

  return (
    <>
      <Modal
        isOpen={props.isCreditsOpen}
        onClose={props.onCreditsClose}
        isCentered
      >
        <ModalOverlay
          background={"rgba(234, 234, 234, 0)"}
          backdropFilter={"blur(18px)"}
        />
        <ModalContent
          maxW={"56%"}
          borderRadius={"30px"}
          bg={"transparent"}
        >
          <ModalCloseButton
            bg={"#000000"}
            color={"white"}
            borderRadius={"50%"}
            zIndex={50}
          />
          <ModalBody px={0} py={0}>
            <Grid templateColumns={"repeat(2, 1fr)"}>
              <GridItem
                w="100%"
                bg="white"
                p={"9%"}
                borderRadius={"30px 0 0 30px"}
              >
                <Flex
                  sx={{
                    "@media (max-width: 1500px)": {
                      fontSize: "25px",
                    },
                    "@media (min-width: 1501px)": {
                      fontSize: "43px",
                    },
                  }}
                >
                  <Text fontFamily={"poppins"} fontWeight={300}>
                    Adicto&nbsp;
                  </Text>
                  <Text fontFamily={"poppins"} fontWeight={700}>
                    Credits
                  </Text>
                </Flex>
                <Text
                  fontFamily={"poppins"}
                  fontWeight={500}
                  sx={{
                    "@media (max-width: 1500px)": {
                      fontSize: "12px",
                    },
                    "@media (min-width: 1501px)": {
                      fontSize: "14px",
                    },
                  }}
                >
                  Unleash your creativity with extra credits
                </Text>
                <Stack gap={"2vh"} pt={"4%"}>
                  {props.productPriceData &&
                    props.productPriceData
                      .filter(
                        (price) => price.product.id === "prod_OuiQnszNp9l7V6"
                      )
                      .sort((a, b) => a.unit_amount - b.unit_amount)
                      .map((price, index) => (
                        <Box key={index} pos={"relative"}>
                          <Flex
                            justify={"space-between"}
                            align={"center"}
                            border={"0.2px solid #707070"}
                            borderRadius={"10px"}
                            boxShadow={"0 3px 7px #000000"}
                            h={"7vh"}
                            px={"4.5%"}
                            cursor={"pointer"}
                            pos={"relative"}
                            onClick={() => {
                              handleSelectPrice(price.id);
                              // handleSelectedCredits(price.unit_amount);
                            }}
                          >
                            <Box
                              pos={"absolute"}
                              top={"-9px  "}
                              right={"8px"}
                              bg={"#4579FF"}
                              px={"2%"}
                              py={"0.5%"}
                              color={"white"}
                              borderRadius={"6px"}
                              fontFamily={"poppins"}
                              fontWeight={500}
                            >
                              <Text fontFamily={"poppins"}>
                                {price.unit_amount === 1000
                                  ? props.isPro
                                    ? "+5%"
                                    : ""
                                  : price.unit_amount === 3000
                                  ? props.isPro
                                    ? "+10%"
                                    : "+5%"
                                  : price.unit_amount === 5000
                                  ? props.isPro
                                    ? "+15%"
                                    : "+10%"
                                  : price.unit_amount === 10000
                                  ? props.isPro
                                    ? "+20%"
                                    : "+15%"
                                  : "0"}
                              </Text>
                            </Box>
                            <Grid>
                              <Flex align={"center"}>
                                <Text
                                  fontFamily={"poppins"}
                                  fontWeight={600}
                                  sx={{
                                    "@media (max-width: 1500px)": {
                                      fontSize: "14px",
                                    },
                                    "@media (min-width: 1501px)": {
                                      fontSize: "18px",
                                    },
                                  }}
                                >
                                  {price.unit_amount === 1000
                                    ? 1000
                                    : price.unit_amount === 3000
                                    ? 3000
                                    : price.unit_amount === 5000
                                    ? 5000
                                    : price.unit_amount === 10000
                                    ? 10000
                                    : 0}
                                  &nbsp;
                                </Text>
                                <Text fontFamily={"poppins"}>credits</Text>
                              </Flex>
                              <Flex
                                align={"center"}
                                fontSize={"12px"}
                                gap={"3px"}
                              >
                                <Text fontFamily={"poppins"}>
                                  {price.unit_amount === 1000
                                    ? ""
                                    : price.unit_amount === 3000
                                    ? "+150 credits" +
                                      (props.isPro ? " or" + " " : "")
                                    : price.unit_amount === 5000
                                    ? "+500 credits" +
                                      (props.isPro ? " or" : "")
                                    : price.unit_amount === 10000
                                    ? "+1000 credits" +
                                      (props.isPro ? " or" : "")
                                    : "0"}
                                </Text>
                                {props.isPro && (
                                  <Text
                                    color={"#497BFD"}
                                    fontFamily={"poppins"}
                                  >
                                    {price.unit_amount === 1000
                                      ? "Pro +50 credits"
                                      : price.unit_amount === 3000
                                      ? " Pro +300 credits"
                                      : price.unit_amount === 5000
                                      ? " Pro +750 credits"
                                      : price.unit_amount === 10000
                                      ? "  Pro +2000 credits"
                                      : "0"}
                                  </Text>
                                )}
                              </Flex>
                            </Grid>
                            <Grid>
                              <Text
                                fontFamily={"poppins"}
                                fontWeight={600}
                                sx={{
                                  "@media (max-width: 1500px)": {
                                    fontSize: "14px",
                                  },
                                  "@media (min-width: 1501px)": {
                                    fontSize: "18px",
                                  },
                                }}
                              >
                                {(price.unit_amount / 100).toLocaleString(
                                  "en-PK",
                                  {
                                    style: "currency",
                                    currency: "PKR",
                                  }
                                )}
                              </Text>
                            </Grid>
                          </Flex>
                          {selectedPrice === price.id && (
                            <Box
                              pos={"absolute"}
                              top={0}
                              left={0}
                              width={"100%"}
                              height={"7vh"}
                              bg={"rgba(73, 123, 253, 0.25)"}
                              borderRadius={"10px"}
                              border={"2px solid #497BFD"}
                            ></Box>
                          )}
                        </Box>
                      ))}
                </Stack>
                <Text
                  pt={"1%"}
                  pb={"5%"}
                  fontFamily={"poppins"}
                  fontWeight={500}
                  sx={{
                    "@media (max-width: 1500px)": {
                      fontSize: "12px",
                    },
                    "@media (min-width: 1501px)": {
                      fontSize: "14px",
                    },
                  }}
                >
                  Lorem ipsum dolor sit amet, consetetur
                </Text>
                <Button
                  borderRadius={"10px"}
                  width="100%"
                  bgGradient={"linear(to right, #497BFD, #5D89F9)"}
                  _hover={{
                    bgGradient: "linear(to right, #497BFD, #5D89F9)",
                  }}
                  boxShadow={"0 6px 10px #497BFC"}
                  fontSize={"18px"}
                  fontFamily={"poppins"}
                  fontWeight={600}
                  color={"white"}
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
                <Flex
                  pt={"2%"}
                  justify={"space-between"}
                  fontSize={"12px"}
                  fontFamily={"poppins"}
                  fontWeight={500}
                  opacity={"60%"}
                >
                  <Text>Privacy policy</Text>
                  <Text>Terms & Services</Text>
                </Flex>
              </GridItem>
              <GridItem w="100%" borderRadius={"0 30px 30px 0"}>
                <Image
                  src={AllImages.creditsImg.src}
                  alt="credits"
                  w={"100%"}
                  h={"100%"}
                  objectFit={"cover"}
                />
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreditsModal;
