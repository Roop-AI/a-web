import { initializeApp } from "firebase/app";
import TextToImageGenerator from "../components/textToImageGeneration";
import useFireBaseAuth from "../firebase/useAuth";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "@firebase/firestore";
import { useEffect } from "react";
import {
  getStripeCustomers,
  getStripeProductPriceData,
  getStripeSubscription,
} from "@/api/stripeService";
import firebaseConfig from "@/lib/firebaseConfig";
import { FetchStripeSecretKey } from "@/api/stripesecretKey";
import { FetchPaidUsersData } from "@/api/paidSubscriptionUsersData";
import { useSelector } from "react-redux";
import { selectImageGenerationData } from "@/redux/slices/imageGenerationSlice";
import IsDisplayEnabled from "@/isDisplayEnable";
import { Box, Text } from "@chakra-ui/react";
import {
  FirebaseConfig,
  paidUserUnterface,
} from "@/interfaces/imageGenerationInterface";
import MobileRestriction from "@/components/mobileRestriction";
import { getCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import ImageGenerationNavbar from "@/components/imageGenerationNavbar";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = getCookies(context);
  const currentUserId: any = cookies.userId || null;
  initializeApp(firebaseConfig);
  const db = getFirestore();

  let customerId;
  if (currentUserId) {
    const userDocRef = doc(db, "users", currentUserId);
    const userDocSnapshot = await getDoc(userDocRef);
    const userData = userDocSnapshot.data();
    customerId = userData?.customerId;
  }

  const subscribedUsersData = await getStripeSubscription(customerId);
  const customersData = await getStripeCustomers();
  const productPriceData = await getStripeProductPriceData();
  const paidUsersData = await FetchPaidUsersData();
  const stripeSecretKey = await FetchStripeSecretKey();

  return {
    props: {
      subscribedUsersData,
      currentUserId,
      firebaseConfig,
      productPriceData,
      customersData,
      paidUsersData: paidUsersData.paidUsersData,
      stripeSecretKey,
    },
  };
}

const ImageGeneration: React.FC<{
  subscribedUsersData: any;
  currentUserId: string;
  firebaseConfig: FirebaseConfig;
  productPriceData: any;
  customersData: any;
  paidUsersData: any;
  stripeSecretKey: any;
}> = ({
  subscribedUsersData,
  currentUserId,
  firebaseConfig,
  productPriceData,
  paidUsersData,
  stripeSecretKey,
}) => {
  const isDisplayEnabled = IsDisplayEnabled();

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore();
  const { loading } = useFireBaseAuth({ firebaseConfig });

  const filteredPaidUsersData = paidUsersData.filter(
    (paidUser: paidUserUnterface) => {
      return paidUser.id === currentUserId;
    }
  );
  useEffect(() => {
    const updateExpiryDate = async () => {
      // Get the current_period_end value from subscribedUsersData
      const currentPeriodEnd = subscribedUsersData.data[0].current_period_end;

      // Iterate through filteredPaidUsersData and update expiryDate
      for (const paidUser of filteredPaidUsersData) {
        if (currentPeriodEnd !== paidUser.expiryDate) {
          // Update the expiryDate in the database
          const userDocRef = doc(db, "users", paidUser.id);
          await updateDoc(userDocRef, {
            expiryDate: currentPeriodEnd,
          });
        }
      }
    };

    updateExpiryDate();
  }, [subscribedUsersData, filteredPaidUsersData, db]);
  const imageGenerationData = useSelector(selectImageGenerationData);

  if (loading) {
    return <Box className="navigation-loader">Loading...</Box>;
  }
  return (
    <>
      {isDisplayEnabled ? (
        <>
          <TextToImageGenerator
            currentUserId={currentUserId}
            fireconfig={firebaseConfig}
            filteredPaidUsersData={filteredPaidUsersData}
            stripeSecretKey={stripeSecretKey.stripeSecretKey}
            productPriceData={productPriceData.data}
            inspirationImage={imageGenerationData.image}
            inspirationPrompt={imageGenerationData.prompt}
            inspirationNegative_prompt={imageGenerationData.negativePrompt}
            inspirationSeed={imageGenerationData.seed}
            inspirationModel={imageGenerationData.model}
            inspirationModelId={imageGenerationData.model_id}
            inspirationSampler={imageGenerationData.sampler}
          />
        </>
      ) : (
        <MobileRestriction />
      )}
    </>
  );
};

export default ImageGeneration;
