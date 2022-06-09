import { Box } from '@chakra-ui/react'
import { baseUrl } from 'config/baseUrl'
import { CommentList, CommentResponse } from 'config/type'
import React, { useEffect, useState, useCallback } from 'react'
import List from './List'
import SendArea from './SendArea'

function Comment({ id, comments }: { id: string, comments: CommentList[] }) {
  const [commentList, setCommentList] = useState<CommentList[]>(comments)
  const [isSend, setIsSend] = useState<boolean>(false)

  const getCommentList = useCallback(async () => {
    const res = await fetch(`${baseUrl}/api/comments/list`, {
      method: 'POST',
      body: JSON.stringify({
        articleId: id
      })
    })
    const data: CommentResponse = await res.json()
    setCommentList(data.list)
  }, [id])

  useEffect(() => {
    if (isSend) {
      getCommentList()
      setIsSend(false)
    }
  }, [isSend, getCommentList])

  return (
    <Box mt={"24px"}>
      <SendArea id={id} setIsSend={setIsSend} />
      <List comments={commentList} />
    </Box>
  )
}

export default Comment