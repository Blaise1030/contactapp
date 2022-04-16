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
  Skeleton,
} from "@chakra-ui/react";
import {
  MoonIcon,
  SunIcon,
  AddIcon,
  ArrowBackIcon,
  SmallCloseIcon,
} from "@chakra-ui/icons";
import { useContext, useState } from "react";
import EmptyState from "./components/EmptyState";
import ContactCards from "./components/ContactCard";
import AddContactsDrawer from "./components/AddContactsDrawer";
import EditContactsDrawer from "./components/EditContactsDrawer";
import { useContactRecord } from "./context/ContactRecordContext";

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
  const { contacts, isLoading } = useContext(useContactRecord);
  const { colorMode, toggleColorMode } = useColorMode();
  const [selectedId, setSelectedId] = useState();
  const [searchText, setOnSearch] = useState("");

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

      {isLoading ? (
        <Box pt={2}>
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <Skeleton
              rounded={"md"}
              width={"full"}
              height={"80px"}
              key={i}
              my={2}
            />
          ))}
        </Box>
      ) : contacts.length === 0 ? (
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
