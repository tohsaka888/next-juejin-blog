import React, { useContext } from "react";
import {
  Avatar,
  Button,
  Flex,
  IconButton,
  useColorMode,
} from "@chakra-ui/react";
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
import { ListContext, LoginStatusContext } from "context/Context";
import Loading from "./Loading";
import AnimatedMenu from "react-spring-menu";
// const AnimatedMenu = dynamic(() => import("react-spring-menu"), { ssr: false, loading: () => <Loading /> });

function Header({ onOpen }: { onOpen: () => void }) {
  const { colorMode, toggleColorMode } = useColorMode();
  const { loginStatus, setLoginStatus } = useContext(LoginStatusContext)!
  const { list, setList } = useContext(ListContext)!;
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
        style={{ width: "8vw", height: "18px", cursor: "pointer" }}
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
          if (e.target.innerText !== '首页') {
            router.push('/' + e.target.innerText);

          } else {
            router.push('/');
          }
          setList([])
        }}
      />

      <Search onOpen={onOpen} />
      <Button>
        <a href="https://covid19-analyse-system.vercel.app/">疫情服务平台</a>
      </Button>
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
      <Flex width={'150px'} justify={"flex-end"}>
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
