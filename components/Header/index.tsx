import React from "react";
import { Avatar, Flex, IconButton, useColorMode } from "@chakra-ui/react";
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

const AnimatedMenu = dynamic(import("react-spring-menu"), { ssr: false });

function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      align={"center"}
      justify={"space-around"}
      padding={"0px 36px"}
      boxShadow={shadows[colorMode]}
      position={"sticky"}
      top={"0px"}
      backdropFilter={"blur(10px)"}
    >
      <Image src={logo} style={{ width: "107px", height: "22px" }} alt="logo" />
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
          icon={<BsFillBellFill size="26" />}
          aria-label={""}
          mr={"8px"}
        />
        <IconButton
          onClick={toggleColorMode}
          bg={"transparent"}
          icon={
            colorMode === "light" ? (
              <BsMoonStarsFill size="26" />
            ) : (
              <BsSunFill size="26" />
            )
          }
          aria-label={""}
          mr={"8px"}
        />
        <IconButton
          bg={"transparent"}
          icon={<BsGithub size="26" />}
          aria-label={""}
          mr={"8px"}
        />
      </Flex>
      <Flex>
        <Avatar width={"38px"} height={"38px"} />
      </Flex>
    </Flex>
  );
}

export default Header;
