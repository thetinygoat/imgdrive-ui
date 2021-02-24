import { useState, useEffect } from "react";
import {
  Box,
  Text,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  IconButton,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { HiFolder, HiDotsVertical } from "react-icons/hi";
import { deleteDir, renameFolder } from "../utils/api";
import { useRouter } from "next/router";
import { useFolders } from "../hooks/zustand";

export default function FolderCard({ folder }) {
  const [folderName, setFolderName] = useState(folder.name);
  const folders = useFolders((state) => state.folders);
  const updateFolders = useFolders((state) => state.updateFolders);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const handleRename = async () => {
    const data = await renameFolder(folderName, folder._id);
    if (data.status === 200) onClose();
  };

  const handleDelete = async () => {
    const data = await deleteDir(folder._id);
    if (data.status === 200) {
      let newFolders = folders.filter((f) => {
        return f._id != folder._id;
      });
      updateFolders(newFolders);
    }
  };

  return (
    <Box
      bg="gray.100"
      p={4}
      borderRadius="lg"
      shadow="sm"
      _hover={{ shadow: "lg" }}
      onDoubleClick={() => router.push(`/folders/${folder._id}`)}
    >
      <Flex justify="space-between" alignItems="center">
        <HiFolder size={60} />
        <Menu>
          <MenuButton as={IconButton} icon={<HiDotsVertical />} />
          <MenuList>
            <MenuItem onClick={onOpen}>Rename</MenuItem>
            <MenuItem onClick={handleDelete}>Delete</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text fontWeight="bold">{folderName}</Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Rename Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleRename}>
              Rename
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
