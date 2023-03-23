const Koa = require('koa');

const app = new Koa();

const special = require('./routes/special.js');
const products = require('./routes/products.js');

app.use(special.routes());
app.use(products.routes());

let port = process.env.PORT || 3000
app.listen(port);
