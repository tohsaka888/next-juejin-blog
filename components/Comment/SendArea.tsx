import { Avatar, Box, Button, Flex, Text, Textarea, useColorMode, useToast } from '@chakra-ui/react'
import { baseUrl } from 'config/baseUrl'
import { shadows } from 'config/theme'
import { AddCommentResponse } from 'config/type'
import { LoginStatusContext } from 'context/Context'
import React, { useCallback, useContext, useState } from 'react'

function SendArea({ id, setIsSend }: { id: string, setIsSend: React.Dispatch<React.SetStateAction<boolean>> }) {
  const { loginStatus } = useContext(LoginStatusContext)!
  const { colorMode } = useColorMode()
  const [comment, setComment] = useState<string>("")
  const toast = useToast()

  const sendComment = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/comments/add`, {
      method: 'POST',
      body: JSON.stringify({
        comment,
        username: loginStatus.username,
        avatarUrl: 'https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg',
        articleId: id
      })
    })
    const data: AddCommentResponse = await res.json()
    setComment("")
    if (data.success) {
      toast({
        title: data.msg,
        status: 'success',
        duration: 3000,
        position: 'top',
      })
    } else {
      toast({
        title: data.msg,
        status: 'error',
        duration: 3000,
        position: 'top',
      })
    }
    setIsSend(true)
  }, [comment, id, loginStatus.username, setIsSend, toast])

  return (
    <Box padding={"16px 24px"} shadow={shadows[colorMode]}>
      <Flex align={"center"} mb={"16px"} justify={"space-between"}>
        <Flex align={"center"}>
          <Avatar size={'md'} src={"https://pic3.zhimg.com/80/v2-e987c60f8776df32c010265d2b81526e_720w.jpg"} mr={"16px"} />
          <Text fontSize={"18px"} fontWeight={"700"}>{loginStatus.username}</Text>
        </Flex>
        <Button colorScheme={"messenger"} onClick={() => {
          if (comment.length > 0) {
            sendComment()
          } else {
            toast({
              description: '评论不能为空',
              status: 'warning',
              position: 'top',
            })
          }
        }}>发送评论</Button>
      </Flex>
      <Textarea placeholder={"请输入你的评论"} value={comment} rows={5} mb={"8px"} onChange={(e: any) => {
        setComment(e.target.value)
      }} />
    </Box>
  )
}

export default SendArea