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
    let query = "SELECT * FROM products;";
    let data = await db.run_query(query);
    return data; 
}

// create a new product 
// add product details like name, description, price and product category
exports.add = async function add (product){
    let query = "INSERT INTO products SET ?"; 
    let data = await db.run_query(query, product);
    return data;
}