import React from "react";
import { Box, useColorMode, Divider } from "@chakra-ui/react";
import { shadows } from "../../config/theme";
import ArticleCard from "components/ArticleCard";
import AnimatedMenu from "react-spring-menu";
import { MenuItemProps } from "config/type";

const items: MenuItemProps[] = [
  {
    label: "推荐",
    key: "recommend",
  },
  {
    label: "最新",
    key: "latest",
  },
  {
    label: "热门",
    key: "hot",
  },
];

function Content() {
  const { colorMode } = useColorMode();
  return (
    <Box
      flex={3}
      bg={colorMode === "light" ? "#fff" : undefined}
      shadow={shadows[colorMode]}
      pos={"relative"}
      // borderRadius={"8px"}
    >
      <AnimatedMenu
        items={items}
        defaultSelectedKeys={["recommend"]}
        itemStyle={{ fontSize: "14px" }}
      />
      <Divider />
      <ArticleCard />
    </Box>
  );
}

export default Content;
