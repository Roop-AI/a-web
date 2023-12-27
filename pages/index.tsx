import Navbar from "../components/navbar";
import Hero from "../components/hero";
import FixedSocialComponent from "../components/fixedSocialComponent";
import { FetchUserActivityData } from "../api/fetchData";
import firebaseConfig from "../lib/firebaseConfig";
import { FetchStripeSecretKey } from "@/api/stripesecretKey";
import { getCookies } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { userActivityData } = await FetchUserActivityData();
  const { stripeSecretKey } = await FetchStripeSecretKey();
  const cookies = getCookies(context);
  const currentUserToken: any = cookies.userToken || null;

  return {
    props: {
      firebaseConfig,
      userActivityData,
      stripeSecretKey,
      currentUserToken,
    },
  };
}
const Home: React.FC<{
  userActivityData: any[];
  firebaseConfig: any;
  currentUserToken: string;
}> = ({ userActivityData, firebaseConfig, currentUserToken }) => {
  return (
    <>
      <Head>
        <title>Addicto: AI art generator</title>
      </Head>
      <Navbar currentUserToken={currentUserToken} />
      <FixedSocialComponent />
      {/* <FixedQrCode /> */}
      <Hero
        firebaseConfig={firebaseConfig}
        currentUserToken={currentUserToken}
      />
      {/* <AiGeneratedArt userActivityData={userActivityData} /> */}
      {/* <TextToImageIntro /> */}
      {/* <AccordianComponent /> */}
      {/* <Newsletter /> */}
      {/* <Testimonials userReviewsData={userReviewsData} /> */}
      {/* <Footer /> */}
    </>
  );
};

export default Home;
