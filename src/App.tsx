import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import ContactsPage from "./ContactsPage";
import LoginPage from "./LoginPage";

function App() {
  return (
    <Box w={"100vw"} h={"100vh"} overflowX="hidden">
      <Box w={["100%", 700, 700]} h={"100%"} margin={"auto"} p={4}>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;
