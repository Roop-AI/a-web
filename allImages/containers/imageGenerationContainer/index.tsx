// import TextToImageGenerator from "@/components/textToImageGeneration";
// import { ImageGenerationProps } from "./imageGenerationContainer.interface";
// import { Box } from "@chakra-ui/react";
// import ImageGenerationNavbar from "@/components/imageGenerationNavbar";

// const ImageGenerationContainer: React.FC<ImageGenerationProps> = ({
//   currentUserId,
//   fireconfig,
//   filteredPaidUsersData,
//   stripeSecretKey,
//   productPriceData,
//   inspirationPrompt,
//   inspirationImage,
//   inspirationNegative_prompt,
//   inspirationSeed,
//   inspirationModel,
//   inspirationModelId,
//   inspirationSampler,
// }) => {
//   return (
//     <Box minH={"100vh"} maxH={"100vh"} overflowY={"hidden"}>
//       <ImageGenerationNavbar
//         currentUserId={currentUserId}
//         setRemainingCreditsUpdated={setRemainingCreditsUpdated}
//         remainingCreditsUpdated={remainingCreditsUpdated}
//         filteredPaidUsersData={filteredPaidUsersData[0]}
//         productPriceData={productPriceData}
//         stripeSecretKey={stripeSecretKey}
//         fireconfig={fireconfig}
//       />
//     <TextToImageGenerator
//       currentUserId={currentUserId}
//       fireconfig={fireconfig}
//       filteredPaidUsersData={filteredPaidUsersData}
//       stripeSecretKey={stripeSecretKey.stripeSecretKey}
//       productPriceData={productPriceData.data}
//       inspirationImage={inspirationImage}
//       inspirationPrompt={inspirationPrompt}
//       inspirationNegative_prompt={inspirationNegative_prompt}
//       inspirationSeed={inspirationSeed}
//       inspirationModel={inspirationModel}
//       inspirationModelId={inspirationModelId}
//       inspirationSampler={inspirationSampler}
//     />
//     </Box>
//   );
// };

// export default ImageGenerationContainer;
