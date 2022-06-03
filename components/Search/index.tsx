import {
  InputGroup,
  Input,
  InputRightAddon,
  Flex,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";
import { a, config, useSpring } from "react-spring";
import { useColorMode } from "@chakra-ui/react";

function Search() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const { colorMode } = useColorMode();
  const searchAnime = useSpring({
    width: isFocus ? "400px" : "290px",
    config: config.stiff,
  });
  const buttonAnime = useSpring({
    width: isFocus ? "0px" : "100px",
    opacity: isFocus ? 0 : 1,
    display: isFocus ? "none" : "block",
    config: config.stiff,
  });
  return (
    <Flex width={"400px"} justify={"space-between"}>
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
        <Button width={"100%"} bg={"#1e80ff"} color={"#fff"} fontSize={"14px"}>
          创作者中心
        </Button>
      </a.div>
    </Flex>
  );
}

export default Search;
