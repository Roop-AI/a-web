import { socialIconsData } from "@/data/socialIconsData";
import { Flex, Image, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

const FixedSocialComponent = () => {
  return (
    <Stack
      gap={"4px"}
      w={"82px"}
      pos={"fixed"}
      bottom={"22px"}
      left={0}
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
        color={"#1CE3D0"}
        fontSize={"12px"}
        fontWeight={500}
        fontStyle={"italic"}
        fontFamily={"poppins"}
      >
        Follow Us
      </Text>
      <Stack
        className="social-blur-background"
        w={"82px"}
        height={"275px"}
        border={"1px solid rgba(112, 112, 112, 0.3)"}
        borderRadius={"0 25px 25px 0"}
        // transform={"translate(-50%, -50%)"}
        gap={"21px"}
        justify={"center"}
        align={"center"}
      >
        {socialIconsData.map((data, index) => (
          <Link href={data.href} target="_blank" key={index}>
            <Flex
              w={"40px"}
              h={"40px"}
              bg={"#ffffff"}
              borderRadius={"50%"}
              align={"center"}
              justify={"center"}
            >
              <Image py={"6.73px"} src={data.icon?.src} alt={"social icons"} />
            </Flex>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};

export default FixedSocialComponent;
