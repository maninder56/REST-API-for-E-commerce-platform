const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/users');
const auth = require('../controllers/auth'); // for authentication 
const can = require('../permissions/users'); // for permissions 


// for data validation 
const {validateUser} = require('../controllers/validation'); 


const prefix = '/api/v1/users' ; 
const router = Router({prefix: prefix})

// All endpoints related to product
router.get('/', auth, getAll); // only admin should be able to access 
router.post('/', bodyParser(), validateUser,  createUser); // bodyparser is needed to retrieve data from client 

router.get('/:id([0-9]{1,})' , auth, getById); // user can access only their account
router.put('/:id([0-9]{1,})', auth,  bodyParser(), validateUser, updateUser); // user can only change thier account 
router.del('/:id([0-9]{1,})', auth ,deleteUser);

// Get all users 
async function getAll(ctx){
    
    const links = {
        info : `send GET request for specific user id [1-9]`,
        byId : `${ctx.protocol}://${ctx.host}${prefix}/id`
    }
    const permission = can.readAll(ctx.state.user);
    if (!permission.granted){
        ctx.body = `unauthorised`
        ctx.status = 403;
    } else{
        let result = await model.getAll();
        if (result.length){
            ctx.status = 200;
            ctx.body = {links, result};
        }
    } 
}

// Get user by ID 
async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested User ID: ",id);
    const links = {
        info : `Create new user by POST Request`,
        createOrder: `${ctx.protocol}://${ctx.host}${prefix}/`
    }
    let user = await model.getByID(id);
    if (user.length){
        user = user[0]
        ctx.status = 200;
        ctx.body = { links , user} ; 
    } else {
        ctx.body = `Not Valid ID`
        ctx.status = 404;
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
    } else {
        ctx.body = `unable to create user`
        ctx.status = 400;
    }
}

// Update Product using product ID 
async function updateUser(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    const check_id = await model.getByID(id);
    if (check_id.length){
        console.log("Recieved values:\n",id,"\n",body)
        let update = await model.updateUser(id, body);
        if (update){
            ctx.status = 201;
            ctx.body = {ID: id, update: true, link: ctx.request.path} ;
        }else{
            ctx.body = `user not found. make sure user id is correct`
            ctx.status = 404;
        }
    }
    
}

// Delete products by product id 
async function deleteUser(ctx){
    let id = ctx.params.id;
    console.log("Deleted user_id: ",id)
    const check_id = await model.getByID(id);
    if (check_id.length){
        let deleteUser = await model.deleteUser(id);
        if (deleteUser){
            ctx.status = 202;
            ctx.body = {ID: id, deleted: true};
        } else{
            ctx.body = `unauthorized`
            ctx.status = 403;
        }
    } else {
        ctx.body = `order not found. make sure order id is correct`
        ctx.status = 404;
    }
    
}

module.exports = router;


