const express = require('express');
const categoryRouter = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

categoryRouter.use(bodyParser.json());
categoryRouter.use(bodyParser.urlencoded({ extended: true }));
categoryRouter.use(cors());




module.exports = categoryRouter;
