const express = require('express'); 
const router = express.Router(); 

const {
    Space
} = require('../controllers/index'); 

router.post('/postspacetext', Space.postSpaceText)
router.get('/getspacetext', Space.getSpaceText)

module.exports = router; 