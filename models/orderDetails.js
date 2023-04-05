const db = require('../helpers/database')

// List all the orders details in database
exports.getAll = async function getAll (page, limit, order){
    // needs to page, limit, order od data 
    // SELECT * FROM products order by product_id limit 2; -> Example 
    let query = "SELECT * FROM order_details";
    let data = await db.run_query(query);
    return data; 
}

// get an single orderdetail by its ID 
exports.getByID = async function getByID (id){
    let query = "SELECT * FROM order_details WHERE detail_id = ? ";
    let values = [id]
    let data = await db.run_query(query, values);
    return data; 
}

// create a new order detail 
exports.createOrderDetail = async function createOrderDetail(orderDetail){
    // first set the total ammount value to 0 
    let query = "INSERT INTO order_details SET ?"; 
    let data = await db.run_query(query, orderDetail);
    return data;
}

// Update a product 
exports.updateOrderDetail = async function updateOrderDetail(id, orderDetail){
    let query = "UPDATE order_details SET ? WHERE detail_id = ?"; 
    var values = [orderDetail, id]
    let data = await db.run_query(query, values);
    return data;
}

// Delete a product 
exports.deleteOrderDetail = async function deleteOrderDetail(id){
    let query = "DELETE FROM order_details WHERE detail_id = ?"; 
    var values = [id]
    let data = await db.run_query(query, values);
    return data;
}