import {useEffect, useState} from 'react'

export default function useS3image() {
  const [image, setImage] = useState([]); 
  
  const getS3image = async () => {
    const response = await fetch('api/file')
    const data = await response.json(); 
    return setImage(data); 
  }

  useEffect(() => {
    getS3image()  
  },[])

    return {image, getS3image}
}
