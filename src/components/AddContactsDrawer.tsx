import {
  useBreakpointValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Input,
  DrawerFooter,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useContext } from "react";
import { useContactRecord } from "../context/ContactRecordContext";

const AddContactsDrawer = ({ onClose, isOpen }: any) => {
  const { addContact } = useContext(useContactRecord);
  const drawerPosition = useBreakpointValue({ base: "bottom", lg: "right" });
  const inputSize = useBreakpointValue({ base: "md", lg: "lg" });
  const toast = useToast();

  const onContactsAdd = (e: any) => {
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
    addContact({
      phoneNumber: e.target.phoneNumber.value,
      name: e.target.name.value,
    });

    toast({
      title: "Contact Added",
      position: "top",
      status: "success",
    });

    onClose();
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
          New Contact
        </DrawerHeader>
        <DrawerBody>
          <form id={"addContacts"} onSubmit={onContactsAdd}>
            <Input
              placeholder="Contact Name"
              variant={"filled"}
              size={inputSize}
              name={"name"}
              mb={2}
            ></Input>
            <Input
              placeholder="Phone Number"
              name={"phoneNumber"}
              variant={"filled"}
              size={inputSize}
              mb={2}
            ></Input>
          </form>
        </DrawerBody>

        <DrawerFooter>
          <Button
            colorScheme="linkedin"
            form="addContacts"
            type="submit"
            isFullWidth
            size={"lg"}
          >
            Add Contact
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AddContactsDrawer;
