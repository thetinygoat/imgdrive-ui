import { Box, Text, SimpleGrid, Flex } from "@chakra-ui/react";
import { useFolders } from "../hooks/zustand";
import FolderCard from "./FolderCard";

export default function FolderView() {
  const folders = useFolders((state) => state.folders);
  const updateFolders = useFolders((state) => state.updateFolders);
  return (
    <Box>
      <Flex justify="space-between" alignItems="center">
        <Text fontSize="3xl" my={4}>
          Folders
        </Text>
      </Flex>
      <SimpleGrid columns={4} gap={4}>
        {folders.map((folder) => {
          return <FolderCard folder={folder} key={folder._id} />;
        })}
      </SimpleGrid>
    </Box>
  );
}
