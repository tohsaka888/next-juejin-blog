import { Avatar, Box, Flex, useColorMode, Text, Button } from '@chakra-ui/react';
import ArticleCard from 'components/ArticleCard';
import { baseUrl } from 'config/baseUrl';
import { shadows } from 'config/theme';
import { ArticleBriefInfo, AuthorArticleResponse } from 'config/type';
import { ListContext } from 'context/Context';
import useScreenSize from 'hooks/useScreenSize';
import { GetServerSideProps, NextPage } from 'next';
import React, { useContext, useEffect, useState } from 'react'

const My: NextPage<{ list: ArticleBriefInfo[], author: string }> = ({ list, author }) => {
  const { colorMode } = useColorMode()
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const screenSize = useScreenSize();
  const { setList } = useContext(ListContext)!;

  useEffect(() => {
    setList(list)
  }, [list, setList])

  return (
    <Box width={"50vw"} margin={"80px auto 0px auto"} justifyContent={"space-between"} minHeight={screenSize.height - 80}>
      <Flex shadow={shadows[colorMode]} mb={"16px"} padding={'24px 36px'} align={"center"} width={"50vw"} justifyContent={"space-between"}>
        <Flex>
          <Avatar size={'xl'} src={"https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg"} mr={"24px"} />
          <Box>
            <Text fontSize={'28px'} fontWeight={700}>{author}</Text>
            <Text fontSize={"16px"} fontWeight={700}>我撰写的文章数: {list.length}</Text>
          </Box>
        </Flex>
        <Button bg={'#dc1919'} color={"#fff"} _hover={{ bg: '#dc1919', color: '#fff', opacity: 0.5 }} onClick={() => setIsDelete(!isDelete)}>管理文章</Button>
      </Flex>
      <Box shadow={shadows[colorMode]}>
        <ArticleCard isDetele={isDelete} />
      </Box>
    </Box>
  )
}

export default My

export const getServerSideProps: GetServerSideProps = async (context) => {
  const res = await fetch(`${baseUrl}/api/user/${context.query.id}`);
  const data: AuthorArticleResponse = await res.json();
  return {
    props: {
      list: data.success ? data.list : [],
      author: data.success ? data.author : {},
    },
  };
};