import React from "react";
import { Box, Flex, useColorMode, Text, Button } from "@chakra-ui/react";
import { shadows } from "config/theme";
import { FcCalendar } from "react-icons/fc";

function DailySign() {
  const { colorMode } = useColorMode();
  return (
    <Box
      bg={colorMode === "light" ? "#ffffff" : undefined}
      shadow={shadows[colorMode]}
      padding={"24px 8px"}
    >
      <Flex justify={"space-around"} align={"center"} mb={"8px"}>
        <Flex>
          <FcCalendar size={30} />
          <Text fontSize={"20px"} ml={"8px"} fontWeight={"bold"}>
            晚上好!
          </Text>
        </Flex>
        <Button
          bg={"transparent"}
          borderRadius={"20px"}
          border={"1px solid #1890ff"}
          color={"#1890ff"}
          height={"30px"}
          fontSize={"14px"}
        >
          去签到
        </Button>
      </Flex>
      <Flex width={"100%"} justify={"center"} fontSize={"14px"}>
        点亮你在社区的每一天
      </Flex>
    </Box>
  );
}

export default DailySign;
