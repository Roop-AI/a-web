import { Box, Grid, Image, Skeleton, Text } from "@chakra-ui/react";
import PaymentModal from "../paymentModal";
import { useSubscriptionModal } from "@/hooks/useSubscriptionModal";
import Premium from "../premium";
interface TextToImageModalInterface {
  key: number;
  uniqueKey: number;
  imageSrc: string;
  modelName: string;
  modelId: string;
  title: string;
  samplerIndex: any;
  isPremium: boolean;
  isPro: boolean;
  stripeSecretKey: string;
  productPriceData: any[];
  handleModelClick: (
    key: number,
    modelId: string,
    modelName: string,

    title: string,
    samplerIndex: any
  ) => void;
  selectedModalImageIndex: number;
}

const TextToImageModal: React.FC<TextToImageModalInterface> = (props) => {
  const { isSubscriptionOpen, onSubscriptionOpen, onSubscriptionClose } =
    useSubscriptionModal();

  return (
    <>
      {!props.imageSrc ? (
        <Skeleton
          startColor="#3D3E41"
          endColor="#2B2C2F"
          w={"87px"}
          h={"87px"}
        />
      ) : (
        <Box
          key={props.uniqueKey}
          onClick={() =>
            props.isPremium && !props.isPro
              ? onSubscriptionOpen()
              : props.handleModelClick(
                  props.key,
                  props.modelId,
                  props.modelName,

                  props.title,
                  props.samplerIndex
                )
          }
        >
          <Box pos={"relative"}>
            {props.isPremium && !props.isPro && (
              <Premium
                color="white"
                width={"28px"}
                height={"18px"}
                borderRadius={"5px"}
                top={"8px"}
                right={"8px"}
                fontSize={"10px"}
              />
            )}

            <Image
              cursor={"grab"}
              src={props.imageSrc}
              w={"87px"}
              h={"87px"}
              objectFit={"cover"}
              borderRadius={"10px"}
              alt="model"
              loading="lazy"
              border={
                props.selectedModalImageIndex === props.uniqueKey
                  ? "1px solid #19F4D4"
                  : "1px solid rgba(100, 100, 100, 0.5)"
              }
            />
            <Box
              pos={"absolute"}
              top={0}
              left={0}
              w={"87px"}
              h={"87px"}
              bgGradient={
                "linear(to top, rgba(25, 19, 36, 1), rgba(25, 19, 36, 0))"
              }
              borderRadius={"10px"}
            ></Box>
            {/* {props.selectedModalImageIndex === props.uniqueKey && (
                <Box
                  pos={"absolute"}
                  top={0}
                  left={0}
                  w={"81px"}
                  h={"81px"}
                  bgGradient={
                    "linear(to top, rgba(255, 0, 220, 0.45), rgba(255, 0, 220, 0.0))"
                  }
                  borderRadius={"10px"}
                  border={"1px solid #FF5CE9"}
                ></Box>
              )} */}
            <Text
              pos={"absolute"}
              color={"#ffffff"}
              bottom={"3px"}
              w={"100%"}
              textAlign={"center"}
              fontFamily="Poppins"
              fontSize={"12px"}
              fontWeight={500}
              style={{ whiteSpace: "nowrap" }}
            >
              {props.title}
            </Text>
          </Box>
          <PaymentModal
            isSubscriptionOpen={isSubscriptionOpen}
            onSubscriptionClose={onSubscriptionClose}
            stripeSecretKey={props.stripeSecretKey}
            productPriceData={props.productPriceData}
          />
        </Box>
      )}
    </>
  );
};

export default TextToImageModal;
