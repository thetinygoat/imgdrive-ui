import { useState } from "react";
import {
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
} from "@chakra-ui/react";
import { addFolder } from "../utils/api";
import { useFolders } from "../hooks/zustand";
export default function AddFolder({ isOpen, onClose, parent }) {
  const [name, setName] = useState("");
  const folders = useFolders((state) => state.folders);
  const updateFolders = useFolders((state) => state.updateFolders);
  const handleAdd = async () => {
    const data = await addFolder(name, parent);
    if (data.status === 201) {
      const newFolders = [...folders, data.data.folder];
      updateFolders(newFolders);
      setName("");
      onClose();
    }
  };
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Folder</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Folder Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAdd}>
              Add
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
