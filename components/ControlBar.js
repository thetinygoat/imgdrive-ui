import { useState } from "react";
import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
  Input,
  Button,
} from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";
import AddFolder from "./AddFolder";
import UploadFile from "./UploadFile";
import { useRouter } from "next/router";

export default function ControlBar({ parent }) {
  const [isFolderOpen, setFolderOpen] = useState(false);
  const [isFileOpen, setFileOpen] = useState(false);
  const router = useRouter();
  return (
    <Box py={8}>
      <Flex justifyContent="space-between">
        <Input
          placeholder="Search files"
          onClick={() => router.push("/search")}
        />
        <Menu>
          <MenuButton as={Button} rightIcon={<AddIcon />} colorScheme="blue">
            New
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setFolderOpen(true)}>Add Folder</MenuItem>
            <MenuItem onClick={() => setFileOpen(true)}>Upload File</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <AddFolder
        isOpen={isFolderOpen}
        onClose={() => setFolderOpen(false)}
        parent={parent}
      />
      <UploadFile
        isOpen={isFileOpen}
        onClose={() => setFileOpen(false)}
        parent={parent}
      />
    </Box>
  );
}
