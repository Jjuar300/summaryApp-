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
  //  const uploadResponse = await imagekit.upload({
  //   file: req.file.buffer, 
  //   fileName: req.file.originalname, 
  //  }); 
  //  res.status(200).json(uploadResponse); 
  } catch (error) {
    console.log('error occured uploading file:', error)
  }
}; 

module.exports = {
    uploadFileImageKit, 
}