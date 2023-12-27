import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  useDisclosure,
  Stack,
  Box,
  Text,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Collapse,
  useColorModeValue,
  Icon,
  Flex,
} from "@chakra-ui/react";
interface NavItem {
  label?: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
  uniqueKey?: any;
  key?: any;
}
const ImageGenerationMobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={'gray.600'}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

export default ImageGenerationMobileNavItem;
