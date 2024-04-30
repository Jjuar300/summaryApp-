

const updateData = async (
    endpoint,
    data, 
) => {
   try{
     fetch(endpoint, {
        method:'PUT', 
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify(data)
      }, 
    ); 
     
   }catch(error){
    console.error('could not update:', error)
   }
}

export {
    updateData, 
}