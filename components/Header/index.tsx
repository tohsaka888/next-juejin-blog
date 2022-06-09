import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { items } from "./menuConfig";
import logo from "../../assets/image/logo.svg";
import Image from "next/image";
import Search from "../Search";
import {
  BsFillBellFill,
  BsGithub,
  BsMoonStarsFill,
  BsSunFill,
} from "react-icons/bs";
import { shadows } from "../../config/theme";
import { useRouter } from "next/router";
import Link from "next/link";
import { LoginStatusContext } from "context/Context";

const AnimatedMenu = dynamic(import("react-spring-menu"), { ssr: false });

function Header({ onOpen }: { onOpen: () => void }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext)!
  const router = useRouter();
  return (
    <Flex
      align={"center"}
      justify={"space-around"}
      padding={"0px 36px"}
      boxShadow={shadows[colorMode]}
      position={"fixed"}
      top={"0px"}
      backdropFilter={"blur(10px)"}
      zIndex={1000}
      height={"60px"}
      width={"100%"}
    >
      <Image
        src={logo}
        style={{ width: "107px", height: "22px", cursor: "pointer" }}
        alt="logo"
        onClick={() => {
          router.push("/");
        }}
      />
      <AnimatedMenu
        style={{ height: "60px" }}
        items={items}
        defaultSelectedKeys={["homepage"]}
        color={colorMode === "light" ? "#000" : "#fff"}
        onClick={(e: any) => {
          router.push('/' + e.target.innerText);
        }}
      />
      <Search onOpen={onOpen} />
      <Flex>
        <IconButton
          bg={"transparent"}
          icon={<BsFillBellFill size="20" />}
          aria-label={""}
          mr={"8px"}
        />
        <IconButton
          onClick={toggleColorMode}
          bg={"transparent"}
          icon={
            colorMode === "light" ? (
              <BsMoonStarsFill size="20" />
            ) : (
              <BsSunFill size="20" />
            )
          }
          aria-label={""}
          mr={"8px"}
        />
        <Link
          href={"https://github.com/tohsaka888/next-juejin-blog"}
          target="_blank"
        >
          <IconButton
            bg={"transparent"}
            icon={<BsGithub size="24" />}
            aria-label={""}
            mr={"8px"}
          />
        </Link>
      </Flex>
      <Flex width={loginStatus.status ? "150px" : '100px'} justify={"flex-end"}>
        {loginStatus.status ? (
          <Flex justify={"space-between"} width={"200px"} cursor={"pointer"}>
            <Avatar onClick={() => {
              router.push(`/my/${loginStatus.userId}`)
            }} width={"38px"} height={"38px"} src={'https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg'} />
            <Button width={"100px"} onClick={() => {
              localStorage.removeItem("token");
              setLoginStatus({
                status: false,
                username: "",
              });
            }} color="#1890ff">
              退出登录
            </Button>
          </Flex>
        ) : (
          <Button width={"100px"} onClick={onOpen} color="#1890ff">
            登录/注册
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

export default Header;
