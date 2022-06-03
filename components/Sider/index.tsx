import React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { shadows } from "../../config/theme";

function Sider() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "#ffffff" : undefined}
      height={"100vh"}
      flex={1}
      marginLeft={"16px"}
      shadow={shadows[colorMode]}
      borderRadius={"8px"}
    ></Box>
  );
}

export default Sider;
