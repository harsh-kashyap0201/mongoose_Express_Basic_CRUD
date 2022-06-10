//seed file to store inital data
const mongoose = require('mongoose');
const Product = require('./models/products');

mongoose.connect('mongodb://localhost:27017/allMart', { useNewUrlParser: true }).then(()=>{
    console.log('Connected to mongoDB');
}).catch((err)=>{
    console.log(err);
});

const p1= new Product({name: 'iPhone', price: 1000, quantity: 10, category: 'Electronics', available: true});
const p2= new Product({name: 'T-shirt', price: 50, quantity: 20, category: 'Clothes', available: true});
const p3= new Product({name: 'Biscuits', price: 10, quantity: 30, category: 'Food', available: true});
const p4= new Product({name: 'Notebook', price: 100, quantity: 40, category: 'Electronics', available: true});
const p5= new Product({name: 'Shoes', price: 200, quantity: 50, category: 'Clothes', available: true});
const p6= new Product({name: 'Bag', price: 300, quantity: 60, category: 'Clothes', available: true});

p1.save();
p2.save();
p3.save();
p4.save();
p5.save();
p6.save();
