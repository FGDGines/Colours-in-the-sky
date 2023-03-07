const { Router } = require('express')
const producto = require('../controllers/api_producto')
const productos = require('../controllers/api_productos')
const app = Router()
app.get('/productos', productos)
app.get('/producto', producto)
module.exports = app
