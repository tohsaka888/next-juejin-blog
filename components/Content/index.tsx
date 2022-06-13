import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, useColorMode, Divider, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";
import { shadows } from "../../config/theme";
import ArticleCard from "components/ArticleCard";
import { ListResponse, MenuItemProps } from "config/type";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "config/baseUrl";
import { ListContext } from "context/Context";
import AnimatedMenu from "react-spring-menu";
import useScreenSize from "hooks/useScreenSize";

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

export function Loading() {
  return (
    // <>
    //   {[1].map(item => (
    <Flex justify={"space-between"} padding={"16px"}>
      <SkeletonText mt='8px' noOfLines={4} spacing='4' flex={1} mr={"16px"} />
      <Skeleton width={"150px"} height={"100px"} />
    </Flex>
    //   ))}
    // </>
  )
}

function Content({ tags }: { tags?: string }) {
  const { colorMode } = useColorMode();
  const { list, setList } = useContext(ListContext)!
  const [page, setPage] = useState<number>(2);
  const { height } = useScreenSize()
  useEffect(() => {
    return () => {
      setPage(2)
    }
  }, [])
  const fetchMoreData = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api${tags ? '/tag/' + tags : '/list'}`, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: 6,
      })
    })
    const data: ListResponse = await res.json()
    setList(list => [...list, ...data.list])
    if (data.list.length === 6) {
      setPage(page + 1)
    } else {
      setPage(-1)
    }
  }, [page, setList, tags])

  return (
    <Box
      flex={3}
      bg={colorMode === "light" ? "#fff" : undefined}
      shadow={shadows[colorMode]}
      minH={'960px'}
    >
      <AnimatedMenu
        items={items}
        defaultSelectedKeys={["recommend"]}
        itemStyle={{ fontSize: "15px", padding: "4px 20px" }}
        style={{ height: "45px" }}
        color={colorMode === "light" ? "#000" : "#fff"}
      />
      <Divider />

      {list.length > 5 ? (
        <InfiniteScroll
          dataLength={list.length}
          next={fetchMoreData}
          endMessage={
            <p style={{ textAlign: 'center', marginBottom: '16px' }}>
              <b>~~到底啦~~</b>
            </p>
          }
          hasMore={!(page === -1)}
          loader={<Loading />}>
          <ArticleCard />
        </InfiniteScroll>
      ) : <ArticleCard />}

      {list.length === 0 && (
        <Loading />
      )}

    </Box>
  );
}

export default Content;
