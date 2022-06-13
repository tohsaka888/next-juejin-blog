import React from 'react'
import styled from 'styled-components'
import { items } from './menuConfig'

const Wrapper = styled.div<{ index: number }>`
  padding:8px 12px;
  user-select:none;
  cursor:pointer;
  display:flex;
  align-items:center;
  justify-content:center;
  color:index === 0 ? rgba(24, 144, 255, 1) : undefined;
`

function Loading() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', width: '460px', justifyContent: 'space-between' }}>
      {items.map((item, index) => {
        return (
          <div key={item.key}>
            <Wrapper index={index}>
              {item.label}
            </Wrapper>
          </div>
        )
      })}
    </div>
  )
}

export default Loading