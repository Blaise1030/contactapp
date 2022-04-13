import {
  AddIcon,
  ArrowBackIcon,
  DeleteIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import {
  Input,
  Avatar,
  Text,
  Box,
  Button,
  Divider,
  Spacer,
  HStack,
  Drawer,
  DrawerBody,
  IconButton,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  useColorMode,
  useDisclosure,
  DrawerOverlay,
  DrawerCloseButton,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Box w={"100vw"} h={"100vh"} overflowX="hidden">
      <Box w={["100%", 700, 700]} h={"100%"} margin={"auto"} p={4}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;

const ContactsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isOpenAdd,
    onClose: onCloseAdd,
    onToggle: onToggleAdd,
  } = useDisclosure();

  const {
    isOpen: isOpenEdit,
    onClose: onCloseEdit,
    onToggle: onToggleEdit,
  } = useDisclosure();

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
          onClick={onToggleAdd}
        />
      </HStack>

      <AddContactsDrawer onClose={onCloseAdd} isOpen={isOpenAdd} />
      <EditContactsDrawer onClose={onCloseEdit} isOpen={isOpenEdit} />

      {/* List */}
      <Text fontSize={"3xl"} fontWeight="black" my={4}>
        Contacts
      </Text>
      <Input size={inputSize} placeholder="Search" variant={"filled"}></Input>
      <Box pt={2}>
        {contacts.map((_, index) => (
          <ContactCards key={index} inflateDrawer={onToggleEdit} />
        ))}
      </Box>
    </>
  );
};

const AddContactsDrawer = ({ onClose, isOpen }: any) => {
  const drawerPosition = useBreakpointValue({ base: "bottom", lg: "right" });
  const inputSize = useBreakpointValue({ base: "md", lg: "lg" });

  return (
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
  );
};

const EditContactsDrawer = ({ onClose, isOpen }: any) => {
  const drawerPosition = useBreakpointValue({ base: "bottom", lg: "right" });
  const inputSize = useBreakpointValue({ base: "md", lg: "lg" });
  return (
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
          Edit Contact
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
          <HStack w={"full"}>
            <IconButton
              icon={<DeleteIcon />}
              aria-label={"EditIcon"}
              colorScheme="red"
              size={"lg"}
            />
            <Button isFullWidth size={"lg"} colorScheme="twitter">
              Edit Contact
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

const ContactCards = ({ inflateDrawer }: any) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <HStack
        onClick={inflateDrawer}
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
