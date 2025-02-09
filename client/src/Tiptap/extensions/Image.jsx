import React from 'react'
import { NodeViewWrapper, ReactNodeViewRenderer } from '@tiptap/react'
import { Button } from '@mui/material'

export default function Image({node, updateAttributes}) {
   
    return (
    <NodeViewWrapper as='div' >
     <div onClick={() => console.log('image clicked')} style={{cursor: 'pointer'}}>
        {/* <input placeholder='type here...' type="text" /> */}
       <Button onClick={() => console.log('hello')} >say hello</Button>
      </div>    
    </NodeViewWrapper>
  )
}
