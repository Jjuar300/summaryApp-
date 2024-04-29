

const updateData = async (
    endpoint,
    data, 
) => {
   try{
     fetch(endpoint, {
        method:'PUT', 
        headers: {'Content-Type' : 'application/json'}
     })
   }catch(error){
    console.error('could not update:', error)
   }
}

export {
    updateData, 
}