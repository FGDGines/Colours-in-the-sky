const { Router } = require('express')
const { check } = require('express-validator')
const getProductos = require('../controllers/getProductos')
const getProducto = require('../controllers/getProducto')
const setProducto = require('../controllers/setProducto')
const addProducto = require('../controllers/addProducto')
const { validarCampos } = require('../middlewares/validarCampos')
const removeImagenProducto = require('../controllers/removeImagenProducto')

const app = Router()

app.get('/getProductos', getProductos)

app.get('/getProducto', getProducto)

app.post('/setProducto', setProducto)

app.post('/addProducto', [

  check('ipName', 'El nombre del producto es obligatorio.').not().isEmpty(),
  check('ipSlug', 'El slug es obligatorio').not().isEmpty(),
  check('ipCategory', 'La categoría es un dato numérico obligatorio').isNumeric(),
  check('ipPrice', 'El precio es un dato numérico obligatorio').isNumeric(),
  check('ipDetails', 'Los detalles del producto son obligatorios').not().isEmpty(),

  validarCampos
], addProducto)

app.post('/removeImagenProducto', [
  check('ipId', 'El id del producto al cual le eliminará la imagen es obligatorio').isNumeric(),
  check('ipTarget', 'El nombre de la imagen que eliminará es obligatorio').not().isEmpty(),
  validarCampos
], removeImagenProducto)
module.exports = app
