const db = require('../helpers/database')

// List all the categories in database
exports.getAll = async function getAll (page, limit, order){
    // needs to page, limit, order od data 
    // SELECT * FROM products order by product_id limit 2; -> Example 
    let query = "SELECT * FROM categories";
    let data = await db.run_query(query);
    return data; 
}

// get an single category by its ID 
exports.getByID = async function getByID (id){
    let query = "SELECT * FROM categories WHERE category_id = ? ";
    let values = [id]
    let data = await db.run_query(query, values);
    return data; 
}

// create a new category in database 
exports.createCategory = async function createCategory(category){
    let query = "INSERT INTO categories SET ?"; 
    let data = await db.run_query(query, category);
    return data;
}

// Update a category in databse by id
exports.updateCategory = async function updateCategory(id, category){
    let query = "UPDATE categories SET ? WHERE category_id = ?"; 
    var values = [category, id]
    let data = await db.run_query(query, values);
    return data;
}

// Delete a category by its id 
exports.deleteCategory = async function deleteCategory(id){
    let query = "DELETE FROM categories WHERE category_id = ?"; 
    var values = [id]
    let data = await db.run_query(query, values);
    return data;
}
