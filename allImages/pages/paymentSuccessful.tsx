import {
  getStripePaymentIntents,
  getStripeSubscription,
} from "@/api/stripeService";
import useFireBaseAuth from "@/firebase/useAuth";
import {
  addDoc,
  collection,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { query, where, getDocs } from "@firebase/firestore";
import { GetServerSidePropsContext } from "next";
import { getCookies } from "cookies-next";
import firebaseConfig from "@/lib/firebaseConfig";
import Link from "next/link";
import { Box, Button, Flex, Grid, Image, Text } from "@chakra-ui/react";
import IsDisplayEnabled from "@/isDisplayEnable";
import AllImages from "@/allImages";
import MobileRestriction from "@/components/mobileRestriction";

interface User {
  id?: string;
  name?: string;
  uid?: any;
  userToken?: string;
  customer?: string;
}

interface PaymentIntent {
  id: string;
  amount: number;
}

interface SubscriptionData {
  created: number;
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const queryType = context.query.type;
  const cookies = getCookies(context);
  const currentUserId: any = cookies.userId;
  if (queryType === "payment") {
    const paymentIntentsData = await getStripePaymentIntents();
    return {
      props: {
        paymentIntentsData,
        firebaseConfig,
        queryType,
      },
    };
  } else if (queryType === "subscription") {
    const db = getFirestore();

    let customerId;
    if (currentUserId) {
      const userDocRef = doc(db, "users", currentUserId);
      const userDocSnapshot = await getDoc(userDocRef);
      const userData = userDocSnapshot.data();
      customerId = userData?.customerId;
    }

    const subscribedUsersData = await getStripeSubscription(customerId);

    return {
      props: {
        subscribedUsersData,
        firebaseConfig,
        queryType,
      },
    };
  }
}

const PaymentSuccessful: React.FC<{
  paymentIntentsData: any;
  subscribedUsersData: any;
  firebaseConfig: any;
  queryType: string;
}> = ({ paymentIntentsData, subscribedUsersData, firebaseConfig }) => {
  const isDisplayEnabled = IsDisplayEnabled();

  const { user } = useFireBaseAuth({ firebaseConfig });
  const db = getFirestore();
  // paymentIntentsData functionality start
  const filteredPaymentIntentscredits =
    paymentIntentsData &&
    paymentIntentsData.filter((paymentIntent: any) => {
      const metadata = paymentIntent.metadata;
      return metadata && metadata.type === "credits";
    });

  const sortedPaymentIntents =
    filteredPaymentIntentscredits &&
    filteredPaymentIntentscredits.sort(
      (a: SubscriptionData, b: SubscriptionData) => b.created - a.created
    );
  const latestPaymentIntent = sortedPaymentIntents && sortedPaymentIntents[0];

  const [hasPurchased, setHasPurchased] = useState(false);
  const [firebaseUpdated, setFirebaseUpdated] = useState(false);
  const router = useRouter();

  // Declare the updateFirebase function outside of useEffect
  async function updateFirebase(
    user: User,
    latestPaymentIntent: PaymentIntent,
    db: any
  ) {
    if (firebaseUpdated) {
      return;
    }

    if (latestPaymentIntent) {
      const { id, amount } = latestPaymentIntent;

      if (user) {
        const userDocRef = doc(db, "users", user.uid);

        try {
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const isPro = userData.isPro || false; // Get isPro value, default to false if not present

            // Initialize totalCredits
            let totalCredits = 0;

            // Calculate credits based on the amount and isPro value
            switch (amount) {
              case 1000:
                totalCredits += isPro ? 1050 : 1000;
                break;
              case 3000:
                totalCredits += isPro ? 3450 : 3150;
                break;
              case 5000:
                totalCredits += isPro ? 6250 : 5750;
                break;
              case 10000:
                totalCredits += isPro ? 13500 : 12450;
                break;
              default:
                break;
            }

            // Make sure totalCredits is never NaN
            if (isNaN(totalCredits)) {
              totalCredits = 0;
            }

            // Check if the paymentIntentId exists in the "credits" collection
            const creditsQuery = query(
              collection(db, "credits"),
              where("paymentIntentId", "==", id)
            );
            const creditsQuerySnapshot = await getDocs(creditsQuery);

            if (creditsQuerySnapshot.empty) {
              // PaymentIntentId does not exist in the "credits" collection, update it
              const existingCredits = userData.credits || 0; // Get existing credits from user data

              totalCredits += existingCredits;

              const creditsData = {
                isPurchased: true,
                userId: user.uid,
                credits: totalCredits,
                paymentIntentId: id,
              };

              try {
                const docRef = await addDoc(
                  collection(db, "credits"),
                  creditsData
                );
                console.log("Data added to Firebase.");
                console.log(`Updated credits for PaymentIntent ID: `);
              } catch (error) {
                console.error("Error adding document to Firebase: ", error);
              }

              // Set the state variable to indicate that data has been updated
              setFirebaseUpdated(true);

              // Update the user's document with the new credits
              const userDataUpdate = {
                [`credits`]: totalCredits,
              };

              try {
                await updateDoc(userDocRef, userDataUpdate);
                console.log("User data updated with new credits");
              } catch (error) {
                console.error("Error updating user data: ", error);
              }
            } else {
              console.log(
                `PaymentIntent ID ${id} already exists in 'credits' collection. Credits not updated.`
              );
            }
          }
        } catch (error) {
          console.error("Error fetching user data: ", error);
        }
      }
    }
  }

  useEffect(() => {
    // Check if the "purchased" query parameter is set to "true"
    const payment = router.query.type === "payment";

    if (payment) {
      setHasPurchased(true);

      if (user && paymentIntentsData) {
        updateFirebase(user, latestPaymentIntent, db);
      }
    }
  }, [
    router.query.payment,
    hasPurchased,
    user,
    paymentIntentsData,
    latestPaymentIntent,
    db,
  ]);
  // paymentIntentsData functionality ends

  // subscribedUsersData functionality starts
  useEffect(() => {
    const fetchData = async () => {
      if (user && user.uid) {
        const userDocRef = doc(db, "users", user.uid);

        try {
          if (subscribedUsersData) {
            let sortedData;
            let latestData;
            sortedData =
              subscribedUsersData &&
              subscribedUsersData.data.sort(
                (a: SubscriptionData, b: SubscriptionData) =>
                  b.created - a.created
              );

            latestData = sortedData && sortedData[0];

            // Update the user's document with the new fields
            await setDoc(
              userDocRef,
              {
                expiryDate: latestData.current_period_end,
                purchasingDate: latestData.current_period_start,
                isPro: true,
              },
              { merge: true }
            ); // Merge new fields with existing data

            console.log("User data updated.");
          }
        } catch (error) {
          console.error("Error fetching or updating user data:", error);
        }
      }
    };

    fetchData(); // Call fetchData when the component mounts
  }, [subscribedUsersData, db, user]);
  // subscribedUsersData functionality ends
  const handleContinueClick = () => {
    // Navigate to the imageGeneration page
    router.push("/imageGeneration");
  };
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
            pt={"3.64vh"}
            pb={"5.61vh"}
            minW={"45vw"}
            maxW={"45vw"}
            bg={"#ECEDF5"}
            borderRadius={"30px"}
            boxShadow={"0 18px 30px rgba(0, 0, 0, 0.18)"}
          >
            <Image
              src={AllImages.success.src}
              mx={"auto"}
              h={"9.4vh"}
              alt="reward image"
            />
            <Grid>
              <Flex justify={"center"} pt={"2.12vh"}>
                <Text
                  w={"20vw"}
                  textAlign={"center"}
                  fontSize={{ lg: "18px", "2xl": "26px" }}
                  fontWeight={700}
                  fontFamily={"poppins"}
                >
                  Payment Successful
                </Text>{" "}
              </Flex>
              <Flex justify={"center"} pt={"1.27vh"}>
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

export default PaymentSuccessful;
