const { request, response } = require('express')

const removeImagenProducto = (req = request, res = response) => {
  res.status(200).json({ msg: 'remove Imagen Online' })
}

module.exports = removeImagenProducto
