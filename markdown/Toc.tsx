import { Box, useColorMode, Text, Divider, Flex } from "@chakra-ui/react";
import { shadows } from "config/theme";
import React from "react";

function Toc(props: any) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      position={"fixed"}
      {...props}
      right={"13vw"}
      top={"80px"}
      maxW={"18vw"}
      width={"18vw"}
      boxShadow={shadows[colorMode]}
      className="toc"
      bg={colorMode === "light" ? "#fff" : undefined}
      alignItems={"center"}
      flexDir={"column"}
    >

      <Text mt={"12px"} mb={"12px"} fontSize={"17px"} fontWeight={"700"} alignSelf={"flex-start"} ml={'12px'}>
        目录
      </Text>

      <Divider mb={"12px"} />
      {props.children}
    </Flex>
  );
}

export default Toc;
