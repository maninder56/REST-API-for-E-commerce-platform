const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/categories');

const router = Router({prefix: '/api/v1/categories'})

// All endpoints related to categories
router.get('/', getAll);
router.post('/', bodyParser(), createCategory);

router.get('/:id([0-9]{1,})', getById); 
router.put('/:id([0-9]{1,})', bodyParser(), updateCategory); 
router.del('/:id([0-9]{1,})', deleteCategory);



async function getAll(ctx){
    let categories = await model.getAll();
    if (categories.length){
        ctx.body = categories;
    }
}

async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested Category ID: ",id);
    let category = await model.getByID(id);
    if (category.length){
        ctx.body = category[0]
    }
}

async function createCategory(ctx){
    const body = ctx.request.body;
    let result = await model.createCategory(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} ;
    }
}

// Update category  
async function updateCategory(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    console.log("Recieved values:\n",id,"\n",body)
    let update = await model.updateCategory(id, body);
    if (update){
        ctx.status = 201;
        ctx.body = {ID: id, update: true, link: ctx.request.path} ;
    }
}

// Delete category
async function deleteCategory(ctx, next){
    let id = ctx.params.id;
    console.log("Deleted Category_id: ",id)
    let deleteCategory = await model.deleteCategory(id);
    if (deleteCategory){
        ctx.status = 202;
        ctx.body = {ID: id, deleted: true};
    }
}

module.exports = router;