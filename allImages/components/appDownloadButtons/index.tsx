import AllImages from "@/allImages";
import { Box, Flex, Grid, Image, Tooltip } from "@chakra-ui/react";
import DownloadButton from "../downloadButton";

const AppDownloadButtons = () => {
  return (
    <Box gap={"27px"} display={{ base: "grid", md: "flex" }}>
      {" "}
      <DownloadButton
        icon={<Image src={AllImages.apple?.src} h={"50px"} alt="Apple" />}
        appLink={""}
        download="Download on the"
        appSource="App Store"
      />
      <DownloadButton
        icon={
          <Image src={AllImages.googlePlay?.src} h={"50px"} alt="Google Play" />
        }
        appLink={
          "https://play.google.com/store/apps/details?id=com.aiart.jemini.nft.creator"
        }
        download="Get It On"
        appSource="Play Store"
      />
    </Box>
  );
};

export default AppDownloadButtons;
