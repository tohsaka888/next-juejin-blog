import { Box, useColorMode, Text, Divider } from "@chakra-ui/react";
import { shadows } from "config/theme";
import React from "react";

function Toc(props: any) {
  const { colorMode } = useColorMode();
  return (
    <Box
      position={"fixed"}
      {...props}
      right={"13vw"}
      top={"80px"}
      maxW={"18vw"}
      width={"18vw"}
      boxShadow={shadows[colorMode]}
      padding={"12px"}
      className="toc"
      bg={colorMode === "light" ? "#fff" : undefined}
    >
      <Text mb={"12px"} fontSize={"17px"} fontWeight={"700"}>
        目录
      </Text>
      <Divider mb={"12px"} />
      {props.children}
    </Box>
  );
}

export default Toc;
