import React, { useCallback, useContext, useEffect, useState } from "react";
import { Box, useColorMode, Divider, Skeleton, SkeletonText, Flex } from "@chakra-ui/react";
import { shadows } from "../../config/theme";
import ArticleCard from "components/ArticleCard";
import { ArticleBriefInfo, ListResponse, MenuItemProps } from "config/type";
import dynamic from "next/dynamic";
import InfiniteScroll from "react-infinite-scroll-component";
import { baseUrl } from "config/baseUrl";
import { ListContext } from "context/Context";
import { useRouter } from "next/router";
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
    <>
      {[1, 2, 3].map(item => (
        <Flex key={item} justify={"space-between"} padding={"16px"}>
          <SkeletonText mt='8px' noOfLines={4} spacing='4' flex={1} mr={"16px"} />
          <Skeleton width={"150px"} height={"100px"} />
        </Flex>
      ))}
    </>
  )
}

function Content({ tags }: { tags?: string }) {
  const { colorMode } = useColorMode();
  const { setList } = useContext(ListContext)!
  const [page, setPage] = useState<number>(2);
  const [currentList, setCurrentList] = useState<ArticleBriefInfo[]>([])
  const router = useRouter()
  const fetchMoreData = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api${tags ? '/tag/' + tags : '/list'}`, {
      method: "POST",
      body: JSON.stringify({
        page: page,
        limit: 10
      })
    })
    const data: ListResponse = await res.json()
    setList(list => [...list, ...data.list])
    setCurrentList(data.list)
    if (data.list.length === 10) {
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
            limit: 10
          })
        })
        const data = await res.json()
        setList(data.list)
      }
      fetchData()
    }
  }, [router, setList, tags])
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
      <InfiniteScroll dataLength={currentList.length} next={fetchMoreData}
        endMessage={
          <p style={{ textAlign: 'center', marginBottom: '16px' }}>
            <b>~~到底啦~~</b>
          </p>
        } hasMore={!(page === -1)} loader={<Loading />}>
        <ArticleCard authorList={[]} />
      </InfiniteScroll>
    </Box>
  );
}

export default Content;
