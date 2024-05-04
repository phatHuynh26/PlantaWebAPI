var express = require('express');
var router = express.Router();
const userController = require('../controllers/UserController');

// http:/localhost:2610/user


// method:post
// http://localhost:2610/users/register
router.post('/register', async (req, res, next) => {
  try {
    const { email, password, name, phonenumber } = req.body
    console.log(email, password, name, phonenumber)
    const result = await userController.register(email, password, name, phonenumber)
    return res.status(200).json({ status: true, data: result })
  } catch (error) {
    console.log("đăng ký thất bại", { message: ("đăng ký thất bại") });
    res.status(500).json({ status: false, data: result });
  }
})

// method:post
// http://localhost:2610/users/login
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const result = await userController.login(email, password)
    if (result) {
      return res.status(200).json({ status: true, data: result })
    } else {
      return res.status(400).json({ status: false, data: "Wrong Email or Password" })
    }
  } catch (error) {
    console.log("đăng nhập thất bại", { message: ("đăng nhập thất bại") });
    res.status(500).json({ status: false, data: result });
  }
})

// method:post
// http://localhost:2610/users/addtocart
router.post('/addtocart', async (req, res, next) => {
  try {
    const { id, email, name, quantity, price, images } = req.body
    const result = await userController.addToCart(id, email, name, quantity, price, images)
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

// method:post
// http://localhost:2610/users/getcart
router.post('/getcart', async (req, res, next) => {
  try {
    const { email } = req.body
    console.log(email)
    const result = await userController.getCart(email)
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

// method:post
// http://localhost:2610/users/deletecart
router.post('/deletecart', async (req, res, next) => {
  try {
    const { email } = req.body
    const product = await userController.deleteAllProductsInCart(email);
    return res.json({ status: true, data: product });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
})
// method:post
// http://localhost:2610/users/:id/deletecartID
router.post('/deletecartID/', async (req, res, next) => {
  try {
    const { email, id } = req.body; // Lấy email từ req.body
    
    console.log(req.body);
    const product = await userController.deletecartID(email, id); // Sử dụng email và id

    return res.status(200).json({ status: true, data: product });
  } catch (err) {
    res.status(500).json({ status: false, data: err.message });
  }
})


// method:post
// http://localhost:2610/users/addhistory
// router.post('/addhistory', async (req, res, next) => {
//   try {
//     const { email, carts } = req.body
//     const result = await userController.addToOrderHistory(email, carts)
//     if (result) {
//       return res.status(200).json({ status: true, data: result })
//     }
//     if (result == null) {
//       console.log('ko có tài khoản');
//       return res.status(400).json({ status: false, data: result })
//     }
//   } catch (error) {
//     res.status(500).json({ status: false, data: result });
//   }
// })


// method:post
// http://localhost:2610/users/getorderhistory
// router.post('/getorderhistory', async (req, res, next) => {
//   try {
//     const { email } = req.body
//     console.log(email)
//     const result = await userController.getOderHistory(email)
//     if (result) {
//       return res.status(200).json({ status: true, data: result })
//     }
//     if (result == null) {
//       console.log('ko có tài khoản');
//       return res.status(400).json({ status: false, data: result })
//     }
//   } catch (error) {
//     res.status(500).json({ status: false, data: result });
//   }
// })

module.exports = router;
