const express = require('express'); 
const Imagekit = require('imagekit'); 

const imagekit = new Imagekit({
    urlEndpoint: process.env.IMAGEKIT_URLENDPOINT, 
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY, 
    privateKey: process.env.IAMAGEKIT_PRIVATE_KEY, 
}); 

const uploadFileImageKit = async (req,res) => {
  try {
    const result = imagekit.getAuthenticationParameters(); 
    res.send(result) 
  } catch (error) {
    res.status(500).json({error: 'Internal error'})
  }
}; 

const deleteImagekitFolder = async (req, res) => {
try {
  const {folderName} = req.body; 
  imagekit.deleteFolder(`${folderName}`, (error, result) => {
    if(error){
      console.log('error:', error)
    }else{
      console.log('result:', result)
    }
  }); 
} catch (error) {
  res.status(500).json({error: 'Internal error'})
}
}

module.exports = {
    uploadFileImageKit, 
    deleteImagekitFolder, 
}