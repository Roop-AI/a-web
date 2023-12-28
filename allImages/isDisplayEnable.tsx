import { useBreakpointValue } from "@chakra-ui/react";

const IsDisplayEnabled = () => {
  return useBreakpointValue({ base: false, lg: true });
};

export default IsDisplayEnabled;
