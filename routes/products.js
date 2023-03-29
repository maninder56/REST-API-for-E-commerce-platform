const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/products');

const router = Router({prefix: '/api/v1/products'})

// All endpoints related to product
router.get('/', getAll);
router.post('/', bodyParser(), createProduct);

router.get('/:id([0-9]{1,})', getById); 
router.put('/:id([0-9]{1,})', bodyParser, updateProduct); 
router.del('/:id([0-9]{1,})', deleteProduct);



async function getAll(ctx, next){
    let products = await model.getAll();
    if (products.length){
        ctx.body = products;
    }
}

async function getById(ctx, next){
    let id = ctx.params.id;
    console.log( "Requested product ID: ",id);
    let product = await model.getByID(id);
    if (product.length){
        ctx.body = product[0]
    }
}

async function createProduct(ctx, next){
    const body = ctx.request.body;
    let result = await model.add(body);
    if (result){
        ctx.status = 201;
        ctx.body = {ID: result.product_id} // this may not work !!!
    }
}


function updateProduct(ctx, next){
    // 
}

function deleteProduct(ctx, next){
    //  
}

module.exports = router;