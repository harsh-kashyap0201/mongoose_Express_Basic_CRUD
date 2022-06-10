//importing required modules
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/products');
const products = require('./models/products');
const methodOverride=require('method-override');

//parsing incoming request body to json
app.use(express.urlencoded({extended:true}));

//handling requests other than get and post
app.use(methodOverride('_method'));

//setting path for static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//connecting to mongodb
mongoose.connect('mongodb://localhost:27017/allMart', { useNewUrlParser: true }).then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

//setting up routes

//home page
app.get('/', (req, res) => {
    res.send("server is running");
});

//listing all products
app.get('/products', async(req, res) => {
    const category=req.query.category;
    if(category){
        const products=await Product.find({category:category});
        res.render('products/index',{products:products,category:category});
    }
    else{
        const products = await Product.find({});
        res.render('products/index', {products: products,category:"All"});
    }
    
    // console.log(products);
    // res.send(products);
});

//adding a new product
app.get('/products/new',(req,res)=>{
    res.render('products/new');
});

app.post('/products/new', async(req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.redirect('/products');
});

//view details of a product
app.get('/products/:id',async(req,res)=>{
    const id=req.params.id;
    const product=await products.findById(id);
    res.render('products/details',{product:product});
})

//edit a product (form)
app.get('/products/:id/edit',async(req,res)=>{
    const id=req.params.id;
    const product=await products.findById(id);
    res.render('products/edit',{product:product});
});

//edit a product (update)
app.patch('/products/:id/edit',async(req,res)=>{
    const id=req.params.id;
    const product=await products.findByIdAndUpdate(id,req.body,{runValidators:true});
    res.redirect('/products');
});

//delete a product
app.delete('/products/:id/delete',async(req,res)=>{
    const id=req.params.id;
    await products.findByIdAndDelete(id);
    res.redirect('/products');
});

//connecting to server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});