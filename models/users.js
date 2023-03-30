const db = require('../helpers/database')

// List all the User in database
exports.getAll = async function getAll(page, limit, order){
    // needs to page, limit, order of data 
    let query = "SELECT * FROM users";
    let data = await db.run_query(query);
    return data; 
}

// get an single User by its ID 
exports.getByID = async function getByID (id){
    let query = "SELECT * FROM users WHERE user_id = ? ";
    let values = [id]
    let data = await db.run_query(query, values);
    return data; 
}

// create a new User
exports.createUser = async function createUser(user){
    let query = "INSERT INTO users SET ?"; 
    let data = await db.run_query(query, user);
    return data;
}

// Update a User account 
exports.updateUser = async function updateUser(id, user){
    let query = "UPDATE users SET ? WHERE user_id = ?"; 
    var values = [user, id]
    let data = await db.run_query(query, values);
    return data;
}

// Delete a User 
exports.deleteUser = async function deleteUser(id){
    let query = "DELETE FROM users WHERE user_id = ?"; 
    var values = [id]
    let data = await db.run_query(query, values);
    return data;
}

// get a single user by (unique) username
exports.findByUsername = async function getByUsername(username) {
    const query = "SELECT * FROM users WHERE user_name = ?;";
    const user = await db.run_query(query, username);
    return user;
}