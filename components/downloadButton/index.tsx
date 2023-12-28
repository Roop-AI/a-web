import AllImages from "@/allImages";
import { Box, Button, Grid, Image, Tooltip } from "@chakra-ui/react";
import Link from "next/link";

interface DownloadButtonProps {
  icon?: React.ReactElement;
  appLink?: any;
  download?: string;
  appSource?: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = (props) => {
  return (
    <>
      {props.appSource === "App Store" ? (
        <Tooltip label="Coming Soon" fontSize="14px" color={"white"}>
          {/* <Link href={props.appLink ?? "/"}> */}
          <Button
            display={"flex"}
            border={"0.4px solid #7070704D"}
            alignItems={"center"}
            bg={"rgba(40, 40, 83, 0.7)"}
            color={"white"}
            _hover={{
              transform: "scale(1.1)",
              boxShadow: "0px 10px 16px #000000",
            }}
            transition="transform 0.5s"
            borderRadius="14px"
            w={"308px"}
            h={"94px"}
          >
            {props.icon}
            <Grid pl={"24px"} gap={"2.63px"}>
              <Box
                color={"white"}
                fontSize={"12px"}
                fontWeight={400}
                fontFamily={"Poppins"}
                textAlign={"start"}
              >
                {props.download}
              </Box>
              <Box
                color={"white"}
                fontSize={"20px"}
                fontWeight={600}
                fontFamily={"Poppins"}
              >
                {props.appSource}
              </Box>
            </Grid>
            <Image
              pl={"32px"}
              src={AllImages.qrAppstore?.src}
              h={"66px"}
              alt="qr code"
            />
          </Button>
          {/* </Link> */}
        </Tooltip>
      ) : (
        <Link href={props.appLink ?? ""}>
          <Button
            display={"flex"}
            border={"0.4px solid #7070704D"}
            alignItems={"center"}
            bg={"rgba(40, 40, 83, 0.7)"}
            color={"white"}
            _hover={{
              transform: "scale(1.1)",
              boxShadow: "0px 10px 16px #000000",
            }}
            transition="transform 0.5s"
            borderRadius="14px"
            w={"308px"}
            h={"94px"}
          >
            {props.icon}
            <Grid pl={"24px"} gap={"2.63px"}>
              <Box
                color={"white"}
                fontSize={"12px"}
                fontWeight={400}
                fontFamily={"Poppins"}
                textAlign={"start"}
              >
                {props.download}
              </Box>
              <Box
                color={"white"}
                fontSize={"20px"}
                fontWeight={600}
                fontFamily={"Poppins"}
              >
                {props.appSource}
              </Box>
            </Grid>{" "}
            <Image
              pl={"32px"}
              src={AllImages.qrPlaystore?.src}
              h={"66px"}
              alt="qr code"
            />
          </Button>
        </Link>
      )}
    </>
  );
};

export default DownloadButton;
