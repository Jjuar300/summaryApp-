const express = require('express'); 
const router = express.Router(); 

const {
    Space
} = require('../controllers/index'); 

router.post('/getspacetext', Space.getSpaceText)

module.exports = router; 