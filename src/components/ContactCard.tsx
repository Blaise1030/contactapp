import { useColorMode, HStack, Avatar, Divider } from "@chakra-ui/react";

const ContactCards = ({ inflateDrawer, name, phoneNumber, id }: any) => {
  const { colorMode } = useColorMode();
  return (
    <>
      <HStack
        onClick={() => inflateDrawer(id)}
        _hover={{
          bg: colorMode === "light" ? "blue.50" : "rgba(66,153,225,0.3)",
          cursor: "pointer",
          rounded: "md",
        }}
        px={5}
        py={4}
      >
        <Avatar mr={3} />
        <span>
          {name}
          <br />
          {phoneNumber}
        </span>
      </HStack>
      <Divider />
    </>
  );
};

export default ContactCards;
