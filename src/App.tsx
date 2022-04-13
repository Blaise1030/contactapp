import { AddIcon, ArrowBackIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  useBreakpointValue,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import AddContactsPage from "./AddContactsPage";

function App() {
  return (
    <Box w={"100vw"} h={"100vh"} overflowX="hidden">
      <Box w={["100%", 700, 700]} h={"100%"} margin={"auto"} p={4}>
        <ContactsPage />
      </Box>
    </Box>
  );
}

export default App;

const ContactsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onClose, onToggle } = useDisclosure();
  const drawerPosition = useBreakpointValue({ base: "bottom", lg: "right" });

  const inputSize = useBreakpointValue({ base: "md", lg: "lg" });

  const [contacts, setContacts] = useState([1, 2, 3, 4, 5, 6, 7, 7, 8]);

  return (
    <>
      {/* Navbar */}
      <HStack>
        <IconButton icon={<ArrowBackIcon />} variant="solid" aria-label={""} />
        <Spacer />
        <IconButton
          icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
          onClick={toggleColorMode}
          aria-label={"lightMode"}
        />

        <IconButton
          icon={<AddIcon />}
          aria-label={"addIcon"}
          onClick={onToggle}
        />
      </HStack>

      {/* Drawer */}
      <Drawer
        placement={drawerPosition as any}
        onClose={onClose}
        isOpen={isOpen}
        size={"md"}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader fontSize={"3xl"} fontWeight="black" my={4}>
            New Contact
          </DrawerHeader>
          <DrawerBody>
            <Input
              size={inputSize}
              placeholder="Contact Name"
              variant={"filled"}
              mb={2}
            ></Input>
            <Input
              size={inputSize}
              placeholder="Phone Number"
              variant={"filled"}
              mb={2}
            ></Input>
          </DrawerBody>

          <DrawerFooter>
            <Button isFullWidth size={"lg"} colorScheme="twitter">
              Add Contact
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* List */}
      <Text fontSize={"3xl"} fontWeight="black" my={4}>
        Contacts
      </Text>
      <Input size={inputSize} placeholder="Search" variant={"filled"}></Input>
      <Box pt={2}>
        {contacts.map((_, index) => (
          <ContactCards key={index} />
        ))}
      </Box>
    </>
  );
};

const ContactCards = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <HStack
        _hover={{
          bg: colorMode === "light" ? "blue.50" : "rgba(66,153,225,0.3)",
          cursor: "pointer",
          rounded: "md",
        }}
        px={5}
        py={4}
      >
        <Avatar mr={3} />
        <span>
          Name
          <br />
          Phone Number
        </span>
      </HStack>
      <Divider />
    </>
  );
};
