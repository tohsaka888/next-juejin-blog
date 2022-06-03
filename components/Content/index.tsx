import React from "react";
import { Box, useColorMode } from "@chakra-ui/react";

function Content() {
  const { colorMode } = useColorMode();
  return (
    <Box
      height={"100vh"}
      flex={3}
      bg={colorMode === "light" ? "#fff" : undefined}
    ></Box>
  );
}

export default Content;
