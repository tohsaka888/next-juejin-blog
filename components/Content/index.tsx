import React from "react";
import { Box, useColorMode, Divider } from "@chakra-ui/react";
import { shadows } from "../../config/theme";
import ArticleCard from "components/ArticleCard";
import { MenuItemProps } from "config/type";
import dynamic from "next/dynamic";
const AnimatedMenu = dynamic(import("react-spring-menu"), { ssr: false });

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
    >
      <AnimatedMenu
        items={items}
        defaultSelectedKeys={["recommend"]}
        itemStyle={{ fontSize: "15px", padding: "4px 20px" }}
        style={{ height: "45px" }}
      />
      <Divider />
      <ArticleCard />
    </Box>
  );
}

export default Content;
