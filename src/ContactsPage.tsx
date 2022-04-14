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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import ContactCards from "./components/ContactCard";
import AddContactsDrawer from "./components/AddContactsDrawer";
import EditContactsDrawer from "./components/EditContactsDrawer";
import { useContactRecord } from "./context/ContactRecordContext";
import {
  ArrowBackIcon,
  MoonIcon,
  SunIcon,
  AddIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import EmptyState from "./components/EmptyState";

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
  const [searchText, setOnSearch] = useState("");
  const [selectedId, setSelectedId] = useState();

  const clearText = () => setOnSearch("");
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
      <InputGroup size={inputSize}>
        <Input
          onChange={(e) => setOnSearch(e.target.value)}
          value={searchText}
          placeholder="Search"
          variant={"filled"}
          name="search"
        />
        {searchText.length && (
          <InputRightElement>
            <IconButton
              size={"sm"}
              aria-label={"Cross"}
              icon={<SmallCloseIcon />}
              onClick={clearText}
            />
          </InputRightElement>
        )}
      </InputGroup>

      {contacts.length === 0 ? (
        <EmptyState onAddContact={onToggleAdd} />
      ) : (
        <Box pt={2}>
          {contacts
            .filter(
              ({ name, phoneNumber }: any) =>
                name.toString().includes(searchText) ||
                phoneNumber.toString().includes(searchText)
            )
            .map(({ name, phoneNumber, id }: any) => (
              <ContactCards
                inflateDrawer={onClickCards}
                phoneNumber={phoneNumber}
                name={name}
                key={id}
                id={id}
              />
            ))}
        </Box>
      )}
    </>
  );
};

export default ContactsPage;
