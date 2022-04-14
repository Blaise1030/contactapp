import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack, Text, Center } from "@chakra-ui/react";

const EmptyState = ({ onAddContact }: { onAddContact: any }) => {
  return (
    <VStack mt={20}>
      <Heading size="lg">👋🏼 No Contacts</Heading>
      <Text>Start by adding contacts</Text>
      <Box h={2} />
      <Button
        colorScheme={"linkedin"}
        onClick={onAddContact}
        leftIcon={<AddIcon />}
      >
        Add Contacts
      </Button>
    </VStack>
  );
};

export default EmptyState;
