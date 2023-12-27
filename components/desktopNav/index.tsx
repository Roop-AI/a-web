import { NAV_ITEMS } from "@/data/navItemsData";
import { Box, Stack, Popover, PopoverTrigger, Tooltip } from "@chakra-ui/react";

const DesktopNav = () => {
  return (
    <Stack direction={"row"} spacing={"2.18vw"}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              {navItem.label === "Home" ? (
                <Box
                  as="a"
                  px={"0.57vw"}
                  py={"0.98vh"}
                  href={navItem.href ?? "#"}
                  fontSize={"15px"}
                  fontWeight={600}
                  fontFamily="Poppins"
                  borderBottom={"1px solid #19F4D4"}
                  color={"#ffffff"}
                  _hover={{
                    textDecoration: "none",
                    color: "#ffffff",
                  }}
                >
                  {navItem.label}
                </Box>
              ) : (
                <Tooltip label="Coming Soon" fontSize="14px">
                  <Box
                    as="a"
                    px={"0.57vw"}
                    py={"0.98vh"}
                    href={navItem.href ?? "#"}
                    fontSize={"15px"}
                    fontWeight={400}
                    fontFamily="Poppins"
                    color={"#ffffff"}
                    _hover={{
                      textDecoration: "none",
                      color: "#FFFFFF",
                    }}
                  >
                    {navItem.label}
                  </Box>
                </Tooltip>
              )}
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

export default DesktopNav;
