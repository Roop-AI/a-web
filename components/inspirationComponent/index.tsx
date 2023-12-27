import { FirebaseConfig } from "@/interfaces/imageGenerationNavbarInterfaces";
import {
  InspirationInterface,
  artModelInterface,
  filteredPaidUsersProps,
} from "./inspirationComponent.interface";
import {
  Box,
  Grid,
  Image,
  Skeleton,
  Stack,
  Text,
  useBreakpointValue,
  useMediaQuery,
} from "@chakra-ui/react";
import ImageGenerationNavbar from "../imageGenerationNavbar";
import Premium from "../premium";
import {
  useFetchInspirations,
  useFetchArtModels,
} from "@/api/fetchRemoteConfig";
import { setImageGenerationData } from "@/redux/slices/imageGenerationSlice";
import { store } from "@/redux/slices/store";
import router from "next/router";
import { useEffect, useState } from "react";
import PaymentModal from "../paymentModal";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import { fetchAndActivate, getAll } from "firebase/remote-config";

const InspirationComponent: React.FC<{
  currentUserId: string;
  firebaseConfig: FirebaseConfig;
  stripeSecretKey: any;
  remoteConfigAsAny: any;
  productPriceData: any;
  filteredPaidUsersData: filteredPaidUsersProps;
}> = ({
  currentUserId,
  firebaseConfig,
  stripeSecretKey,
  remoteConfigAsAny,
  productPriceData,
  filteredPaidUsersData,
}) => {
  const isLg = useMediaQuery("(min-width: 980px)");
  const is2xl = useMediaQuery("(min-width: 1328px)");
  const is3xl = useMediaQuery("(min-width: 1620px)");

  const { isSubscriptionOpen, onSubscriptionOpen, onSubscriptionClose } =
    useSubscriptionModal();
  const [loading, setLoading] = useState(true);
  const [inspirations, setInspirations] = useState<any>();
  const [artModels, setArtModels] = useState<any>();
  // useFetchInspirations(remoteConfigAsAny, setInspirations);

  useEffect(() => {
    const fetchInspirations = async () => {
      try {
        if (remoteConfigAsAny) {
          await fetchAndActivate(remoteConfigAsAny);
          const authStylesModelsConfig = getAll(remoteConfigAsAny);

          const inspirations = (authStylesModelsConfig.inspirations as any)
            ._value;
          const inspirationsData = JSON.parse(inspirations);
          setInspirations(inspirationsData);
          setLoading(false); // Set loading to false once data is fetched
        }
      } catch (err) {
        console.error("Failed to fetch inspirations", err);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    fetchInspirations();
  }, [remoteConfigAsAny]);

  useFetchArtModels(remoteConfigAsAny, setArtModels);

  // Create a new array based on the comparison
  const inspirationsWithPremium =
    inspirations &&
    inspirations.map((inspiration: InspirationInterface) => {
      const matchingArtModel =
        artModels &&
        artModels.find(
          (artModel: artModelInterface) => artModel.name === inspiration.model
        );

      if (matchingArtModel) {
        // If a match is found, add premium value to inspiration object
        return { ...inspiration, premium: matchingArtModel.premium };
      } else {
        // If no match is found, just return the inspiration object
        return inspiration;
      }
    });
  const columns: InspirationInterface[][] = Array(
    is3xl ? 5 : is2xl ? 4 : isLg ? 3 : 5 // Default value for smaller screens
  )
    .fill([])
    .map(() => []);
  let currentColumnIndex = 0;
  let currentColumnHeight = 0;

  // Calculate the total height of all images
  const totalHeight = inspirationsWithPremium?.reduce((acc: any, data: any) => {
    const { height } = extractWidthAndHeight(data.image);
    return acc + parseInt(height, 10); // Convert height to a number
  }, 0);
  let totalWidth;
  if (typeof window !== "undefined") {
    totalWidth = window.innerWidth;
  }
  let columnHeight: number;
  if (totalWidth! > 1620) {
    columnHeight = totalHeight / 6;
  } else if (totalWidth! > 1320) {
    columnHeight = totalHeight / 3.9;
  } else if (totalWidth! > 900) {
    columnHeight = totalHeight / 2.9;
  }

  // Iterate through inspirations, distributing them into columns based on height
  inspirationsWithPremium?.forEach(
    (data: InspirationInterface, index: number) => {
      const { height } = extractWidthAndHeight(data.image);

      // Check if adding the current item exceeds the maximum height for the column
      if (currentColumnHeight + parseInt(height, 10) > columnHeight) {
        currentColumnIndex++;
        currentColumnHeight = 0;
      }

      columns[currentColumnIndex]?.push(data);
      currentColumnHeight += parseInt(height, 10);
    }
  );

  const handleClick = (data: InspirationInterface) => {
    store.dispatch(
      setImageGenerationData({
        image: data.image,
        negativePrompt: data.negative_prompt,
        prompt: data.prompt,
        sampler: data.sampler,
        model: data.model,
        model_id: data.model_id,
        seed: data.seed,
      })
    );
    router.push("/imageGeneration");
  };
  function extractWidthAndHeight(imageUrl: string) {
    const match = imageUrl.match(/W(\d+)-H(\d+)/i);

    if (match) {
      const width = match[1];
      const height = match[2];

      return { width, height };
    }

    // If no match, return default values or handle accordingly
    return { width: "default_width", height: "default_height" };
  }

  if (loading) {
    return <Box className="navigation-loader">Loading...</Box>;
  }
  return (
    <Box bg={"#242527"} display={{ base: "none", lg: "grid" }}>
      <ImageGenerationNavbar
        currentUserId={currentUserId}
        filteredPaidUsersData={filteredPaidUsersData}
        productPriceData={productPriceData}
        stripeSecretKey={stripeSecretKey}
        fireconfig={firebaseConfig}
      />
      <Box maxW={"97%"} mx={"auto"}>
        <Box h={"80px"}></Box>
        <Text
          pt={"4.03%"}
          textAlign={"center"}
          fontWeight={700}
          css={{
            background: "linear-gradient(to right, #F44EDD, #CD5DE4, #5D89F9)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Discover and Get Inspired
        </Text>
        <Grid
          pt={"1.42%"}
          mx={"auto"}
          sx={{
            "@media screen and (min-width: 980px)": {
              gridTemplateColumns: "repeat(3, 1fr)",
              maxW: "960px",
            },
            "@media screen and (min-width: 1328px)": {
              gridTemplateColumns: "repeat(4, 1fr)",
              maxW: "1260px",
            },

            "@media screen and (min-width: 1620px)": {
              gridTemplateColumns: "repeat(5, 1fr)",
              maxW: "1580px",
            },
          }}
          columnGap={"16px"}
        >
          {columns.map((column, columnIndex) => (
            <Stack key={columnIndex} maxW={"100%"} mx={"auto"} rowGap={"20px"}>
              {column.map((data: InspirationInterface, index: number) => {
                const { width, height } = extractWidthAndHeight(data.image);

                return (
                  <>
                    {!data.image ? (
                      <Skeleton
                        startColor="#3D3E41"
                        endColor="#2B2C2F"
                        maxW={`300px`}
                        minW={`300px`}
                        maxH={`${height}px`}
                        minH={`${height}px`}
                      />
                    ) : (
                      <Box
                        key={index}
                        pos={"relative"}
                        maxW={`300px`}
                        minW={`300px`}
                        onClick={
                          filteredPaidUsersData && filteredPaidUsersData.isPro
                            ? () => handleClick(data)
                            : data.premium
                            ? onSubscriptionOpen
                            : () => handleClick(data)
                        }
                      >
                        {data.premium &&
                          filteredPaidUsersData &&
                          !filteredPaidUsersData.isPro && (
                            <Premium
                              width={"67px"}
                              height={"38px"}
                              borderRadius={"18px"}
                              top={"20px"}
                              right={"20px"}
                              fontSize={"18px"}
                              color={"white"}
                            />
                          )}
                        <Box>
                          <Image
                            borderRadius={"12px"}
                            objectFit={"cover"}
                            cursor={"pointer"}
                            maxW={`300px`}
                            minW={`300px`}
                            maxH={`${height}px`}
                            minH={`${height}px`}
                            src={data.image}
                            alt="inspiration images"
                          />
                        </Box>
                      </Box>
                    )}
                  </>
                );
              })}
            </Stack>
          ))}
        </Grid>
      </Box>
      <PaymentModal
        isSubscriptionOpen={isSubscriptionOpen}
        onSubscriptionClose={onSubscriptionClose}
        stripeSecretKey={stripeSecretKey}
        productPriceData={productPriceData}
      />
    </Box>
  );
};

export default InspirationComponent;
