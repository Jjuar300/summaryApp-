import cozyImage from '../darkImage.jpg';
import { useState } from 'react';
import LinkIcon from './assets/link.svg';
import './styles/index.css'

export default function AddImage() {
 const [isHover, setHover] = useState(false); 
  
 const handleHover = (event) =>{
    setHover(event.type === 'mouseenter')
 }

  return (
    <div
    onMouseEnter={handleHover}
    onMouseLeave={handleHover}
    style={{
        position:'absolute', 
        backgroundColor:'#8b748a', 
        width:'40rem',
        height:'58rem',  
        left:'78rem',
        borderRadius:'1rem',
        top:'.5rem', 
    }}
    >
         <img style={{
        width:'40rem', 
        height:'58rem', 
        borderRadius:'1rem',
        objectFit:'cover', 
    }} src={cozyImage} alt="add image here" />
   
  {/* {isHover && ( 
     <div
     className='linkIcon'
     >
         <img 
        className='linkIcon'
        src={LinkIcon} alt="icon" />
     </div>
  )} */}

         <img 
        className='linkIcon'
        src={LinkIcon} alt="icon" />
  

    </div>
  )
}
