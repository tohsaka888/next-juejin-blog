import React from "react";
import { Box, useColorMode } from "@chakra-ui/react";

function Sider() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "#fff" : undefined}
      height={"100vh"}
      flex={1}
      marginLeft={"16px"}
    ></Box>
  );
}

export default Sider;
