import React from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { shadows } from "../../config/theme";

function Sider() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "#ffffff" : undefined}
      flex={1}
      marginLeft={"16px"}
      shadow={shadows[colorMode]}
      pos={"relative"}
      top={"0px"}
    >
      {/* fixed object */}
      <Box
        pos={"fixed"}
        top={"100px"}
        width={"16vw"}
        height={"80px"}
        border={"1px solid"}
        opacity={"0"}
      ></Box>
    </Box>
  );
}

export default Sider;
