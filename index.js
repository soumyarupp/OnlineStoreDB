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

//Search products by brand
app.get("/products/search/brand",async (req,res) => {
    const productValue = req.query.brand;

    console.log(productValue);

    const data = await Product.find({brand: productValue});
    if(data[0] == null){
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

// Search products by category
app.get("/products/search/category",async (req,res) => {
    const productValue = req.query.category;

    console.log(productValue);

    const data = await Product.find({category: productValue});
    if(data[0] == null){
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

// Search available products
app.get("/products/search/available",async (req,res) => {
    const data = await Product.find({isAvailable: true});
    if(data[0] == null){
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

//Search out-of-stock products
app.get("/products/search/out-of-stock",async (req,res) => {
    const data = await Product.find({ stock: 0 });
    if(data[0] == null){
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

//Search products by brand and category
app.get("/products/search/brand-category",async (req,res) => {
    const {brand,category} = req.query;
    const data = await Product.find({brand: brand, category: category});
    if(data[0] == null){
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

//Search products by brand OR category
app.get("/products/search/brand-or-category",async (req,res) => {
    const {brand,category} = req.query;
    const data = await Product.find(
        {
            $or: [
                {brand: brand},
                {category: category}
            ]
        }
    );
    if(data[0] == null){
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

// Products with price greater than amount
app.get("/products/search/price-greater-than",async (req,res) => {
    const {amount} = req.query;
    const data = await Product.find(
        {
            price: {$gt: amount}
        }
    );
    if(data[0] == null){
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

// Products with price less than amount
app.get("/products/search/price-less-than",async (req,res) => {
    const {amount} = req.query;
    const data = await Product.find(
        {
            price: {$lt: amount}
        }
    );
    if(data[0] == null){
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

// Products with price between min and max
app.get("/products/search/price-between",async (req,res) => {
    const {min,max} = req.query;
    const data = await Product.find(
        {
            price: {$gte: min,$lte: max}
        }
    );
    if(data[0] == null){
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

// Products with rating greater than given value
app.get("/products/search/rating",async (req,res) => {
    const {rating} = req.query;
    const data = await Product.find(
        {
            rating: {$gte: rating}
        }
    );
    if(data[0] == null){
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





app.listen("5050",()=>{
    console.log("Server is started at port 5050");
})
