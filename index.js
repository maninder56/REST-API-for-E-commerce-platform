const app = require('./app');
let port = process.env.PORT || 3000;
app.listen(port);
console.log(`API SERVER RUNNING ON PORT ${port}`)