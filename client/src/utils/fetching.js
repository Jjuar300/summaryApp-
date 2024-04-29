

const fetchData = async (
    endpoint, 
    setState, 
) => {
    try{
     const response = await fetch(endpoint)
         if(!response.ok){
          throw new Error('Failed to fetch data')
         }
         const data  = await response.json(); 
        return setState(data); 
  
    }catch(error){
      console.error('Error fetching:', error)
    }
  }

  export{
     fetchData, 
  }