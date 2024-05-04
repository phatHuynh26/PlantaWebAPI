const historyModal = require('./HistoryModal');
const userModal = require('./UserModal')

const addtohistory = async (email, name, id, price, quantity, images) => {
    try {
        // Tìm kiếm người dùng theo email
        var user = await userModal.findOne({ email: email });
        if (user) {
            // Thêm lịch sử mua hàng
            const historyData = new historyModal({
                email: email,
                name: name,
                id: id,
                price: price,
                quantity: quantity,
                images: images
            });
            const historyResult = await historyData.save(); // Lưu dữ liệu mới vào cơ sở dữ liệu

            // Xóa giỏ hàng của người dùng (nếu có)
            if (user.carts) {
                await userModal.updateOne({ email: email }, { $unset: { carts: 1 } }); // Cập nhật user, xóa trường carts
            }

            // Trả về kết quả lịch sử mua hàng
            return historyResult;
        } else {
            return null;
        }
    } catch (error) {
        console.log("Lỗi khi thêm vào lịch sử:", error.message); // Cải thiện xử lý lỗi
    }
}


const getHistory = async (email) => {
    try {
        var result = await historyModal.find({ email: email });
        if (result) {
            return result;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);
    }
}
const getAllorder = async () => {
    try {
        const order = historyModal.find()
        return order
    } catch (error) {
        console.log(error);
    }

}
module.exports = { addtohistory, getHistory ,getAllorder}
