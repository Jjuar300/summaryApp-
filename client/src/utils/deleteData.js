
const deleteData = async (
    endpoint, 
    data, 
) => {
  
 try{
  await  fetch(endpoint, {
        method:'DELETE', 
        headers:{
            'Content-Type' : 'application/json', 
        }, 
        body: JSON.stringify(data)
    })
 }catch(error){
    console.error('Error occured while deleting data:', error); 
 }

}; 

export {
    deleteData, 
}