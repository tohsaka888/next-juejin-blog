import React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { shadows } from "../../config/theme";

function Content() {
  const { colorMode } = useColorMode();
  return (
    <Box
      height={"100vh"}
      flex={3}
      bg={colorMode === "light" ? "#fff" : undefined}
      shadow={shadows[colorMode]}
      borderRadius={"8px"}
    ></Box>
  );
}

export default Content;
