import React from "react";
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

const AnimatedMenu = dynamic(import("react-spring-menu"), { ssr: false });

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
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
        itemStyle={{ color: colorMode === "light" ? "#000" : "#fff" }}
      />
      <Search />
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
        <IconButton
          bg={"transparent"}
          icon={<BsGithub size="24" />}
          aria-label={""}
          mr={"8px"}
        />
      </Flex>
      <Flex width="100px" justify={"flex-end"}>
        {/* <Avatar width={"38px"} height={"38px"} /> */}
        <Button width={"100px"}>登录</Button>
      </Flex>
    </Flex>
  );
}

export default Header;
