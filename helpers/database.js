const mysql = require('promise-mysql');
const info = require('../config');

// run SQL query then end the connection 
exports.run_query = async function run_query(query, values) {
    try {
        const connection = await mysql.createConnection(info.config);
        let data = await connection.query(query, values);
        await connection.end();
        return data;
    } catch (error){
        // log error and give generic error message
        console.error(error, query, values);
        throw 'Database query error' 
    }

}

