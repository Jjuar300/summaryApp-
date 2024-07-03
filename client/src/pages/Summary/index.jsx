import {Box,  Typography } from "@mui/material";
import AccountProfile from '../home/AccountProfile'
import Actions from '../home/Actions'
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary'; 

import { useMemo } from "react";


export default function index() {


const customContent = useMemo(() => {
  return (
    <ContentEditable
     style={{
      position: 'relative',
      borderColor: 'rgba(255,211,2,0.68)',
      border: '2px solid red',
      borderRadius: '5px', 
      padding: '10px',
      width:'12rem', 
     }}
    />
  )
}, []); 

const customPlaceholder = useMemo(() => {
return (
  <div
  style={{
    position: 'absolute', 
    top:'30', 
    left:'30', 
  }}
  >
    Enter some text ...
  </div>
)
}, [])

const lexicalConfig = {
  namespace: 'Rich text editor', 
  onError: (error) => {
    console.log("ERROR", error)
  }
};
  return (
    <div>
   
   <AccountProfile/>
   <Actions/>
   
   <Box
   sx={{
    position:'absolute', 
    left:'30rem', 
   }}
   >

    <LexicalComposer initialConfig={lexicalConfig}>
       <PlainTextPlugin
       contentEditable={customContent}
       placeholder={customPlaceholder}
       ErrorBoundary={LexicalErrorBoundary}
       />
    </LexicalComposer>
   </Box>

    </div>
  )
}
