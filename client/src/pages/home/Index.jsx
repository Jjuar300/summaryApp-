import {
  Box, 
  Typography,  
} from '@mui/material'
import SearchIcon from './assets/search.svg'
import ActionButton from '../../components/ActionButton/ActionButton';
import Avatar from '../../components/UserAvatar';

export default function Index() {
  return (
   <>    

   <Box
   sx={{ 
    position:'absolute', 
    backgroundColor:'#f2f3f4',
    width:'16rem', 
    height:'59.8rem', 
    left:'.2rem', 
    top:'.05rem', 
  }}
   >
    <Avatar
    Text={'J'}
    />

    <ActionButton
    Icon={SearchIcon}
    Text={'Search'}
    />
   </Box>
   </>
  )
}
