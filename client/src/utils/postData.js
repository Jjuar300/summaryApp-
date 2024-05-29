
const postData = async ( 
    endpoint,
    data, 
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
     console.log(error); 
     return error; 
    } 
 }
 
 export {
  postData, 
 }