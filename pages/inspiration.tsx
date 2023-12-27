import { getApps, initializeApp } from "firebase/app";
import firebaseConfig from "@/lib/firebaseConfig";
import { getRemoteConfig } from "firebase/remote-config";
import { FetchPaidUsersData } from "@/api/paidSubscriptionUsersData";
import { getStripeProductPriceData } from "@/api/stripeService";
import { FetchStripeSecretKey } from "@/api/stripesecretKey";
import {
  FirebaseConfig,
  paidUserInterface,
} from "@/interfaces/imageGenerationNavbarInterfaces";
import useFireBaseAuth from "@/firebase/useAuth";
import InspirationComponent from "@/components/inspirationComponent";
import { Text } from "@chakra-ui/react";
import IsDisplayEnabled from "@/isDisplayEnable";
import MobileRestriction from "@/components/mobileRestriction";
import { GetServerSidePropsContext } from "next";
import { getCookies } from "cookies-next";
import ImageGenerationNavbar from "@/components/imageGenerationNavbar";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const cookies = getCookies(context);
  const currentUserId: any = cookies.userId || null;
  const productPriceData = await getStripeProductPriceData();
  const paidUsersData = await FetchPaidUsersData();
  const stripeSecretKey = await FetchStripeSecretKey();

  return {
    props: {
      currentUserId,
      firebaseConfig,
      productPriceData,
      paidUsersData: paidUsersData.paidUsersData,
      stripeSecretKey,
    },
  };
}

const Inspiration: React.FC<{
  currentUserId: string;
  firebaseConfig: FirebaseConfig;
  stripeSecretKey: any;
  productPriceData: any;
  customersData: any;
  paymentIntentsData: any;
  paidUsersData: any;
}> = ({
  currentUserId,
  firebaseConfig,
  stripeSecretKey,
  productPriceData,
  paidUsersData,
}) => {
  let app;
  if (!getApps().length) {
    // initialize firebase app with our configs.
    app = initializeApp(firebaseConfig);

    console.log("Initialized firebase");
  } else {
    console.log("Already Initialized firebase");
  }

  let remoteConfig;

  if (typeof window !== "undefined") {
    remoteConfig = getRemoteConfig(app);
  }

  const remoteConfigAsAny: any = remoteConfig;
  //get current logged in user data

  const { user } = useFireBaseAuth({ firebaseConfig });
  const currentUserEmail: any = user?.email;

  const filteredPaidUsersData = paidUsersData.filter(
    (paidUser: paidUserInterface) => {
      return paidUser.id === currentUserId;
    }
  );

  return (
    <>
      <InspirationComponent
        currentUserId={currentUserId}
        filteredPaidUsersData={filteredPaidUsersData[0]}
        productPriceData={productPriceData.data}
        stripeSecretKey={stripeSecretKey}
        firebaseConfig={firebaseConfig}
        remoteConfigAsAny={remoteConfigAsAny}
      />

      <MobileRestriction />
    </>
  );
};

export default Inspiration;
