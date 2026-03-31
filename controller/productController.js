const fs=require('fs-extra');
const path=require('path');
const filePath = path.join(__dirname, '../data/products.json');
//read data from json file
function readData(){
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
}

//write data to json file
function writeData(data){
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}       

//expiry logic
function getExpiryDate(category,mfgDate){
    let date = new Date(mfgDate);
    if(category.toLowerCase() === 'electronics'){
        date.setFullYear(date.getFullYear() + 2);
    } else if(category.toLowerCase() === 'food'){
        date.setDate(date.getDate() + 10);
    }
    else{
        date.setFullYear(date.getFullYear() + 1);
    }
    return date.toISOString().split('T')[0];
}

//add product
exports.addProduct = (req, res) => {
    let data = readData();
    const {id, name, category, price } = req.body;
    let mfgDate= new Date().toISOString().split('T')[0];
    let expiryDate = getExpiryDate(category, mfgDate);
    let product={
        id,
        name,
        category,
        price,  
        manufacturingDate: mfgDate,
        expiryDate      
    };
    data.products.push(product);
    writeData(data);
    res.status(201).json({message: 'Product added successfully', product});
};
//get all products
exports.getAllProducts = (req, res) => {
    let data = readData();
    res.json(data.products);
};

//get products by category
exports.getProductByCategory = (req, res) => {
    let data = readData();
    let product= data.products.filter(p=>p.category.toLowerCase() === req.params.category.toLowerCase());
    res.json(product);  
};      

//update product
exports.updateProduct = (req, res) => {
    let data = readData();
    let index = data.products.findIndex(p => p.id === req.params.id);
    if(!product){
        return res.status(404).json({message: 'Product not found'});
    }
    Object.assign(data.products[index], req.body);
    writeData(data);
    res.json({message: 'Product updated successfully', product: data.products[index]});
};

//delete product
exports.deleteProduct = (req, res) => {
    let data = readData();
    data.products = data.products.filter(p => p.id !== req.params.id);
    writeData(data);
    res.json({message: 'Product deleted successfully'});
};

