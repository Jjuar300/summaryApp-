const express = require('express'); 
const router = express.Router(); 

const {
    Space
} = require('../controllers/index'); 

router.post('/postspacetext', Space.postSpaceText)
router.get('/getspacetext', Space.getSpaceText)
router.put('/editspacetext', Space.editSpaceText)

module.exports = router; 