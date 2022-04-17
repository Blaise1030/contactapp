import { AddIcon } from "@chakra-ui/icons";
import { Box, Button, Heading, VStack, Text } from "@chakra-ui/react";

const EmptyState = ({
  onAddContact,
  description,
  title,
}: {
  description: string;
  onAddContact: any;
  title: string;
}) => {
  return (
    <VStack mt={20}>
      <Heading size="lg">👋🏼 {title}</Heading>
      <Text>{description}</Text>
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
