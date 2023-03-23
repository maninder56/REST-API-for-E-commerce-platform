const Router = require('koa-router');

const bodyParser =require('koa-bodyparser');

const router = Router({prefix: '/api/v1/products'})

let products = [
    {
        name:'iphone',
        discription: 'iOS SmartPhone'
    },

    {
        name:'samsung',
        discription: 'Android SmartPhone'
    }

    
]

router.get('/', getAll);
router.post('/', bodyParser(), addProduct);

router.get('/:id([0-9]{1,})', getById); 
router.put('/:id([0-9]{1,})', updateProduct); 
router.del('/:id([0-9]{1,})', deleteProduct);



function getAll(ctx, next){
    ctx.body = products; 
}

function addProduct(ctx, next){
    let {name, discription} = ctx.request.body;
    let newProduct = {name:name, discription:discription};
    products.push(newProduct);

    ctx.status = 201;
    ctx.body = newProduct;
}


function getById(ctx, next){
    let id = ctx.params.id;
    console.log(id);
    if ((id <= products.length+1) && (id > 0)){
        ctx.body = products[id-1];
    } else {
        ctx.status = 404;
    }
}

function updateProduct(ctx, next){
    // 
}

function deleteProduct(ctx, next){
    //  
}

module.exports = router;