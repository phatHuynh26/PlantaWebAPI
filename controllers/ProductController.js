const ProductModel = require('./ProductModal');
const CategoryModel = require('./CategoryModal');
const { ObjectId } = require('mongodb');

// lấy danh sách sản phẩm, có phân trang
// có sắp xếp
// const getProducts = async (limit, page) => {
//     try {
//         limit = parseInt(limit) || 10;
//         page = parseInt(page) || 1;
//         const skip = (page - 1) * limit;
//         // select id, name from products where 1 = 1 // quên nó lun
//         // câu điều kiện
//         let query = {};
//         // where .....
//         query = {
//             ...query,
//             // where quantity > 20
//             // quantity: { $gt: 20 }, // greater than
//             // where quantity = 20
//             // quantity: 20, // equal
//             // where price <= 1000
//             // price: { $lte: 50 }, // less than
//             // where price >= 1000 and price <= 2000
//             // price: { $gte: 10, $lte: 70 }, // greater than or equal
//             // where price > 50 or price < 20
//             // $or: [{ price: { $gt: 50 } }, { price: { $lt: 20 } }],
//             // where price > 50 and quantity > 20
//             // $and: [{ price: { $gt: 10 } }, { quantity: { $gt: 10 } }],
//             // where name like %product%
//             // name: { $regex: 'calop', $options: 'i' }
//             // where name = 'product 1'
//             // name: 'product 1'
//         }
//         const products = await ProductModel
//             .find(query, ' name price')
//             // giói hạn số lượng phần tử trả về
//             .limit(limit)
//             // bỏ qua n phần tử
//             .skip(skip)
//         // .sort({ price: -1 });
//         return products;
//     } catch (error) {
//         console.log('getProducts error: ', error.message);
//         throw new Error('Lấy danh sách sản phẩm lỗi');
//     }
// }
const getProducts = async()=>{
    try {
        const products =  await ProductModel.find()
        return products;
    } catch (error) {
        console.log('getProducts error: ', error.message);
        throw new Error('Lấy danh sách sản phẩm lỗi');
    }
}
const getProductsById = async(productId)=>{
    try {
        // Sử dụng phương thức findById của model Product để tìm kiếm sản phẩm theo id
        const product = await ProductModel.findById(productId);
        
        // Kiểm tra xem sản phẩm có tồn tại không
        if (!product) {
            throw new Error('Sản phẩm không tồn tại');
        }
        
        // Nếu sản phẩm tồn tại, trả về sản phẩm
        return product;
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi lấy sản phẩm theo id:', error.message);
        throw error; // Re-throw lỗi để bên ngoài có thể xử lý
    }
}


const addProduct = async(name,price,quantity,images,description,category,type)=>{
    try {
        const categoryInDB = await CategoryModel.findById(category)
        if (!categoryInDB) {
            throw new Error('Danh mục không tồn tại'); // Category not found error
        }
        category = {
            category_id:categoryInDB._id,
            category_name:categoryInDB.name
        }
        const product = new ProductModel({
            name,price,quantity,images,description,category,type
        })
        const newProduct = new ProductModel(product)
        const result = await newProduct.save();
        return result
    } catch (error) {
        console.log('addProduct error: ', error.message);
        throw new Error('Thêm sản phẩm lỗi');
    }
}


const deleteProduct = async (id) => {
    try {
        const productInDB = await ProductModel.findById(id);
        if (!productInDB) {
            throw new Error('Sản phẩm không tồn tại'); // Product not found error
        }
        await ProductModel.deleteOne({_id:id})
        return true
    } catch (error) {
        console.log(error.message);
        throw new Error('Xóa sản phẩm lỗi');
    }
}
const updateProduct = async (_id, name, price, quantity, images, description, category) => {
    try {
      const productInDB = await ProductModel.findById(_id);
      console.log(productInDB);
      if (!productInDB) {
        throw new Error('Sản phẩm không tồn tại'); // Product not found
      }
  
      const categoryInDB = await CategoryModel.findOne({ _id: category });
      if (!categoryInDB) {
        throw new Error('Danh mục không tồn tại'); // Category not found
      }
      productInDB.name = name ? name : productInDB.name;
      productInDB.price = price ? price : productInDB.price;
      productInDB.quantity = quantity ? quantity : productInDB.quantity;
      productInDB.images = images ? images : productInDB.images;
      productInDB.description = description ? description : productInDB.description;
      productInDB.category = categoryInDB ? {
        category_id: categoryInDB._id,
        category_name: categoryInDB.name
      } : productInDB.category;
  
      await productInDB.save();
      return true;
    } catch (error) {
      console.log('updateProduct error: ', error.message);
      if (error.message.includes('Sản phẩm không tồn tại')) {
        throw new Error('Sản phẩm không tồn tại');
      } else if (error.message.includes('Danh mục không tồn tại')) {
        throw new Error('Danh mục không tồn tại');
      } else {
        throw new Error('Sửa sản phẩm thất bại', error.message);
      }
    }
  };
  
module.exports = { getProducts, addProduct, deleteProduct, updateProduct ,getProductsById}