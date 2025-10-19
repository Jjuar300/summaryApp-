
const postData = async ( 
    endpoint,
    data,
    functionError, 
) => {
    try{
        const response = await fetch(endpoint,{
         method: 'POST',
         headers: {
           'Content-Type' : 'application/json', 
         }, 
         body: JSON.stringify(data), 
        },)
      const result = await response.json();
      return result; 
    }catch(error){
     console.log( `${functionError}`,error); 
     return error; 
    } 
 }
 
 export {
  postData, 
 }