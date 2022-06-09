import { Avatar, Box, Button, Flex, Text, Textarea, useColorMode } from '@chakra-ui/react'
import { shadows } from 'config/theme'
import { LoginStatusContext } from 'context/Context'
import React, { useContext } from 'react'

function SendArea() {
  const { loginStatus } = useContext(LoginStatusContext)!
  const { colorMode } = useColorMode()
  return (
    <Box padding={"16px 24px"} shadow={shadows[colorMode]}>
      <Flex align={"center"} mb={"16px"} justify={"space-between"}>
        <Flex align={"center"}>
          <Avatar size={'md'} src={"https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg"} mr={"16px"} />
          <Text fontSize={"18px"} fontWeight={"700"}>{loginStatus.username}</Text>
        </Flex>
        <Button colorScheme={"messenger"}>发送评论</Button>
      </Flex>
      <Textarea placeholder={"请输入你的评论"} rows={5} mb={"8px"} />
    </Box>
  )
}

export default SendArea