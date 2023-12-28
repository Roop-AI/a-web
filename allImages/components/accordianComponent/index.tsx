import AllImages from "@/allImages";
import accordianData from "@/data/accordianData";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Image,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";

const AccordianComponent = () => {
  const [openItem, setOpenItem] = useState<any>([]);

  const handleToggle = (index: any) => {
    if (openItem === index) {
      setOpenItem(-1);
    } else {
      setOpenItem(index);
    }
  };
  return (
    <>
      <Box w={"full"} bg={"#12161A"} pt={"94.6px"} pb={"136px"}>
        <Grid
          templateColumns={{ base: "repeat(1, 1fr)", xl: "repeat(5, 1fr)" }}
          gap={"85px"}
          ml={{ xl: "8%" }}
          maxW={{ base: "95%", xl: "" }}
          mx={"auto"}
        >
          <Text
            color={"#F44EDD"}
            fontWeight={700}
            fontSize={useBreakpointValue({ base: "36px", lg: "52px" })}
          >
            Frequently Asked Questions
          </Text>
          <GridItem colSpan={{ xl: 4 }} colEnd={{ xl: 3 }}>
            <Accordion display={"grid"} gap={"26px"} defaultIndex={0}>
              {accordianData.map((data, index) => (
                <AccordionItem
                  key={index}
                  borderWidth={0}
                  borderStyle={"none"}
                  borderRadius={"39px"}
                  bg={"#1E1F22"}
                  boxShadow={"0 4px 6px #000000"}
                  isDisabled={openItem === index}
                  pb={openItem === index ? "26px" : "0"}
                >
                  <h2>
                    <AccordionButton
                      onClick={() => openItem !== index && handleToggle(index)}
                      pt={"23px"}
                      pb={openItem === index ? 0 : "26px"}
                      pl={"29px"}
                      pr={"39px"}
                      css={{
                        pointerEvents: openItem === index ? "none" : "auto",
                        opacity: openItem === index ? "3.4 !important" : "3.4",
                      }}
                    >
                      <Box
                        as="span"
                        flex="1"
                        textAlign="left"
                        textColor={"#EBEBEB"}
                        fontFamily="poppins"
                        fontSize={{ base: "16px", lg: "20px" }}
                        fontWeight={600}
                      >
                        {data.title}
                      </Box>
                      <AccordionIcon
                        color={"white"}
                        css={{
                          opacity:
                            openItem === index ? "3.4 !important" : "3.4",
                        }}
                      />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel
                    pl={"41px"}
                    pr={"39px"}
                    pt={"27px"}
                    textAlign="left"
                    textColor={"#EBEBEB"}
                    fontFamily="Poppins"
                    fontSize={{ base: "16px", lg: "18px" }}
                  >
                    {data.desc}
                  </AccordionPanel>
                </AccordionItem>
              ))}
            </Accordion>
          </GridItem>
          <GridItem
            colSpan={{ xl: 4 }}
            colStart={{ xl: 3 }}
            colEnd={{ xl: 6 }}
            display={"flex"}
            justifyContent={"flex-end"}
            alignItems={"center"}
          >
            <Image
              src={AllImages.TalentSearch4?.src}
              objectFit={"contain"}
              h={"438px"}
              w={"100%"}
              alt="group image"
            />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default AccordianComponent;
