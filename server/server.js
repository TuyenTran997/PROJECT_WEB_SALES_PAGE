const express = require('express');
require('dotenv').config();

const app = express();
const userRouter = require('./router/user.router')
const categoryRouter = require('./router/category.router')
const productRouter = require('./router/product.router')
const classifyRouter = require('./router/classify.router')
const cartRouter = require('./router/carts.router')
// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/classifies', classifyRouter);
app.use('/api/v1/carts', cartRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});