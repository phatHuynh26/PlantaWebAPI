const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
    name:{type:String,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true},
    images:{type:Array,default:{ }},
    description:{type:String,default:''},
    category:{type:Array,default:{ }},
    //1 là cây 2 là chậu    
    type:{type:Number,default:1,required:true},
})

module.exports = mongoose.models.product || mongoose.model('product', ProductSchema);
