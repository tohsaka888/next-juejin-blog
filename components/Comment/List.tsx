import { Avatar, Box, Flex, useColorMode, Text, Divider } from '@chakra-ui/react'
import { shadows } from 'config/theme'
import { CommentList } from 'config/type'
import moment from 'moment'
import React from 'react'
import 'moment/locale/zh-cn'

moment.locale('zh-cn')

function List({ comments }: { comments: CommentList[] }) {
  const { colorMode } = useColorMode()
  return (
    <Box shadow={shadows[colorMode]} padding={'24px 16px'} mt={'18px'}>
      {comments.map((comment, index) => {
        return (
          <Box key={index}>
            <Flex>
              <Avatar src={comment.avatarUrl} size={'md'} />
              <Box ml={'8px'}>
                <Flex justify={"center"} flexDir={"column"}>
                  <Text fontSize={"16px"} fontWeight={"700"}>{comment.username}</Text>
                  <Text fontSize={"12px"} fontWeight={"500"}>{moment.utc(comment.date).fromNow()}</Text>
                </Flex>
              </Box>
            </Flex>
            <Text ml={'58px'}>{comment.comment}</Text>
            <Divider margin={"16px"} />
          </Box>
        )
      })}
      {comments.length === 0 &&
        <Flex align={"center"} height={'300px'} justify={'center'}>
          <Text fontSize={"18px"} fontWeight={"700"} textAlign={"center"} >暂无评论</Text>
        </Flex>
      }
    </Box>
  )
}

export default List