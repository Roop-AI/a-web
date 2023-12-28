import { useDisclosure, Stack, Box, Text, Tooltip } from "@chakra-ui/react";
import Link from "next/link";
interface NavItem {
  label?: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  uniqueKey?: any;
  key?: any;
}
const MobileNavItem = ({ label, children, href, uniqueKey }: NavItem) => {
  const { onToggle } = useDisclosure();
  return (
    <Stack
      key={uniqueKey}
      spacing={4}
      onClick={children && onToggle}
      alignItems={"center"}
      justifyContent={"center"}
    >
      {" "}
      {label === "Home" ? (
        <Link href={"/"}>
          <Box
            py={2}
            justifyContent="space-between"
            alignItems="center"
            _hover={{
              textDecoration: "none",
            }}
            fontFamily="Poppins"
            fontWeight={500}
            fontSize={"20px"}
          >
            <Text fontWeight={600}>{label}</Text>
          </Box>
        </Link>
      ) : (
        <Tooltip label="Coming Soon" fontSize="14px">
          <Box
            py={2}
            as="a"
            href={href ?? "#"}
            justifyContent="space-between"
            alignItems="center"
            _hover={{
              textDecoration: "none",
            }}
            fontFamily="Poppins"
            fontWeight={500}
            fontSize={"20px"}
          >
            <Text fontWeight={600}>{label}</Text>
          </Box>
        </Tooltip>
      )}
    </Stack>
  );
};

export default MobileNavItem;
