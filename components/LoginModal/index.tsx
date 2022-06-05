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
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react";
import { baseUrl } from "config/baseUrl";
import { LoginResponse, ModalProps } from "config/type";
import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import inviteLogin from "../../assets/image/invite-login.svg";
import password from "../../assets/image/password.svg";
import pendingLogin from "../../assets/image/pending-login.svg";

type ACTION = { type: "pending" } | { type: "invite" } | { type: "password" };

function LoginPanel({
  dispatch,
  setPanel,
  onClose
}: {
  dispatch: React.Dispatch<ACTION>;
  setPanel: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forget">
  >;
  onClose: () => void;
}) {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const login = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data: LoginResponse = await res.json()
    localStorage.setItem("token", data.token)
    onClose()

  }, [username, password, onClose])

  return (
    <>
      <Input
        placeholder="邮箱/手机号(国际号码加区号)"
        mb={"16px"}
        onFocus={() => dispatch({ type: "invite" })}
        onBlur={() => dispatch({ type: "pending" })}
        onChange={(e: any) => {
          setUsername(e.target.value)
        }}
      />
      <Input
        type={"password"}
        placeholder={"请输入密码"}
        onFocus={() => dispatch({ type: "password" })}
        onBlur={() => dispatch({ type: "pending" })}
        onChange={(e: any) => {
          setPassword(e.target.value)
        }}
      />
      <Button color="#fff" bg="#1890ff" mt={"16px"} w={"100%"} onClick={login}>
        登录
      </Button>
      <Flex
        color={"#1890ff"}
        margin={"16px 0px"}
        justify={"space-between"}
        fontSize={"14px"}
      >
        <Text cursor={"pointer"} onClick={() => setPanel("register")}>
          验证码登录
        </Text>
        <Text cursor={"pointer"} onClick={() => setPanel("forget")}>
          忘记密码?
        </Text>
      </Flex>
    </>
  );
}

const RegisterPanel = ({
  dispatch,
  setPanel,
  onClose
}: {
  dispatch: React.Dispatch<ACTION>;
  setPanel: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forget">
  >;
  onClose: () => void;
}) => {
  const [isSend, setIsSend] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(60);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const timerRef = useRef<number>(0);
  const toast = useToast()
  useEffect(() => {
    if (isSend) {
      timerRef.current = window.setInterval(() => {
        setSecond(second - 1);
        if (second <= 0) {
          setSecond(60);
          setIsSend(false);
          window.clearInterval(timerRef.current);
        }
      }, 1000);
    }
    return () => {
      window.clearInterval(timerRef.current);
    };
  }, [isSend, second]);

  const sendEmail = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/sendmail`, {
      method: 'POST',
      body: JSON.stringify({
        email
      }),
    })
    const data: LoginResponse = await res.json()
  }, [email])

  const login = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        email,
        code,
        t: 1
      }),
    })
    const data: LoginResponse = await res.json()
    if (data.success) {
      localStorage.setItem("token", data.token)
      toast({
        title: "登录成功",
        status: "success",
        position: "top"
      })
    } else {
      toast({
        title: data.msg,
        status: "error",
        position: "top"
      })
    }

    onClose()

  }, [email, code, onClose, toast])
  return (
    <>
      <Input
        placeholder="邮箱/手机号(国际号码加区号)"
        mb={"16px"}
        onFocus={() => dispatch({ type: "invite" })}
        onBlur={() => dispatch({ type: "pending" })}
        onChange={(event: any) => {
          setEmail(event.target.value);
        }}
      />
      <InputGroup>
        <Input
          type={"password"}
          placeholder={"请输入验证码"}
          onFocus={() => dispatch({ type: "password" })}
          onBlur={() => dispatch({ type: "pending" })}
          onChange={(event: any) => {
            setCode(event.target.value);
          }}
        />
        <InputRightAddon padding={"0px"}>
          <Button w={"100%"} disabled={isSend} onClick={() => {
            sendEmail()
            setIsSend(true)
          }}>
            <Text fontSize={"12px"} color={"#1890ff"} cursor={"pointer"}>
              {isSend ? `${second}s秒后重新获取` : "获取验证码"}
            </Text>
          </Button>
        </InputRightAddon>
      </InputGroup>
      <Button color="#fff" bg="#1890ff" mt={"16px"} w={"100%"} onClick={login}>
        登录
      </Button>
      <Text
        color="#1890ff"
        mt={"16px"}
        cursor={"pointer"}
        onClick={() => setPanel("login")}
        fontSize={"14px"}
      >
        其他登录方式
      </Text>
    </>
  );
};
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
  const [panel, setPannel] = useState<"login" | "register" | "forget">("login");
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        pos={"relative"}
        mt={"30vh"}
        width={"380px"}
        userSelect={"none"}
      >
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
        <ModalHeader>
          {panel === "login" && "账密登录"}
          {panel === "register" && "邮箱登录"}
          {panel === "forget" && "找回密码"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody zIndex={100}>
          {panel === "login" ? (
            <LoginPanel dispatch={dispatch} setPanel={setPannel} onClose={onClose} />
          ) : (
            <RegisterPanel dispatch={dispatch} setPanel={setPannel} onClose={onClose} />
          )}
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
