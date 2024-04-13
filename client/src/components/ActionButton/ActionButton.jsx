import {
  Typography, 
} from'@mui/material'
import './index.css'
import { useState } from 'react'

export default function ActionButton({
  Icon, 
  Text,
}) {
 const [className, setClassName] = useState('search')

  return (
    <>

  <div 
  onClick={() => setClassName('blueBack')}
  className={`${className}`}
  >
  <img
     src={`${Icon}`} 
    />
    <Typography
    sx={{
      fontSize:'1.3rem'
    }}
    >{Text}</Typography>
  </div>
    </>
  )
}
