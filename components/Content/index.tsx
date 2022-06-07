import React, { useCallback, useContext, useState } from "react";
import { Box, useColorMode, Divider, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";
import { shadows } from "../../config/theme";
import ArticleCard from "components/ArticleCard";
import { ListResponse, MenuItemProps } from "config/type";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "config/baseUrl";
import { ListContext } from "context/Context";
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

function Loading() {
  return (
    <Flex justify={"space-between"} padding={"16px"}>
      <SkeletonText mt='8px' noOfLines={4} spacing='4' flex={1} mr={"16px"} />
      <Skeleton width={"150px"} height={"100px"} />
    </Flex>
  )
}

function Content() {
  const { colorMode } = useColorMode();
  const { setList } = useContext(ListContext)!
  const [page, setPage] = useState<number>(2);
  const fetchMoreData = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/list`, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: 10
      })
    })
    const data: ListResponse = await res.json()
    setList(list => [...list, ...data.list])
    if (data.list.length === 10) {
      setPage(page => page + 1)
    } else {
      setPage(-1)
    }
  }, [page, setList])
  return (
    <Box
      flex={3}
      bg={colorMode === "light" ? "#fff" : undefined}
      shadow={shadows[colorMode]}
    >
      <AnimatedMenu
        items={items}
        defaultSelectedKeys={["recommend"]}
        itemStyle={{ fontSize: "15px", padding: "4px 20px" }}
        style={{ height: "45px" }}
        color={colorMode === "light" ? "#000" : "#fff"}
      />
      <Divider />
      <InfiniteScroll dataLength={10} next={fetchMoreData} hasMore={!(page === -1)} loader={<Loading />} style={{ overflowY: 'hidden' }}>
        <ArticleCard />
      </InfiniteScroll>
    </Box>
  );
}

export default Content;
