const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/users');
const auth = require('../controllers/auth'); // for authentication 
const can = require('../permissions/users'); // for permissions 

const router = Router({prefix: '/api/v1/users'})

// All endpoints related to product
router.get('/', getAll);
router.post('/', bodyParser(), createUser); // bodyparser is needed to retrieve data from client 

router.get('/:id([0-9]{1,})' ,getById); 
router.put('/:id([0-9]{1,})', bodyParser(), updateUser); 
router.del('/:id([0-9]{1,})', auth ,deleteUser);

// Get all users 
// add permissions to all routes  <--------
async function getAll(ctx){
    let users = await model.getAll();
    if (users.length){
        ctx.body = users;
    }
}

// Get user by ID 
async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested User ID: ",id);
    let user = await model.getByID(id);
    if (user.length){
        ctx.body = user[0]
    }
}

// create user 
async function createUser(ctx){
    const body = ctx.request.body;
    let result = await model.createUser(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} ;
    }
}

// Update Product using product ID 
async function updateUser(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    console.log("Recieved values:\n",id,"\n",body)
    let update = await model.updateUser(id, body);
    if (update){
        ctx.status = 201;
        ctx.body = {ID: id, update: true, link: ctx.request.path} ;
    }
}

// Delete products by product id 
async function deleteUser(ctx){
    let id = ctx.params.id;
    console.log("Deleted user_id: ",id)
    let deleteUser = await model.deleteUser(id);
    if (deleteUser){
        ctx.status = 202;
        ctx.body = {ID: id, deleted: true};
    }
}

module.exports = router;


