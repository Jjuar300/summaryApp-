import {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';

export default function useS3image() {
  const [image, setImage] = useState([]); 
  const fileName = useSelector((state) => state.imageContainer.fileLink); 


  const getS3image = async () => {
    const response = await fetch('api/file')
    const data = await response.json(); 
    return setImage(data); 
  }

  useEffect(() => {
    getS3image()  
  },[fileName])

    return {image, getS3image}
}
