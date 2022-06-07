import { useColorMode } from '@chakra-ui/react'
import React, { useEffect, useRef } from 'react'

function Code(props: any) {
  const { colorMode } = useColorMode()
  const ref = useRef<HTMLModElement>(null!)
  useEffect(() => {
    if (ref.current) {
      if (!ref.current.className) {
        ref.current.className = 'custom-code'
      }
    }
  }, [])
  return (
    <code
      ref={ref}
      {...props}
    />
  )
}

export default Code