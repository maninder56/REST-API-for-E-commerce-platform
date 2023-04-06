const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/orderDetails');
const auth = require('../controllers/auth'); // for authentication 


// for data validation 
const {validateOrderDetail} = require('../controllers/validation'); 


const prefix = '/api/v1/ordersdetails'; // fic prefix 
const router = Router({prefix: prefix})


// All endpoints related to orders 
router.get('/', auth, getAll); // see the user and then show all the orders the user has 
router.post('/', auth, bodyParser(),validateOrderDetail, createOrderDetail); 

router.get('/:id([0-9]{1,})', auth, getById); // add auth so that only user can acces its own order 
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateOrderDetail, updateOrderDetail);  // only user can update their order 
router.del('/:id([0-9]{1,})', auth, deleteOrderDetail);


async function getAll(ctx){
    let ordersdetail = await model.getAll(); // add permission so that only admin can see all orders 
    const links = {
        info : `send GET request for specific orderdetail id [1-9]`,
        byId : `${ctx.protocol}://${ctx.host}${prefix}/id`
    }
    if (ordersdetail.length){
        ctx.status = 200;
        ctx.body = {links, ordersdetail};
    } else{
        ctx.body = `unauthorised`
        ctx.status = 400;
    }
}        


async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested order ID: ",id);
    const links = {
        info : `Create new orderdetail by POST Request`,
        createOrder: `${ctx.protocol}://${ctx.host}${prefix}/`
    }
    let orderdetail = await model.getByID(id);
    if (orderdetail.length){
        ctx.status = 200;
        ctx.body = { links , orderdetail} ; 
    } else {
        ctx.body = `Not Valid ID`
        ctx.status = 400;
    }
}


async function createOrderDetail(ctx){
    const body = ctx.request.body;
    let result = await model.createOrderDetail(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} 
    } else {
        ctx.body = `unable to create orderdetail, you first need to create order`
        ctx.status = 400;
    }
}

// Update Product using product ID 
async function updateOrderDetail(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    const check_id = await model.getByID(id);
    if (check_id.length){
        console.log("Recieved values:\n",id,"\n",body)
        let update = await model.updateOrderDetail(id, body);
        if (update){
            ctx.status = 201;
            ctx.body = {ID: id, update: true, link: ctx.request.path};
        }
    }
    else{
        ctx.body = `orderdetail not found. make sure orderdetail id is correct`
        ctx.status = 404;
    }
}


// Delete products by product id 
async function deleteOrderDetail(ctx){
    let id = ctx.params.id;
    console.log("Deleted product_id: ",id)
    const check_id = await model.getByID(id);
    if (check_id.length){
        let deleteOrderdetail = await model.deleteOrderDetail(id);
        if (deleteOrderdetail){
            ctx.status = 202;
            ctx.body = {ID: id, deleted: true};
        } else{
            ctx.body = `unauthorized`
            ctx.status = 403;
        } 
    } else {
        ctx.body = `orderdeatil not found. make sure orderdeatl id is correct`
        ctx.status = 404;
    }
}

// get product by category 



module.exports = router;