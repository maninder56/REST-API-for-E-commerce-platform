const Koa = require('koa');

const app = new Koa();

const special = require('./routes/special.js');
const products = require('./routes/products.js');
const users = require('./routes/users.js');
const categories = require('./routes/categories.js')
const orders = require('./routes/orders.js');
const orderdetail = require('./routes/orderDetails.js')

app.use(special.routes());
app.use(products.routes());
app.use(users.routes());
app.use(categories.routes())
app.use(orders.routes());
app.use(orderdetail.routes())


module.exports = app;