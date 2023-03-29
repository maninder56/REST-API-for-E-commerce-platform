const db = require('../helpers/database')

// get an single product by its ID 
exports.getByID = async function getByID (id){
    let query = "SELECT * FROM products WHERE product_id = ? ";
    let values = [id]
    let data = await db.run_query(query, values);
    return data; 
}

// List all the products in database
exports.getAll = async function getAll (page, limit, order){
    // needs to page, limit, order od data 
    let query = "SELECT * FROM products ";
    let data = await db.run_query(query);
    console.log(data);
    return data; 
}

// create a new product 
// add product details like name, description, price and product category
exports.createProduct = async function createProduct(product){
    let query = "INSERT INTO products SET ?"; 
    let data = await db.run_query(query, product);
    return data;
}

// Update a product 
exports.updateProduct = async function updateProduct(id, product){
    let query = "UPDATE products SET ? WHERE product_id = ?"; 
    var values = [product, id]
    let data = await db.run_query(query, values);
    return data;
}

// Delete a product 
exports.deleteProduct = async function deleteProduct(id){
    let query = "DELETE FROM products WHERE product_id = ?"; 
    var values = [id]
    let data = await db.run_query(query, values);
    return data;
}

