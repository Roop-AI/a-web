// DataDisplay.tsx

import { Box, Image } from "@chakra-ui/react";

interface DataDisplayProps {
  key: number;
  image: string; 
}

const DataDisplay: React.FC<DataDisplayProps> = (props) => {

  return (
    <Box>
      <Image src={props.image} borderRadius={'12px'} boxShadow={"0 5px 10px #000000"} alt="Artwork" />
    </Box>
  );
};

export default DataDisplay;
