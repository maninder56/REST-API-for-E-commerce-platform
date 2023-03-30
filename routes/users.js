const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/users');

const router = Router({prefix: '/api/v1/users'})

// All endpoints related to product
router.get('/', getAll);
router.post('/', bodyParser(), createUser); // bodyparser is needed to retrieve data from client 

router.get('/:id([0-9]{1,})', getById); 
router.put('/:id([0-9]{1,})', bodyParser(), updateUser); 
router.del('/:id([0-9]{1,})', deleteUser);

// Get all users 
async function getAll(ctx, next){
    let users = await model.getAll();
    console.log("Users requested: ",users)
    if (users.length){
        ctx.body = users;
    }
}

// Get user by ID 
async function getById(ctx, next){
    let id = ctx.params.id;
    console.log( "Requested User ID: ",id);
    let user = await model.getByID(id);
    if (user.length){
        ctx.body = user[0]
    }
}

// create user 
async function createUser(ctx, next){
    const body = ctx.request.body;
    let result = await model.createUser(body);
    if (result){
        ctx.status = 201;
        ctx.body = {ID: result.insertId} // return ID of User
    }
}

// Update Product using product ID 
async function updateUser(ctx, next){
    let id = ctx.params.id;
    const body = ctx.request.body;
    console.log("Recieved values:\n",id,"\n",body)
    let update = await model.updateUser(id, body);
    if (update){
        ctx.status = 201;
        ctx.body = update;
    }
}

// Delete products by product id 
async function deleteUser(ctx, next){
    let id = ctx.params.id;
    console.log("Deleted user_id: ",id)
    let deleteUser = await model.deleteUser(id);
    if (deleteUser){
        ctx.status = 202;
        ctx.body = deleteUser;
    }
}

module.exports = router;


