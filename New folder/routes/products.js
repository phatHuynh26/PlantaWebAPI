var express = require('express');
var router = express.Router();
const ProductController = require('../controllers/ProductController');

// method:get
// http://localhost:2610/products/
router.get('/',async(req, res, next)=>{
    try{
        const products = await ProductController.getProducts();
        return res.json({status:true,data: products});
    }catch(err){
        res.status(500).json({status:false,data:err.message});
    }
})


// method:get
// http://localhost:2610/products/id/
router.get('/:id',async(req, res, next)=>{
    try{
        const productId = req.params.id; 
        const products = await ProductController.getProductsById(productId);

        return res.json({status:true,data: products});
    }catch(err){
        res.status(500).json({status:false,data:err.message});
    }
})

// method:post
// http://localhost:2610/products/
router.post('/',async (req, res,next) => {
    try{
        const{name,price,quantity,images,description,category,type} = req.body
        const product = await ProductController.addProduct(name,price,quantity,images,description,category,type);
        return res.json({status:true,data:product});
    }catch(err){
        res.status(500).json({status:false,data:err.message});
    }
})


// method:delete
// http://localhost:2610/products/:id/delete
router.post('/:id/delete',async(req, res, next)=>{
    try{
        const {id} = req.params
        const product = await ProductController.deleteProduct(id);
        return res.json({status:true,data:product});
    }catch(err){
        res.status(500).json({status:false,data:err.message});
    }
})

// method:put
// http://localhost:2610/products/update/id
router.post('/update/:id',async(req, res, next)=>{
   try {
    const{id}= req.params
    const{name,price,quantity,images,description,category} = req.body
    const product = await ProductController.updateProduct(id,name,price,quantity,images,description,category);
    return res.status(200).json({status:true,data:product});
   } catch (error) {
    return res.status(500).json({status:false,data:error.message});
   }
})
module.exports = router;
