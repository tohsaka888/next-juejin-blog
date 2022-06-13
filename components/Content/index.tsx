import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, useColorMode, Divider, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";
import { shadows } from "../../config/theme";
import ArticleCard from "components/ArticleCard";
import { ListResponse, MenuItemProps } from "config/type";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "config/baseUrl";
import { ListContext } from "context/Context";
import { useRouter } from "next/router";
import useScreenSize from "hooks/useScreenSize";
import AnimatedMenu from "react-spring-menu";

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
  const router = useRouter()
  const screenSize = useScreenSize()
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

  useEffect(() => {
    if (tags === '首页') {
      router.push('/')
    }
    if (tags) {
      const fetchData = async () => {
        const res = await fetch(`${baseUrl}/api/tag/${tags}`, {
          method: "POST",
          body: JSON.stringify({
            page: 1,
            limit: 6
          })
        })
        const data = await res.json()
        setList([...list, ...data.list])
      }
      fetchData()
    }
  }, [list, router, setList, tags])
  return (
    <Box
      flex={3}
      bg={colorMode === "light" ? "#fff" : undefined}
      shadow={shadows[colorMode]}
      minH={"960px"}
    >
      <AnimatedMenu
        items={items}
        defaultSelectedKeys={["recommend"]}
        itemStyle={{ fontSize: "15px", padding: "4px 20px" }}
        style={{ height: "45px" }}
        color={colorMode === "light" ? "#000" : "#fff"}
      />
      <Divider />

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

    </Box>
  );
}

export default Content;
