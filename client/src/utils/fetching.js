

const fetchData = async (
    endpoint, 
) => {
    try{
     const response = await fetch(endpoint)
         if(!response.ok){
          throw new Error('Failed to fetch data')
         }
         const data  = await response.json(); 
         return data; 
    }catch(error){
      return error; 
    }
  }

  export{
     fetchData, 
  }