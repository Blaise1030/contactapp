import {
  Input,
  Button,
  Drawer,
  HStack,
  DrawerBody,
  IconButton,
  DrawerFooter,
  DrawerHeader,
  DrawerContent,
  DrawerOverlay,
  DrawerCloseButton,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useContext, useEffect, useState } from "react";
import { useContactRecord } from "../context/ContactRecordContext";

const EditContactsDrawer = ({ onClose, isOpen, selectedId }: any) => {
  const drawerPosition = useBreakpointValue({ base: "bottom", lg: "right" });
  const inputSize = useBreakpointValue({ base: "md", lg: "lg" });
  const toast = useToast();
  const { contacts, editContact, deleteContact } = useContext(useContactRecord);
  const [contact, setContact] = useState({
    phoneNumber: "",
    name: "",
  });

  // Set the input to default value
  useEffect(() => {
    const contact = contacts.filter((c: any) => c.id === selectedId);
    if (contact.length > 0)
      setContact({
        ...contact[0],
      });
  }, [selectedId, contacts]);

  const onContactsEdit = (e: any) => {
    e.preventDefault();

    if (e.target.name.value.length === 0) {
      toast({
        title: "Name cannot be empty",
        position: "top",
        status: "error",
      });
      return;
    }

    if (e.target.phoneNumber.value.length === 0) {
      toast({
        title: "Phone Number cannot be empty",
        position: "top",
        status: "error",
      });
      return;
    }

    editContact(selectedId, {
      name: e.target.name.value,
      phoneNumber: e.target.phoneNumber.value,
    });
    onClose();

    toast({
      title: "Contact Edited",
      position: "top",
      status: "success",
    });
  };

  const onContactsDelete = () => {
    deleteContact(selectedId);
    onClose();
    toast({
      title: "Contact Deleted",
      position: "top",
      status: "success",
    });
  };

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
          <form id={"editContact"} onSubmit={onContactsEdit}>
            <Input
              defaultValue={contact.name}
              placeholder="Contact Name"
              variant={"filled"}
              size={inputSize}
              name="name"
              mb={2}
            ></Input>
            <Input
              defaultValue={contact.phoneNumber}
              placeholder="Phone Number"
              name="phoneNumber"
              variant={"filled"}
              size={inputSize}
              mb={2}
            ></Input>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <HStack w={"full"}>
            <IconButton
              onClick={onContactsDelete}
              aria-label={"EditIcon"}
              icon={<DeleteIcon />}
              colorScheme="red"
              size={"lg"}
            />
            <Button
              colorScheme="linkedin"
              form="editContact"
              type="submit"
              isFullWidth
              size={"lg"}
            >
              Edit Contact
            </Button>
          </HStack>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default EditContactsDrawer;
