const express = require('express');
const { postChat } = require('../controllers/chatController');
const router = express.Router();

router.post('/', postChat);

module.exports = router;


// const express = require('express');
// const router = express.Router();

// router.get('/',  (req, res) => {
//     res.send('Helloddd, Wsdsdorld!');
// });

// module.exports = router;