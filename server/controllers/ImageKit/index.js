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
    console.log('error occured uploading file:', error)
  }
}; 

module.exports = {
    uploadFileImageKit, 
}