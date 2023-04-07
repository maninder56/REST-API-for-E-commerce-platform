const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/products');
const auth = require('../controllers/auth'); // for authentication 

// add prefic after products/categorty or /orders 
// to see how may orders or which category this product fall unders

// for data validation 
const {validateProduct} = require('../controllers/validation'); 

const prefix = '/api/v1/products';
const router = Router({prefix: prefix})

// All endpoints related to product
router.get('/', getAll);
router.post('/', auth, bodyParser(), validateProduct, createProduct); // add permissions here 

router.get('/:id([0-9]{1,})', auth, getById); 
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateProduct, updateProduct); 
router.del('/:id([0-9]{1,})', auth ,deleteProduct);



async function getAll(ctx){
    let products = await model.getAll();
    const links = {
        info : `send GET request for specific product id [1-9]`,
        byId : `${ctx.protocol}://${ctx.host}${prefix}/id`
    }
    if (products.length){
        console.log("Products Requetsed ")
        ctx.status = 200;
        ctx.body = {links, products};
    } else{
        ctx.body = `unauthorised`
        ctx.status = 400;
    }
}        

async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested product ID: ",id);
    const links = {
        info : `Create new product by POST Request`,
        createProduct: `${ctx.protocol}://${ctx.host}${prefix}/`
    }
    let product = await model.getByID(id);
    if (product.length){
        ctx.status = 200;
        ctx.body = { links , product} ; 
    }else {
        ctx.body = `Not Valid ID`
        ctx.status = 400;
    }
}

async function createProduct(ctx){
    const body = ctx.request.body;
    let result = await model.createProduct(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} 
    }else {
        ctx.body = `unable to create product`
        ctx.status = 400;
    }
}

// Update Product using product ID 
async function updateProduct(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    const check_id = await model.getByID(id);
    if (check_id.length){
        console.log("Recieved values:\n",id,"\n",body)
        let update = await model.updateProduct(id, body);
        if (update){
            ctx.status = 201;
            ctx.body = {ID: id, update: true, link: ctx.request.path};
        }
    } else{
        ctx.body = `product not found. make sure product id is correct`
        ctx.status = 404;
    }
    
}

// Delete products by product id 
async function deleteProduct(ctx){
    let id = ctx.params.id;
    console.log("Deleted product_id: ",id)
    const check_id = await model.getByID(id);
    if (check_id.length){
        let deleteProduct = await model.deleteProduct(id);
        if (deleteProduct){
            ctx.status = 202;
            ctx.body = {ID: id, deleted: true};
        } else{
            ctx.body = `unauthorized`
            ctx.status = 403;
        } 
    }else {
        ctx.body = `product not found. make sure product id is correct`
        ctx.status = 404;
    }
    
}

// get product by category 



module.exports = router;