


const postData = async ( 
    endpoint,
    data, 
) => {
    try{
        await fetch(endpoint, {
         method: 'POST',
         headers: {
           'Content-Type' : 'application/json', 
         }, 
         body: JSON.stringify(data), 
        },)
 
    }catch(error){
     console.log(error); 
    } 
 }
 

 export {
  postData, 
 }