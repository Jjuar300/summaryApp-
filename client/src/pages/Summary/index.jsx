import {Box,  Typography } from "@mui/material";
import AccountProfile from '../home/AccountProfile'
import Actions from '../home/Actions'
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {PlainTextPlugin} from '@lexical/react/LexicalPlainTextPlugin';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import {OnChangePlugin} from '@lexical/react/LexicalOnChangePlugin';
import { useMemo } from "react";

const initialConfig = {
 namespace: 'MyEditor', 
}; 

export default function index() {
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

    <LexicalComposer initialConfig={initialConfig}>
       <PlainTextPlugin
       contentEditable={ContentEditable}
       placeholder={<h1>text editor</h1>}
       />
       <HistoryPlugin/>
    </LexicalComposer>
   </Box>

    </div>
  )
}
