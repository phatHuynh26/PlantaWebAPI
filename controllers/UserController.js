const userModel = require('./UserModal');
const bcrypt = require('bcryptjs')
const register = async (email, password, name, phonenumber) => {
    try {
        var user = await userModel.findOne({ email: email })
        if (user) {
            throw new Error('Email already exists');
        }
        // max hoa password 
        const salt = bcrypt.genSaltSync(10);
        password = bcrypt.hashSync(password, salt);
        user = new userModel({
            email: email,
            password: password,
            name: name,
            phonenumber: phonenumber
        });
        const result = await user.save()
        return result;
    } catch (error) {
        console.log("Register user failed", error.message);
    }
}

const login = async (email, password) => {
    try {
        const user = await userModel.findOne({ email: email })
        if (!user) {
            throw new Error('Email does not exist');
        } else {
            // const check = user.password.toString()=== password.toString()
            const check = bcrypt.compareSync(password, user.password);
            if (check) {
                return user;
            }
        }
        return null;
    } catch (error) {
        console.log('Login failed: ', error.message);
        throw new Error('Login failed');
    }
}
// const addToCart = async (email, name, quantity, price, images) => {
//     try {
//         var user = await userModel.findOne({ email: email })
//         if (user) {
//             console.log(user);
//             const data = { name: name, quantity: quantity, price: price, images: images }
//             user.cart.push(data)
//             const result = await user.cart.save()
//             return result
//         } else {
//             return null
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }


const addToCart = async (id,email, name, quantity, price, images) => {
    try {
        var user = await userModel.findOne({ email: email });
        if (user) {
            const data = {id:id, name: name, quantity: quantity, price: price, images: images };
            if (!user.carts) {
                user.carts = [];
            }
            user.carts.push(data);
            await user.save(); // Save the entire user object, not just the cart
            console.log(user.carts);
            return user;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const getCart = async(email)=>{
    try {
        var user = await userModel.findOne({ email: email });
        if (user) {
            console.log(user.carts);
            return user.carts;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}

const deleteAllProductsInCart = async (email) => {
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return "Không tìm thấy người dùng có email này.";
        }

        if (user.carts.length === 0) {
            console.log('Không có sản phẩm trong giỏ hàng');
            return "Không có sản phẩm trong giỏ hàng.";
        }

        user.carts = []; // Xóa tất cả sản phẩm trong giỏ hàng
        await user.save();
        return "Đã xóa tất cả sản phẩm trong giỏ hàng của người dùng thành công.";
    } catch (error) {
        console.log(error);
        return "Đã xảy ra lỗi khi xóa sản phẩm từ giỏ hàng.";
    }
}
const deletecartID = async (email, id) => {
    try {
        const user = await userModel.findOne({ email: email }); // Tìm người dùng dựa trên email
        if (user) {
            user.carts = user.carts.filter(item => item.id !== id); // Lọc và xóa sản phẩm dựa trên id
            await user.save(); // Lưu thay đổi
            console.log(user.carts);
            return "Đã xóa sản phẩm thành công.";
        } else {
            return "Không tìm thấy người dùng có email này.";
        }
    } catch (error) {
        // Xử lý lỗi nếu có
    }
}

// const addToOrderHistory = async(email)=>{
//     try {
//         var user = await userModel.findOne({ email: email });
//         if (user) {
//             const data = { cart : user.carts};
//             if (!user.orderHistory) {
//                 user.orderHistory = [];
//             }
//             user.orderHistory.push(data);
//             user.carts =[]
//             await user.save(); // Save the entire user object, not just the cart
//             console.log(user.orderHistory);
//             return user;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }

// const getOderHistory = async(email)=>{
//     try {
//         var user = await userModel.findOne({ email: email });
//         if (user) {
//             console.log(user.orderHistory);
//             return user.orderHistory;
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }
module.exports = { register, login, addToCart ,getCart,deleteAllProductsInCart,deletecartID}
