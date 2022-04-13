import {
  Box,
  Text,
  Input,
  HStack,
  Spacer,
  IconButton,
  useColorMode,
  useDisclosure,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import ContactCards from "./components/ContactCard";
import AddContactsDrawer from "./components/AddContactsDrawer";
import EditContactsDrawer from "./components/EditContactsDrawer";
import { useContactRecord } from "./context/ContactRecordContext";
import { ArrowBackIcon, MoonIcon, SunIcon, AddIcon } from "@chakra-ui/icons";

const ContactsPage = () => {
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
  const { colorMode, toggleColorMode } = useColorMode();
  const { contacts } = useContext(useContactRecord);
  const [selectedId, setSelectedId] = useState();

  const onClickCards = (id: any) => {
    setSelectedId(id);
    onToggleEdit();
  };

  return (
    <>
      {/* Drawers */}
      <AddContactsDrawer onClose={onCloseAdd} isOpen={isOpenAdd} />
      <EditContactsDrawer
        selectedId={selectedId}
        onClose={onCloseEdit}
        isOpen={isOpenEdit}
      />

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

      {/* List */}
      <Text fontSize={"3xl"} fontWeight="black" my={4}>
        Contacts
      </Text>
      <Input size={inputSize} placeholder="Search" variant={"filled"}></Input>
      <Box pt={2}>
        {contacts.map(({ name, phoneNumber, id }: any) => (
          <ContactCards
            inflateDrawer={onClickCards}
            phoneNumber={phoneNumber}
            name={name}
            key={id}
            id={id}
          />
        ))}
      </Box>
    </>
  );
};

export default ContactsPage;
