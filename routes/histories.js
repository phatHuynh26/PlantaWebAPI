var express = require('express');
var router = express.Router();
const historyController = require('../controllers/HistoryController')


// method:post
// http://localhost:2610/history/add
router.post('/add', async (req, res, next) => {
  try {
    const { email,name, id, price, quantity, images } = req.body
    const result = await historyController.addtohistory(email,name, id, price, quantity, images)
    if (result) {
      return res.status(200).json({ status: true, data: result })
    }
    if (result == null) {
      console.log('ko có dữ liệu ');
      return res.status(400).json({ status: false, data: result })
    }
  } catch (error) {
    res.status(500).json({ status: false, data: result });
  }
})

// method:post
// http://localhost:2610/histories/gethistories
router.post('/gethistories', async (req, res, next) => {
  try {
    const { email } = req.body
    const result = await historyController.getHistory(email)
    if (result) {
      return res.status(200).json({ status: true, data: result })
    }
    if (result == null) {
      console.log('ko có tài khoản');
      return res.status(400).json({ status: false, data: result })
    }
  } catch (error) {
    res.status(500).json({ status: false, data: result });
  }
})
// method:get
// http://localhost:2610/histories/
router.get('/',async (req, res,next) => {
  try {
    const result = await historyController.getAllorder();
    return res.status(200).json({ status: true, data: result })
  } catch (error) {
    return res.status(400).json({ status: false, data: result })
    
  }
})
module.exports = router;
