import {
  Box,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
} from "@chakra-ui/react";
import { ModalProps } from "config/type";
import Image from "next/image";
import React, { useCallback, useReducer, useState } from "react";
import inviteLogin from "../../assets/image/invite-login.svg";
import password from "../../assets/image/password.svg";
import pendingLogin from "../../assets/image/pending-login.svg";

type ACTION = { type: "pending" } | { type: "invite" } | { type: "password" };

function LoginModal({ isOpen, onClose }: ModalProps) {
  const reducer = useCallback((state: any, action: ACTION) => {
    switch (action.type) {
      case "pending":
        return pendingLogin;
      case "invite":
        return inviteLogin;
      case "password":
        return password;
    }
  }, []);
  const [logo, dispatch] = useReducer(reducer, pendingLogin);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent pos={"relative"} mt={"30vh"} width={"380px"}>
        <Box
          pos={"absolute"}
          top={"-95px"}
          height={"100px"}
          width={"100%"}
          left={"50%"}
          ml={"-60px"}
        >
          <Image
            alt="none"
            width={"120px"}
            height={logo === password ? "110px" : "120px"}
            src={logo}
            style={{ zIndex: 1 }}
          />
        </Box>
        <ModalHeader>账密登录</ModalHeader>
        <ModalCloseButton />
        <ModalBody zIndex={100}>
          <Input
            placeholder="邮箱/手机号(国际号码加区号)"
            mb={"16px"}
            onFocus={() => dispatch({ type: "invite" })}
            onBlur={() => dispatch({ type: "pending" })}
          />
          <Input
            type={"password"}
            placeholder={"请输入密码"}
            onFocus={() => dispatch({ type: "password" })}
            onBlur={() => dispatch({ type: "pending" })}
          />
          <Button color="#fff" bg="#1890ff" mt={"16px"} w={"100%"}>
            登录
          </Button>
          <Flex
            color={"#1890ff"}
            margin={"16px 0px"}
            justify={"space-between"}
            fontSize={"14px"}
          >
            <Text cursor={"pointer"}>验证码登录</Text>
            <Text cursor={"pointer"}>忘记密码?</Text>
          </Flex>
        </ModalBody>

        <ModalFooter>
          <Flex justify={"center"} fontSize={"14px"} w={"100%"}>
            注册登录即表示同意{" "}
            <Text color={"#1890ff"} ml={"8px"}>
              {" "}
              用户协议 、 隐私政策
            </Text>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default LoginModal;
