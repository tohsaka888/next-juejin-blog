import { Box, useColorMode, Text, Divider, Flex } from "@chakra-ui/react";
import { shadows } from "config/theme";
import React from "react";

function Toc(props: any) {
  const { colorMode } = useColorMode();
  return (
    <Flex
      position={"fixed"}
      {...props}
      right={"10vw"}
      top={"5rem"}
      maxW={"18vw"}
      width={"18vw"}
      boxShadow={shadows[colorMode]}
      className="toc"
      bg={colorMode === "light" ? "#fff" : undefined}
      alignItems={"center"}
      flexDir={"column"}
      maxH={'43.75rem'}
      overflowY={"auto"}
    >

      <Text mt={".75rem"} mb={".75rem"} fontSize={"1.0625rem"} fontWeight={"700"} alignSelf={"flex-start"} ml={'.75rem'}>
        目录
      </Text>

      <Divider mb={".75rem"} />
      {props.children}
    </Flex>
  );
}

export default Toc;
