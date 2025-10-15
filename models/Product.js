import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    logo:{type:String,required:true},
    productName:{type:String,required:true},
    productAbout:{type:String},
    productLink:{type:String,required:true}
})

const Product =  mongoose.models.Product || mongoose.model("Product",productSchema);

export default Product