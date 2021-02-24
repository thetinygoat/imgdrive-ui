import {
  Box,
  Text,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { useFiles } from "../hooks/zustand";

export default function FileView() {
  const files = useFiles((state) => state.files);
  return (
    <Box>
      <Text fontSize="3xl" my={4}>
        Files
      </Text>
      <Box>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Size</Th>
              <Th>Dimensions</Th>
              <Th>Format</Th>
            </Tr>
          </Thead>
          <Tbody>
            {files.map((file) => {
              return (
                <Tr key={file._id}>
                  <Td>{file.name}</Td>
                  <Td>{Math.ceil(file.size)} Kb</Td>
                  <Td>
                    {file.width}x{file.height}
                  </Td>
                  <Td>{file.format}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
