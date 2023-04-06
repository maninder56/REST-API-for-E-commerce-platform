const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/orders');
const auth = require('../controllers/auth'); // for authentication 


// for data validation 
const {validateOrder} = require('../controllers/validation'); 

const prefix = '/api/v1/orders'; // fic prefix 
const router = Router({prefix: prefix})



// All endpoints related to orders 
router.get('/', auth, getAll); // see the user and then show all the orders the user has 
router.post('/', auth, bodyParser(), validateOrder, createOrder); 

router.get('/:id([0-9]{1,})', auth, getById); // add auth so that only user can acces its own order 
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateOrder , updateOrder);  // only user can update their order 
router.del('/:id([0-9]{1,})', auth, deleteOrder);



async function getAll(ctx){
    let orders = await model.getAll(); // add permission so that only admin can see all orders 
    const links = {
        info : `send GET request for specific order id [1-9]`,
        byId : `${ctx.protocol}://${ctx.host}${prefix}/id`
    }
    if (orders.length){
        ctx.status = 200;
        ctx.body = {links, orders};
    } else{
        ctx.body = `unauthorised`
        ctx.status = 400;
    }
}        

async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested order ID: ",id);
    const links = {
        info : `Create new order by POST Request`,
        createOrder: `${ctx.protocol}://${ctx.host}${prefix}/`
    }
    let order = await model.getByID(id);
    if (order.length){
        ctx.status = 200;
        ctx.body = { links , order} ; 
    } else {
        ctx.body = `Not Valid ID`
        ctx.status = 400;
    }
}

async function createOrder(ctx){
    const body = ctx.request.body;
    let result = await model.createOrder(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} 
    } else {
        ctx.body = `unable to create order`
        ctx.status = 400;
    }
}

// Update Product using product ID 
async function updateOrder(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    const check_id = await model.getByID(id);
    if (check_id.length){
        console.log("Recieved values:\n",id,"\n",body)
        let update = await model.updateOrder(id, body);
        if (update){
            ctx.status = 201;
            ctx.body = {ID: id, update: true, link: ctx.request.path};
        }
    }
    else{
        ctx.body = `order not found. make sure order id is correct`
        ctx.status = 404;
    }
}

// Delete products by product id 
async function deleteOrder(ctx){
    let id = ctx.params.id;
    console.log("Deleted product_id: ",id)
    const check_id = await model.getByID(id);
    if (check_id.length){
        let deleteOrder = await model.deleteOrder(id);
        if (deleteOrder){
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

// get product by category 



module.exports = router;