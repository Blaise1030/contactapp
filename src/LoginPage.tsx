import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";

const LoginPage = () => {
  return (
    <Box w="full" h="full">
      <Center w="full" h="full">
        <VStack>
          <Text fontSize={"3xl"} fontWeight="black" mb={2}>
            Contact Book
          </Text>
          <Button size={"lg"}>Login</Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default LoginPage;
