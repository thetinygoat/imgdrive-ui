import { Box } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
    <Box my={4}>
      <Link href="/">
        <Image src="/img/ImgDrive.svg" height="42" width="100" />
      </Link>
    </Box>
  );
}
