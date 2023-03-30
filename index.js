const Koa = require('koa');

const app = new Koa();

const special = require('./routes/special.js');
const products = require('./routes/products.js');
const users = require('./routes/users');
const categories = require('./routes/categories')

app.use(special.routes());
app.use(products.routes());
app.use(users.routes());
app.use(categories.routes())

let port = process.env.PORT || 3000
app.listen(port);
