const Koa = require('koa');
const Router = require('koa-router');

const app = new Koa();
const router = new Router();

router.get('/api/v1', welcome);
app.use(router.routes());


function welcome(ctx,next) {
    ctx.body = {
        message: "Welcome to my API!"
    }
};

const products = require('./routes/products.js');
app.use(products.routes());


app.listen(3000);
