import AllImages from "@/allImages";
import { Flex, Image, Stack, Text } from "@chakra-ui/react";

const FixedQrCode = () => {
  return (
    <Stack
      w={"82px"}
      pos={"fixed"}
      bottom={"22px"}
      right={"71px"}
      zIndex={60}
      sx={{
        "@media (min-width: 1024px)": {
          display: "grid",
        },
        "@media (max-width: 1023px)": {
          display: "none",
        },
      }}
    >
      <Text
        textAlign={"center"}
        color={"#36DBC3"}
        fontSize={"20px"}
        fontWeight={600}
        fontFamily={"poppins"}
      >
        Scan Me
      </Text>
      <Flex
        className="qrcode-background"
        w={"132px"}
        height={"133px"}
        border={"1px solid rgba(112, 112, 112, 0.3)"}
        borderRadius={"20px"}
        // transform={"translate(-50%, -50%)"}

        justify={"center"}
        align={"center"}
      >
        <Image
          src={AllImages.qrAppstore.src}
          w={"104px"}
          h={"105px"}
          objectFit={"cover"}
          alt="qr code"
        />
      </Flex>
    </Stack>
  );
};

export default FixedQrCode;
