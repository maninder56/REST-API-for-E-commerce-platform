const Router = require('koa-router');
const bodyParser =require('koa-bodyparser');
const model = require('../models/categories');
const auth = require('../controllers/auth'); // for authentication 


// for data validation 
const {validateCategory} = require('../controllers/validation'); 

const prefix = '/api/v1/categories'
const router = Router({prefix: prefix })

// All endpoints related to categories
router.get('/', getAll);
router.post('/', auth, bodyParser(), validateCategory, createCategory);

router.get('/:id([0-9]{1,})', auth, getById); 
router.put('/:id([0-9]{1,})', auth, bodyParser(), validateCategory, updateCategory); 
router.del('/:id([0-9]{1,})', auth, deleteCategory);



async function getAll(ctx){
    let categories = await model.getAll();
    const links = {
        info : `send GET request for specific category id [1-9]`,
        byId : `${ctx.protocol}://${ctx.host}${prefix}/id`
    }
    if (categories.length){
        ctx.status = 200;
        ctx.body = {links, categories};
    }
}

async function getById(ctx){
    let id = ctx.params.id;
    console.log( "Requested Category ID: ",id);
    const links = {
        info : `Create new category by POST Request`,
        createOrder: `${ctx.protocol}://${ctx.host}${prefix}/`
    }
    let category = await model.getByID(id);
    if (category.length){
        ctx.status = 200;
        ctx.body = category[0]
    } else {
        ctx.body = `Not Valid ID`
        ctx.status = 400;
    }
}

async function createCategory(ctx){
    const body = ctx.request.body;
    let result = await model.createCategory(body);
    const id = result.insertId
    if (result){
        ctx.status = 201;
        ctx.body = {ID: id, created: true, link: `${ctx.request.path}${id}`} ;
    }else {
        ctx.body = `unable to create order`
        ctx.status = 400;
    }
}

// Update category  
async function updateCategory(ctx){
    let id = ctx.params.id;
    const body = ctx.request.body;
    const check_id = await model.getByID(id);
    if (check_id.length){
        console.log("Recieved values:\n",id,"\n",body)
        let update = await model.updateCategory(id, body);
        if (update){
            ctx.status = 201;
            ctx.body = {ID: id, update: true, link: ctx.request.path} ;
        }
    }else{
        ctx.body = `category not found. make sure category id is correct`
        ctx.status = 404;
    }
    
}

// Delete category
async function deleteCategory(ctx){
    let id = ctx.params.id;
    console.log("Deleted Category_id: ",id)
    const check_id = await model.getByID(id);
    if (check_id.length){
        let deleteCategory = await model.deleteCategory(id);
        if (deleteCategory){
            ctx.status = 202;
            ctx.body = {ID: id, deleted: true};
        }else{
            ctx.body = `unauthorized`
            ctx.status = 403;
        } 
    }else {
        ctx.body = `category not found. make sure category id is correct`
        ctx.status = 404;
    }
    
}

module.exports = router;