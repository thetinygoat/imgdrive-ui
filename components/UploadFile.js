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
  useDisclosure,
  Button,
  Input,
} from "@chakra-ui/react";
import { uploadFile } from "../utils/api";
import { useFiles } from "../hooks/zustand";
export default function UploadFile({ isOpen, onClose, parent }) {
  const [file, setFile] = useState(null);
  const files = useFiles((state) => state.files);
  const updateFiles = useFiles((state) => state.updateFiles);
  const handleUpload = async () => {
    const data = await uploadFile(file, parent);
    if (data.status === 201) {
      const newFiles = [data.data.file, ...files];
      updateFiles(newFiles);
      onClose();
    }
  };
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Upload File</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleUpload}>
              Upload
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
