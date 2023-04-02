const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/products');

// for data validation 
const {validateProduct} = require('../controllers/validation'); 

const router = Router({prefix: '/api/v1/products'})

// All endpoints related to product
router.get('/', getAll);
router.post('/', bodyParser(), validateProduct, createProduct);

router.get('/:id([0-9]{1,})', getById); 
router.put('/:id([0-9]{1,})', bodyParser(), validateProduct, updateProduct); 
router.del('/:id([0-9]{1,})', deleteProduct);



async function getAll(ctx){
    let products = await model.getAll();
    if (products.length){
        ctx.body = products;
    }
}

async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested product ID: ",id);
    let product = await model.getByID(id);
    if (product.length){
        ctx.body = product[0]
    }
}

async function createProduct(ctx){
    const body = ctx.request.body;
    let result = await model.createProduct(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} 
    }
}

// Update Product using product ID 
async function updateProduct(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    console.log("Recieved values:\n",id,"\n",body)
    let update = await model.updateProduct(id, body);
    if (update){
        ctx.status = 201;
        ctx.body = {ID: id, update: true, link: ctx.request.path};
    }
}

// Delete products by product id 
async function deleteProduct(ctx){
    let id = ctx.params.id;
    console.log("Deleted product_id: ",id)
    let deleteProduct = await model.deleteProduct(id);
    if (deleteProduct){
        ctx.status = 202;
        ctx.body = {ID: id, deleted: true};
    }
}

module.exports = router;