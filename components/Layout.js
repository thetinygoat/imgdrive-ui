import { Box, Container } from "@chakra-ui/react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <Box w="80%" mx="auto">
      <Navbar />
      {children}
    </Box>
  );
}
