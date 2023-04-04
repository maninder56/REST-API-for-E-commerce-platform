const db = require('../helpers/database')


// List all the orders in database
exports.getAll = async function getAll (page, limit, order){
    // needs to page, limit, order od data 
    // SELECT * FROM products order by product_id limit 2; -> Example 
    let query = "SELECT * FROM orders";
    let data = await db.run_query(query);
    return data; 
}

// get an single order by its ID 
exports.getByID = async function getByID (id){
    let query = "SELECT * FROM orders WHERE order_id = ? ";
    let values = [id]
    let data = await db.run_query(query, values);
    return data; 
}


// create a new order  
// add product details like name, description, price and product category
exports.createOrder = async function createOrder(order){
    // first set the total ammount value to 0 
    // update the total ammount after the orders have been placed in order details
    let query = "INSERT INTO products SET ?"; 
    let data = await db.run_query(query, product);
    return data;
}

// Update a product 
exports.updateOrder = async function updateOrder(id, order){
    let query = "UPDATE products SET ? WHERE product_id = ?"; 
    var values = [product, id]
    let data = await db.run_query(query, values);
    return data;
}

// Delete a product 
exports.deleteOrder = async function deleteOrder(id){
    let query = "DELETE FROM products WHERE product_id = ?"; 
    var values = [id]
    let data = await db.run_query(query, values);
    return data;
}