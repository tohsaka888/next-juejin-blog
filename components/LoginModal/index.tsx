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
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { baseUrl, commonUrl } from "config/baseUrl";
import { LoginResponse, ModalProps, RegisterResponse } from "config/type";
import { LoginStatusContext } from "context/Context";
import Image from "next/image";
import React, {
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import inviteLogin from "../../assets/image/invite-login.svg";
import password from "../../assets/image/password.svg";
import pendingLogin from "../../assets/image/pending-login.svg";
import { CaptchaObj } from 'svg-captcha';

type ACTION = { type: "pending" } | { type: "invite" } | { type: "password" };

function LoginPanel({
  dispatch,
  setPanel,
  onClose
}: {
  dispatch: React.Dispatch<ACTION>;
  setPanel: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forget" | "email">
  >;
  onClose: () => void;
}) {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [graphCode, setGraphCode] = useState<CaptchaObj>({
    data: '',
    text: ''
  })
  const { setLoginStatus } = useContext(LoginStatusContext)!;
  const [code, setCode] = useState<string>()
  const toast = useToast()

  const getGraphCode = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/graph-code`)
    const data: CaptchaObj = await res.json()
    setGraphCode(data)
  }, [])

  useEffect(() => {
    getGraphCode()
  }, [getGraphCode])

  const login = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/login`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      }),
    })
    const data: LoginResponse = await res.json()
    if (data.success) {
      toast({
        title: "登录成功",
        status: 'success',
        position: 'top'
      })
      localStorage.setItem("token", data.token)
      setLoginStatus({
        status: true,
        username: data.username,
        userId: data.userId
      })
    } else {
      toast({
        title: data.msg,
        status: 'error',
        position: 'top'
      })
    }
    setPanel("login")
    onClose()

  }, [username, password, setLoginStatus, setPanel, onClose, toast])

  return (
    <>
      <Input
        placeholder="邮箱/用户名"
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
      {/* 图形验证码校验 */}
      <Flex align={"center"} mt={'16px'}>
        <Input placeContent={"请输入验证码"} isInvalid={code !== graphCode.text} onChange={(e: any) => setCode(e.target.value)} />
        <Box dangerouslySetInnerHTML={{ __html: graphCode.data }} height="38px" onClick={getGraphCode} cursor={'pointer'}></Box>
      </Flex>
      <Button color="#fff" bg="#1890ff" mt={"16px"} w={"100%"} disabled={code !== graphCode.text} onClick={login}>
        登录
      </Button>
      <Flex
        color={"#1890ff"}
        margin={"16px 0px"}
        justify={"space-between"}
        fontSize={"14px"}
      >
        <Text cursor={"pointer"} onClick={() => setPanel("email")}>
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

    React.SetStateAction<"login" | "register" | "forget" | "email">
  >;
  onClose: () => void;
}) => {
  const [username, setUsername] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const toast = useToast()

  const register = useCallback(async () => {
    const token = localStorage.getItem("token")
    const res = await fetch(`${baseUrl}/api/register`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        token: token
      }),
    })
    const data: RegisterResponse = await res.json()
    if (data.success) {
      toast({
        title: "注册成功",
        status: 'success',
        position: 'top'
      })
    } else {
      toast({
        title: data.msg,
        status: 'error',
        position: 'top'
      })
    }
    onClose()
    setPanel("login")
  }, [username, password, onClose, setPanel, toast])

  const [confirmedPassword, setConfirmedPassword] = useState<string>("")

  return (
    <>
      <Alert status='info' mb={"16px"}>
        <AlertIcon />
        检测到您是第一次登录，请注册!
      </Alert>
      <Input
        placeholder="用户名"
        mb={"16px"}
        onFocus={() => dispatch({ type: "invite" })}
        onBlur={() => dispatch({ type: "pending" })}
        autoComplete={"off"}
        name={"username"}
        onChange={(e: any) => {
          setUsername(e.target.value)
        }}
      />
      <Input
        type={"password"}
        placeholder={"请输入密码"}
        autoComplete={"off"}
        name={"password"}
        onFocus={() => dispatch({ type: "password" })}
        onBlur={() => dispatch({ type: "pending" })}
        onChange={(e: any) => {
          setPassword(e.target.value)
        }}
      />
      <Input
        type={"password"}
        placeholder={"请再次输入密码"}
        errorBorderColor='red.300'
        autoComplete="off"
        name="confirmedPassword"
        mt={"16px"}
        onFocus={() => dispatch({ type: "password" })}
        onBlur={() => dispatch({ type: "pending" })}
        isInvalid={confirmedPassword !== password}
        onChange={(e: any) => {
          setConfirmedPassword(e.target.value)
        }}
      />
      <Button color="#fff" bg="#1890ff" mt={"16px"} w={"100%"} onClick={register} disabled={confirmedPassword !== password}>
        注册
      </Button>
      <Flex
        color={"#1890ff"}
        margin={"16px 0px"}
        justify={"space-between"}
        fontSize={"14px"}
      >
        <Text cursor={"pointer"} onClick={() => setPanel("login")}>
          登录
        </Text>
        <Text cursor={"pointer"} onClick={() => setPanel("forget")}>
          忘记密码?
        </Text>
      </Flex>
    </>
  );
}


const EmailPanel = ({
  dispatch,
  setPanel,
  onClose
}: {
  dispatch: React.Dispatch<ACTION>;
  setPanel: React.Dispatch<
    React.SetStateAction<"login" | "register" | "forget" | "email">
  >;
  onClose: () => void;
}) => {
  const [isSend, setIsSend] = useState<boolean>(false);
  const [second, setSecond] = useState<number>(60);
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const timerRef = useRef<number>(0);
  const { setLoginStatus } = useContext(LoginStatusContext)!
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
    if (email.includes('@')) {
      const res = await fetch(`${baseUrl}/api/sendmail`, {
        method: 'POST',
        body: JSON.stringify({
          email
        }),
      })
      const data = await res.json()
      if (data.success) {
        toast({
          status: 'success',
          title: '发送邮箱验证码,注意查收'
        })
      } else {
        toast({
          status: 'error',
          title: '发送失败,请检查网络配置'
        })
      }
    } else {
      const res = await fetch(`${commonUrl}/acc/g-msg-code`, {
        method: 'POST',
        body: JSON.stringify({
          phone: email,
        }),
        headers: { "Content-Type": "application/json;charset=utf-8" }
      })
      const data = await res.json()
      if (data.success) {
        toast({
          status: 'success',
          title: '发送短信验证码成功,注意查收'
        })
      } else {
        toast({
          status: 'error',
          title: '发送失败,请检查网络配置'
        })
      }
    }
  }, [email, toast])

  const login = useCallback(async () => {
    let data: LoginResponse = null!
    if (email.includes('@')) {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        body: JSON.stringify({
          email,
          code,
          t: 1
        }),
      })
      data = await res.json()
    } else {
      const res = await fetch(`${baseUrl}/api/login`, {
        method: 'POST',
        body: JSON.stringify({
          phone: email,
          code,
          t: 2
        })
      });
      data = await res.json();
    }
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

    if (data.needRegister) {
      setPanel("register")
    } else {
      onClose()
      setLoginStatus({
        status: data.success,
        username: data.username,
        userId: data.userId
      })
    }

  }, [email, code, toast, setPanel, onClose, setLoginStatus])
  return (
    <>
      <Input
        placeholder="邮箱/手机号"
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
          autoComplete={"off"}
          name="code"
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
  const [panel, setPannel] = useState<"login" | "register" | "forget" | "email">("login");
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
          {panel === "email" && "邮箱登录"}
          {panel === "forget" && "找回密码"}
          {panel === "register" && "注册"}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody zIndex={100}>
          {panel === "login" && (
            <LoginPanel dispatch={dispatch} setPanel={setPannel} onClose={onClose} />
          )}
          {panel === "email" && (
            <EmailPanel dispatch={dispatch} setPanel={setPannel} onClose={onClose} />
          )}
          {panel === "register" && (
            <RegisterPanel dispatch={dispatch} setPanel={setPannel} onClose={onClose} />
          )}
          {panel === "forget" && (
            <EmailPanel dispatch={dispatch} setPanel={setPannel} onClose={onClose} />
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
