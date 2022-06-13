import { Box, Flex, useColorMode, Text } from "@chakra-ui/react";
import { shadows } from "config/theme";
import React from "react";
import Image from "next/image";

function Download() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "#ffffff" : undefined}
      shadow={shadows[colorMode]}
      padding={"12px"}
      mt={"16px"}
    >
      <Flex>
        <Image src={'/download.png'} alt={"download"} width={"50px"} height={"50px"} />
        <Flex ml={"8px"} flexDir={"column"} justify={"space-between"}>
          <Text fontSize={"15px"} fontWeight={"500"}>
            下载稀土掘金App
          </Text>
          <Text fontSize={"10px"}>一个帮助开发者成长的社区</Text>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Download;
