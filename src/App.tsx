import { AddIcon, ArrowBackIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Divider,
  HStack,
  IconButton,
  Input,
  Spacer,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Box w={"100vw"} h={"100vh"} overflowX="hidden">
      <Box w={["100%", 500, 500]} h={"100%"} margin={"auto"} p={4}>
        <HStack>
          <IconButton
            icon={<ArrowBackIcon />}
            variant="solid"
            aria-label={""}
          />
          <Spacer />
          <IconButton
            icon={colorMode === "dark" ? <MoonIcon /> : <SunIcon />}
            onClick={toggleColorMode}
            aria-label={"lightMode"}
          />

          <IconButton icon={<AddIcon />} aria-label={"addIcon"} />
        </HStack>

        <Text fontSize={"3xl"} fontWeight="black" my={4}>
          Contacts
        </Text>
        <Input placeholder="Search" variant={"filled"}></Input>
        <Box pt={2}>
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
          <ContactCards />
        </Box>
      </Box>
    </Box>
  );
}

export default App;

const ContactCards = () => {
  return (
    <>
      <HStack px={2} py={4}>
        <Avatar />
        <VStack align={"start"}>
          <span>
            Name
            <br />
            Phone Number
          </span>
        </VStack>
      </HStack>
      <Divider />
    </>
  );
};
