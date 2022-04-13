import {
  Button,
  Center,
  Divider,
  Input,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";

const AddContactsPage = () => {
  return (
    <Center h="full" w="full">
      <VStack w={"full"} align="start" h="full">
        <Spacer></Spacer>
        <Text fontSize={"3xl"} fontWeight="black" my={4}>
          New Contact
        </Text>
        <Input placeholder="Contact Name" variant={"filled"} mb={2}></Input>
        <Input placeholder="Phone Number" variant={"filled"} mb={2}></Input>
        <Divider my={5} />
        <Button isFullWidth size={"lg"} colorScheme="twitter">
          Add Contact
        </Button>
      </VStack>
    </Center>
  );
};

export default AddContactsPage;
