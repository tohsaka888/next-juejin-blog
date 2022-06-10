import React, { useCallback, useContext } from "react";
import { Box, Flex, useColorMode, Text, Button, useToast } from "@chakra-ui/react";
import { shadows } from "config/theme";
import { FcCalendar } from "react-icons/fc";
import { LoginStatusContext } from "context/Context";
import { baseUrl } from "config/baseUrl";
import { SignResponse } from "config/type";

function DailySign() {
  const { colorMode } = useColorMode();
  const { loginStatus } = useContext(LoginStatusContext)!;
  const toast = useToast()
  const sign = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/sign/${loginStatus.userId}`);
    const data: SignResponse = await res.json();
    if (data.success) {
      toast({
        description: data.msg,
        status: "success",
        position: "top"
      });
    } else {
      toast({
        description: data.msg,
        status: "warning",
        position: "top"
      })
    }
  }, [loginStatus.userId, toast])
  return (
    <Box
      bg={colorMode === "light" ? "#ffffff" : undefined}
      shadow={shadows[colorMode]}
      padding={"24px 8px"}
    >
      <Flex justify={"space-around"} align={"center"} mb={"16px"}>
        <Flex>
          <FcCalendar size={28} />
          <Text fontSize={"18px"} ml={"8px"} fontWeight={"700"}>
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
          onClick={sign}
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
