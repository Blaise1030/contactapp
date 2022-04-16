import { Box, Button, Center, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Box w="full" h="full">
      <Center w="full" h="full">
        <VStack>
          <Text fontSize={"3xl"} fontWeight="black" mb={2}>
            Contact Book
          </Text>
          <Button size={"lg"} onClick={() => navigate("/contacts")}>
            Get Started
          </Button>
        </VStack>
      </Center>
    </Box>
  );
};

export default LoginPage;
