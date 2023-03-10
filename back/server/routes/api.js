const { Router } = require('express')
const { check } = require('express-validator')
const getProductos = require('../controllers/getProductos')
const getProducto = require('../controllers/getProducto')
const setProducto = require('../controllers/setProducto')
const addProducto = require('../controllers/addProducto')
const { validarCampos } = require('../middlewares/validarCampos')
const removeImagenProducto = require('../controllers/removeImagenProducto')
const addImagenProducto = require('../controllers/addImagenProductos')
const addCategory = require('../controllers/addCategory')
const setCategory = require('../controllers/setCategory')
const delCategory = require('../controllers/delCategory')
const getCategorys = require('../controllers/getCategorys')

const app = Router()
// Producto
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

app.post('/addImagenProducto', [
  check('ipId', 'El id al cual agregará la imagen es obligatorio').isNumeric(),
  validarCampos], addImagenProducto)

// Categoria
app.post('/addCategory', [
  check('ipName', 'El nombre de la categoría es obligatorio').not().isEmpty(),
  validarCampos
], addCategory)

app.post('/setCategory', [
  check('ipId', 'El id de la categoria a editar es obligatorio').isNumeric(),
  check('ipValue', 'El nuevo valor de la categoria es obligatorio').not().isEmpty(),
  validarCampos
], setCategory)

app.post('/delCategory', [
  check('ipId', 'El id de la categoria a eliminar es obligatorio').isNumeric(),
  validarCampos], delCategory)

app.post('/getCategorys', getCategorys)
module.exports = app
