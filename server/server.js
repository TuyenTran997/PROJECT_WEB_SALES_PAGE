const express = require('express');
require('dotenv').config();

const app = express();
const userRouter = require('./router/user.router')
const categoryRouter = require('./router/category.router')
const productRouter = require('./router/product.router')
const classifyRouter = require('./router/classify.router')
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);
app.use('/api/v1/products', productRouter);
app.use('/api/v1/classifies', classifyRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});