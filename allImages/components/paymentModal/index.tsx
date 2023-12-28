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
  List,
  ListItem,
} from "@chakra-ui/react";
import AllImages from "@/allImages";
import Stripe from "stripe";
import AddictoProFeatureProps from "@/data/addictoProFeaturesData";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "@firebase/firestore";

interface Payment {
  id: string;
  product: { id: string };
  nickname: string;
  unit_amount: number;
}
interface PaymentModalProps {
  isDesktop?: boolean;
  stripeSecretKey: any;
  isSubscriptionOpen: boolean;
  onSubscriptionClose: () => void;
  productPriceData: Payment[];
}
interface Metadata {
  type: string;
}
const PaymentModal: React.FC<PaymentModalProps> = (props) => {
  const user = getAuth().currentUser;

  const currentUserEmail = user?.email;
  const currentUserId = user?.uid;
  const [selectedPriceId, setSelectedPriceId] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [customerId, setCustomerId] = useState<string | null>(null); // State to hold the customer ID

  useEffect(() => {
    // Fetch the user's data, including the customer ID, if it exists
    if (user && currentUserId) {
      const db = getFirestore();
      const userRef = doc(db, "users", currentUserId);

      getDoc(userRef)
        .then((userDoc) => {
          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.customerId) {
              // Use the existing customerId if it exists
              setCustomerId(userData.customerId);
            }
          }
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [user, currentUserId]);

  const handleSelectPrice = (priceId: string, plan: string) => {
    setSelectedPriceId(priceId);
    setSelectedPlan(plan);
  };
  const handleBuyNow = async () => {
    if (selectedPriceId) {
      // Check if customerId is already set, if not, create a new customer
      let customer = null;
      if (!customerId) {
        customer = await createStripeCustomer(currentUserEmail!);
        if (customer) {
          // If a new customer is created, set the customerId in the component state
          setCustomerId(customer.id);

          // Update the user's Firestore document with the new customerId
          if (user) {
            const db = getFirestore();
            let userRef;
            if (currentUserId) {
              userRef = doc(db, "users", currentUserId);
            } else {
              console.error("currentUserId is null or undefined");
            }

            try {
              if (userRef) {
                await updateDoc(userRef, {
                  customerId: customer.id,
                });
              }
            } catch (error) {
              console.error("Error updating user data:", error);
            }
          }
        }
      }

      // Create a session with the customerId (either the existing one or the new one)
      handleSubscription(
        selectedPriceId,
        customer ? customer.id! : customerId!
      );
    }
  };
  const createStripeCustomer = async (email: string) => {
    try {
      const stripe = new Stripe(props.stripeSecretKey, {
        apiVersion: "2023-10-16",
      });

      const customer = await stripe.customers.create({
        email: email,
      });

      return customer;
    } catch (error) {
      console.error("Error creating customer:", error);
      return null;
    }
  };

  const createCheckoutSession = async (
    priceId: string,
    customerEmail: any,
    customerId: string,
    metaData: Metadata
  ) => {
    try {
      const stripe = new Stripe(props.stripeSecretKey, {
        apiVersion: "2023-10-16",
      });

      const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "subscription",
        success_url:
          "http://localhost:3000/paymentSuccessful?type=subscription",
        cancel_url: "http://localhost:3000/cancel",
        payment_method_types: ["card"],
        customer: customerId,
        subscription_data: { metadata: { type: metaData.type } },
      });

      return session.url;
    } catch (error) {
      throw error;
    }
  };

  const handleSubscription = async (priceId: string, customerId: string) => {
    try {
      const metadata = {
        type: "credits",
      };
      const url = await createCheckoutSession(
        priceId,
        currentUserEmail,
        customerId,
        metadata
      );

      if (url && typeof url === "string") {
        window.location.assign(url);
      } else {
        console.error("Invalid or missing URL for redirect.");
      }

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
        isCentered
        isOpen={props.isSubscriptionOpen}
        onClose={props.onSubscriptionClose}
      >
        <ModalOverlay
          background={"rgba(234, 234, 234, 0)"}
          backdropFilter={"blur(18px)"}
        />
        <ModalContent maxW={"56%"} borderRadius={"30px"} bg={"transparent"}>
          <ModalCloseButton
            bg={"#000000"}
            color={"white"}
            borderRadius={"50%"}
            zIndex={50}
          />
          <ModalBody px={0} py={0}>
            <Grid
              templateColumns={{ base: "repeat(1, 1fr)", sm: "repeat(2, 1fr)" }}
            >
              <GridItem
                w="100%"
                bg="white"
                p={"9%"}
                borderRadius={{ base: "30px 30px 0 0", sm: "30px 0 0 30px" }}
              >
                <Flex fontSize={{ base: "20px", "2xl": "43px" }}>
                  <Text fontFamily={"poppins"} fontWeight={300}>
                    Adicto&nbsp;
                  </Text>
                  <Text fontFamily={"poppins"} fontWeight={700}>
                    Pro
                  </Text>
                </Flex>
                <Text fontFamily={"poppins"} fontWeight={500} fontSize={"14px"}>
                  Unleash your creativity with extra credits
                </Text>
                <Stack gap={"2vh"} pt={"4%"}>
                  {props.productPriceData &&
                    props.productPriceData
                      .filter(
                        (price) => price.product.id === "prod_OsSpHBJ0mTFDvq"
                      )
                      .sort((a, b) => {
                        // Convert the unit_amount properties to numbers for comparison
                        const unitAmountA = Number(a.unit_amount);
                        const unitAmountB = Number(b.unit_amount);

                        // Compare unit_amount values
                        if (unitAmountA < unitAmountB) {
                          return -1;
                        } else if (unitAmountA > unitAmountB) {
                          return 1;
                        } else {
                          return 0;
                        }
                      })
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
                            onClick={() =>
                              handleSelectPrice(price.id, price.nickname)
                            }
                          >
                            {price.nickname === "Addicto Lite - Yearly" && (
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
                                fontWeight={600}
                              >
                                Flat 90% off
                              </Box>
                            )}
                            <Grid>
                              <Text
                                fontFamily={"poppins"}
                                fontWeight={600}
                              >
                                {price.nickname === "Addicto Lite - Yearly"
                                  ? "Yearly"
                                  : "Weekly"}
                              </Text>
                              <Text
                                fontFamily={"poppins"}
                                fontWeight={500}
                                opacity={"60%"}
                                color={"#2680EB"}
                              >
                                {price.nickname === "Addicto Lite - Yearly"
                                  ? "Recommended"
                                  : ""}
                              </Text>
                            </Grid>
                            <Grid>
                              <Text
                                fontFamily={"poppins"}
                                fontWeight={600}
                              >
                                {(price.unit_amount / 100).toLocaleString(
                                  "en-PK",
                                  {
                                    style: "currency",
                                    currency: "PKR",
                                  }
                                )}
                              </Text>
                              <Text
                                fontFamily={"poppins"}
                                fontWeight={500}
                                opacity={"80%"}
                                color={"#242A37"}
                              >
                                {price.nickname === "Addicto Lite - Yearly"
                                  ? "(208 Per Week)"
                                  : ""}
                              </Text>
                            </Grid>
                          </Flex>
                          {selectedPlan === price.nickname && (
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
                  isDisabled={!selectedPriceId}
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
              <GridItem
                p={"9%"}
                w="100%"
                bgGradient={
                  "linear(to bottom, rgba(230, 111, 213,0.36), rgba(73, 123, 253,0.36))"
                }
                borderRadius={{ base: "0 0 30px 30px", sm: "0 30px 30px 0" }}
              >
                <Text color={"white"} fontFamily={"poppins"} fontWeight={700}>
                  Unleash Your Creativity With Extra Credits
                </Text>
                <List spacing={"2%"} pt={"6%"}>
                  {AddictoProFeatureProps.map((feature, index) => (
                    <ListItem key={index}>
                      <Flex gap={"7px"} align={"center"}>
                        {" "}
                        <Image
                          w={"14px"}
                          h={"14px"}
                          src={AllImages.checkIcon.src}
                          alt="check icon"
                        />
                        <Text
                          color={"white"}
                          fontFamily={"poppins"}
                          fontWeight={600}
                        >
                          {feature.feature}
                        </Text>
                      </Flex>
                    </ListItem>
                  ))}
                </List>
              </GridItem>
            </Grid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PaymentModal;
