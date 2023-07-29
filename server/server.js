const express = require('express');
require('dotenv').config();

const app = express();
const userRouter = require('./router/user.router')
const categoryRouter = require('./router/category.router')
app.use('/api/v1/users', userRouter);
app.use('/api/v1/categories', categoryRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});