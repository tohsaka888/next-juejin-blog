import { Avatar, Box, Flex, useColorMode, Text } from '@chakra-ui/react';
import ArticleCard from 'components/ArticleCard';
import { baseUrl } from 'config/baseUrl';
import { shadows } from 'config/theme';
import { ArticleBriefInfo, AuthorArticleResponse } from 'config/type';
import { GetServerSideProps, NextPage } from 'next';
import React from 'react'

const User: NextPage<{ list: ArticleBriefInfo[], author: string }> = ({ list, author }) => {
  const { colorMode } = useColorMode()

  return (
    <Box width={"50vw"} margin={"80px auto 0px auto"}>
      <Flex shadow={shadows[colorMode]} mb={"16px"} padding={'24px 36px'} align={"center"}>
        <Avatar size={'xl'} src={"https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg"} mr={"24px"} />
        <Box>
          <Text fontSize={'28px'} fontWeight={700}>{author}</Text>
          <Text fontSize={"16px"} fontWeight={700}>他/她撰写的文章数: {list.length}</Text>
        </Box>
      </Flex>
      <Box shadow={shadows[colorMode]}>
        <ArticleCard />
      </Box>
    </Box>
  )
}

export default User

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