import {
  InputGroup,
  Input,
  InputRightAddon,
  Flex,
  Button,
  Text,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { BsSearch, BsCaretDownFill } from "react-icons/bs";
import { a, config, useSpring } from "react-spring";
import { useColorMode, Box } from "@chakra-ui/react";
import { LoginStatusContext } from "context/Context";
import { useRouter } from "next/router";

function Search({ onOpen }: { onOpen: () => void }) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const searchAnime = useSpring({
    width: isFocus ? "450px" : "310px",
    config: config.stiff,
  });
  const buttonAnime = useSpring({
    width: isFocus ? "0px" : "130px",
    opacity: isFocus ? 0 : 1,
    display: isFocus ? "none" : "block",
    config: config.stiff,
  });
  const { loginStatus } = useContext(LoginStatusContext)!;
  const router = useRouter()

  return (
    <Flex width={"450px"} justify={"space-between"}>
      <a.div style={{ ...searchAnime }}>
        <InputGroup>
          <Input
            placeholder={isFocus ? "搜索文章/标签/用户" : "搜索稀土掘金"}
            type={"search"}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
          />
          <InputRightAddon cursor={"pointer"}>
            <BsSearch
              color={
                isFocus ? "#1e80ff" : colorMode === "light" ? "#000" : "#fff"
              }
            />
          </InputRightAddon>
        </InputGroup>
      </a.div>
      <a.div style={{ ...buttonAnime }}>
        <Button
          width={"100%"}
          bg={"#1e80ff"}
          color={"#fff"}
          fontSize={"14px"}
          paddingRight={"6px"}
          paddingLeft={"6px"}
          _hover={{ background: "#1e80ff", opacity: 0.8 }}
          onClick={() => {
            if (loginStatus.status) {
              const token = localStorage.getItem("token");
              router.push(`/drafts/${token}`)
            } else {
              onOpen()
            }
          }}
        >
          <Flex alignItems={"center"} width={"100%"}>
            <Flex flex={1} justify={"center"}>
              <Text>创作者中心</Text>
            </Flex>

            <Flex
              align={"center"}
              height={"40px"}
              borderLeft={"0.5px solid hsla(0,0%,100%,.1)"}
              paddingLeft={"6px"}
            >
              <BsCaretDownFill size={10} />
            </Flex>
          </Flex>
        </Button>
      </a.div>
    </Flex>
  );
}

export default Search;
