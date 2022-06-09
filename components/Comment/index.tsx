import { Box } from '@chakra-ui/react'
import React from 'react'
import List from './List'
import SendArea from './SendArea'

function Comment() {
  return (
    <Box>
      <SendArea />
      <List />
    </Box>
  )
}

export default Comment