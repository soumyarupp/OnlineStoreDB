import express from "express";
import mongoose from "mongoose";
import Product from "./schema.js";

const app = express();
app.use(express.json());
const connectDB = await mongoose.connect("mongodb+srv://soumyarupsamanta50_db_user:FtvSnHl3zzI0Dtb9@cluster0.gfpimxa.mongodb.net/UserInfo")


//Wellcome page
app.get("/",(req,res)=>{
    res.send("Wellcome To My Site");
})

//all product info
app.get("/products",async (req,res) => {
    const allProduct = await Product.find();
    res.json(allProduct);
})

//Create product
app.post("/product",async (req,res) => {
    const userProduct = req.body;
    console.log(userProduct);
    const newProduct = await Product.create(req.body)
    res.json({
        massage: "Product Created Successfully",
        product: newProduct
    })
    
})

// Create multiple products
app.post("/product/bulk",async (req,res) => {
    const userProduct = req.body;
    console.log(userProduct);
    const newProduct = await Product.create(req.body)
    if(data == null){
        res.json({
            massage: "Product Not Found!",
        });
        return;
    }
    res.json({
        massage: "Product Created Successfully",
        product: newProduct
    })
    
})

// Get product by MongoDB id
app.get("/products/id/:id",async (req,res) => {
    const id = req.params.id;
    const data = await Product.findById(id);
    if(data == null){
        res.json({
            massage: "Product Not Found!",
        });
        return;
    }
    res.json({
        massage: "Product Found Successfully",
        product: data
    })

    
})

//Get product by slug
app.get("/products/slug/:slug",async (req,res) => {
    const slug = req.params.slug;
    const data = await Product.findOne({slug: slug});
    if(data == null){
        res.json({
            massage: "Product Not Found!",
        });
        return;
    }
    res.json({
        massage: "Product Found Successfully",
        product: data
    })

    
})

//Update product by slug
app.patch("/products/slug/:slug",async (req,res) => {
    const slug = req.params.slug;
    const UpdateData = req.body;
    const data = await Product.findOneAndUpdate({slug: slug},UpdateData,{new: true});
    if(data == null){
        res.json({
            massage: "Product Not Found!",
        });
        return;
    }
    res.json({
        massage: "Product Update Successfully",
        product: data
    })

    
})

// Delete product by slug
app.delete("/products/slug/:slug",async (req,res) => {
    const slug = req.params.slug;
    const UpdateData = req.body;
    const data = await Product.findOneAndDelete({slug: slug});
    if(data == null){
        res.json({
            massage: "Product Not Found!",
        });
        return;
    }
    res.json({
        massage: "Product Delete Successfully",
        product: data
    })

    
})



app.listen("5050",()=>{
    console.log("Server is started at port 5050");
})
