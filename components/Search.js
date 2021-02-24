import { useState } from "react";
import {
  Box,
  Input,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Flex,
  Select,
} from "@chakra-ui/react";
import { searchFiles } from "../utils/api";
const debounce = require("lodash.debounce");

export default function SearchBar() {
  const [results, setResults] = useState([]);
  const [format, setFormat] = useState(null);
  const handleSearch = async (e) => {
    const query = e.target.value.trim();
    if (query === "") {
      setResults([]);
      return;
    }
    const data = await searchFiles(query, format);
    setResults(data.data.files);
  };
  const debounceEvent = (...args) => {
    const debouncedEvent = debounce(...args);
    return (e) => {
      e.persist();
      return debouncedEvent(e);
    };
  };
  return (
    <Box my={8}>
      <Flex>
        <Input
          placeholder="Search files"
          onChange={debounceEvent(handleSearch, 300)}
        />
        <Select
          placeholder="Format"
          onChange={(e) => setFormat(e.target.value)}
        >
          <option value="png">PNG</option>
          <option value="jpg">JPG</option>
        </Select>
      </Flex>
      <Box mt={8}>
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
            {results.map((file) => {
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
