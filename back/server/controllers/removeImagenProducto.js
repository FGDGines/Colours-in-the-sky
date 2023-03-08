const { request, response } = require('express')
const { Producto } = require('../db/models')
const { eliminarArchivo } = require('../helpers/fileHandler')

const removeImagenProducto = async (req = request, res = response) => {
  const { ipId: id, ipTarget } = req.body
  try {
    const producto = await Producto.findByPk(id)
    if (!producto) {
      return res.status(200).json({ status: 400, msg: 'No existe producto con el Id proporcionado' })
    }

    const image = JSON.parse(producto.image)
    const newImagen = image.filter(arg => arg !== ipTarget)

    if (!newImagen.length) {
      newImagen.push('unavailable.png')
    }

    await producto.update({ image: newImagen })

    const tryDelete = await eliminarArchivo('../../public/uploads/productos', ipTarget)
      .catch(err => {
        throw new Error(err)
      })

    if (tryDelete.status === 200) {
      res.status(200).json({ status: 200, msg: 'Imagen eliminada con exito', last: image, new: newImagen })
    } else {
      res.status(200).json({ status: '500', msg: 'No podemos eliminar imagenes en este momento', detalles: tryDelete })
    }
  } catch (err) {
    res.status(200).json({ status: 500, msg: 'No podemos eliminar imagenes en este momento', err })
  }
}

module.exports = removeImagenProducto
